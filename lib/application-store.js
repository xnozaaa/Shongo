import crypto from 'crypto'
import { del, get, head, list, put } from '@vercel/blob'
import { applicationContentTypeForName, safeFilename } from './email.js'

const RECORD_PREFIX = 'applications/records/'
export const APPLICATION_STATUSES = ['new', 'reviewing', 'approved', 'waitlisted', 'declined']
const APPLICATION_FILE_FIELDS = new Set(['insuranceFile', 'foodHygieneFile', 'localAuthorityFile', 'hygieneRatingFile'])

function ensureBlobIsConfigured() {
  const hasReadWriteToken = Boolean(process.env.BLOB_READ_WRITE_TOKEN)
  const hasOidcConfig = Boolean(process.env.VERCEL_OIDC_TOKEN && process.env.BLOB_STORE_ID)
  if (!hasReadWriteToken && !hasOidcConfig) {
    throw new Error('Application storage is not configured. Connect a private Vercel Blob store to this project.')
  }
}

function isApplicationId(value) {
  return /^[a-f0-9-]{36}$/i.test(String(value || ''))
}

function recordPath(id) {
  if (!isApplicationId(id)) throw new Error('Invalid application ID.')
  return `${RECORD_PREFIX}${id}.json`
}

async function streamToText(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks).toString('utf8')
}

async function streamToBuffer(stream) {
  const chunks = []
  for await (const chunk of stream) chunks.push(Buffer.from(chunk))
  return Buffer.concat(chunks)
}

async function writeApplicationRecord(record, { allowOverwrite = true } = {}) {
  ensureBlobIsConfigured()
  await put(recordPath(record.id), JSON.stringify(record), {
    access: 'private',
    allowOverwrite,
    addRandomSuffix: false,
    contentType: 'application/json; charset=utf-8',
    cacheControlMaxAge: 60,
  })
  return record
}

export async function getApplication(id) {
  ensureBlobIsConfigured()
  const result = await get(recordPath(id), { access: 'private', useCache: false })
  if (!result || result.statusCode !== 200 || !result.stream) return null
  return JSON.parse(await streamToText(result.stream))
}

export async function createApplicationFromUploads({ data, uploads, submissionId, submittedAt = new Date() }) {
  ensureBlobIsConfigured()
  const attachments = []

  if (!isApplicationId(submissionId)) throw new Error('Invalid submission ID.')
  const id = submissionId
  if (!Array.isArray(uploads) || !uploads.length) throw new Error('Supporting documents are required.')
  if (await getApplication(id)) throw new Error('This application has already been submitted.')

  const expectedPrefix = `applications/files/${submissionId}/`
  const seenFields = new Set()
  let totalSize = 0

  for (const upload of uploads) {
    const field = String(upload.field || '')
    const filename = safeFilename(upload.filename)
    const pathname = String(upload.pathname || '')
    const contentType = applicationContentTypeForName(filename)
    const expectedPathname = `${expectedPrefix}${field}-${filename}`

    if (!APPLICATION_FILE_FIELDS.has(field) || seenFields.has(field)) throw new Error('Invalid supporting document information.')
    if (pathname !== expectedPathname || !contentType) throw new Error('Invalid supporting document information.')

    const blob = await head(pathname)
    if (!blob || blob.pathname !== pathname) throw new Error(`${filename} could not be found.`)
    if (blob.size > 5 * 1024 * 1024) throw new Error(`${filename} must be 5MB or less.`)

    totalSize += blob.size
    seenFields.add(field)
    attachments.push({
      id: crypto.randomUUID(),
      field,
      filename,
      contentType,
      size: blob.size,
      pathname,
    })
  }

  if (totalSize > 20 * 1024 * 1024) throw new Error('Total uploaded files must not exceed 20MB.')

  const timestamp = submittedAt instanceof Date ? submittedAt : new Date(submittedAt)
  const record = {
    version: 1,
    id,
    submittedAt: timestamp.toISOString(),
    updatedAt: timestamp.toISOString(),
    status: 'new',
    adminNotes: '',
    data,
    attachments,
    emailDelivery: {
      admin: 'pending',
      applicant: data.businessEmail || data.contactEmail ? 'pending' : 'not-requested',
      lastError: null,
    },
  }

  return writeApplicationRecord(record, { allowOverwrite: false })
}

export async function loadApplicationAttachmentsForEmail(application) {
  return Promise.all(application.attachments.map(async (attachment) => {
    const result = await get(attachment.pathname, { access: 'private', useCache: false })
    if (!result || result.statusCode !== 200 || !result.stream) {
      throw new Error(`${attachment.filename} could not be loaded for email delivery.`)
    }

    return {
      filename: attachment.filename,
      content: await streamToBuffer(result.stream),
      contentType: attachment.contentType,
    }
  }))
}

export async function listApplications() {
  ensureBlobIsConfigured()
  const recordBlobs = []
  let cursor

  do {
    const page = await list({ prefix: RECORD_PREFIX, limit: 1000, cursor })
    recordBlobs.push(...page.blobs.filter((blob) => blob.pathname.endsWith('.json')))
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)

  const results = await Promise.allSettled(recordBlobs.map(async (blob) => {
    const result = await get(blob.pathname, { access: 'private' })
    if (!result || result.statusCode !== 200 || !result.stream) return null
    return JSON.parse(await streamToText(result.stream))
  }))

  return results
    .filter((result) => result.status === 'fulfilled' && result.value)
    .map((result) => result.value)
    .sort((a, b) => new Date(b.submittedAt) - new Date(a.submittedAt))
}

export async function updateApplication(id, changes = {}) {
  const application = await getApplication(id)
  if (!application) return null

  if (changes.status !== undefined) {
    if (!APPLICATION_STATUSES.includes(changes.status)) throw new Error('Invalid application status.')
    application.status = changes.status
  }

  if (changes.adminNotes !== undefined) {
    application.adminNotes = String(changes.adminNotes || '').trim().slice(0, 5000)
  }

  if (changes.emailDelivery !== undefined) {
    application.emailDelivery = {
      ...application.emailDelivery,
      ...changes.emailDelivery,
    }
  }

  application.updatedAt = new Date().toISOString()
  return writeApplicationRecord(application)
}

export async function deleteApplication(id) {
  const application = await getApplication(id)
  if (!application) return null

  const filePrefix = `applications/files/${id}/`
  const pathsToDelete = [recordPath(id)]
  let cursor

  do {
    const page = await list({ prefix: filePrefix, limit: 1000, cursor })
    pathsToDelete.push(...page.blobs.map((blob) => blob.pathname))
    cursor = page.hasMore ? page.cursor : undefined
  } while (cursor)

  await del(pathsToDelete)
  return application
}

export async function findApplicationAttachment(applicationId, attachmentId) {
  const application = await getApplication(applicationId)
  if (!application) return null
  const attachment = application.attachments.find((item) => item.id === attachmentId)
  if (!attachment) return null
  return { application, attachment }
}
