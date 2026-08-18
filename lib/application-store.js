import crypto from 'crypto'
import { del, get, head, list, put } from '@vercel/blob'
import { applicationContentTypeForName, isValidEmail, safeFilename } from './email.js'

const RECORD_PREFIX = 'applications/records/'
export const APPLICATION_STATUSES = ['new', 'reviewing', 'approved', 'declined', 'paid', 'waitlisted']
const APPLICATION_FILE_FIELDS = new Set(['insuranceFile', 'foodHygieneFile', 'localAuthorityFile', 'hygieneRatingFile'])
export const ADMIN_APPLICATION_FILE_FIELDS = ['insuranceFile', 'foodHygieneFile', 'localAuthorityFile', 'hygieneRatingFile', 'otherFile']
const ADMIN_APPLICATION_FILE_FIELD_SET = new Set(ADMIN_APPLICATION_FILE_FIELDS)
const STALL_TYPES = {
  artisan: { label: 'Artisan Stall – £200' },
  'cold-food': { label: 'Cold Food Stall – £300' },
  'hot-food': { label: 'Hot Food Stall – £400' },
}
const EDITABLE_STRING_FIELDS = {
  businessName: 200,
  businessAddress: 1000,
  localAuthority: 300,
  contactName: 200,
  applicantFullName: 200,
  businessEmail: 320,
  businessContactNumber: 100,
  itemsToBeSold: 5000,
  electricalRequirements: 5000,
}
const REQUIRED_EDITABLE_STRING_FIELDS = new Set([
  'businessName',
  'businessAddress',
  'contactName',
  'applicantFullName',
  'businessEmail',
  'businessContactNumber',
  'itemsToBeSold',
  'electricalRequirements',
])
const EDITABLE_FIELD_LABELS = {
  businessName: 'Business / trading name',
  businessAddress: 'Registered business address',
  contactName: 'Contact name',
  applicantFullName: 'Applicant name',
  businessEmail: 'Business email',
  businessContactNumber: 'Contact number',
  itemsToBeSold: 'Items to be sold',
  electricalRequirements: 'Electrical requirements',
}
const EDITABLE_DATA_FIELDS = new Set([...Object.keys(EDITABLE_STRING_FIELDS), 'stallType', 'totalPayable'])

export class ApplicationValidationError extends Error {}

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

function applyApplicationDataChanges(application, changes) {
  if (!changes || typeof changes !== 'object' || Array.isArray(changes)) {
    throw new ApplicationValidationError('Invalid application changes.')
  }

  const entries = Object.entries(changes)
  if (!entries.length) throw new ApplicationValidationError('No application changes were provided.')

  const unknownField = entries.find(([field]) => !EDITABLE_DATA_FIELDS.has(field))?.[0]
  if (unknownField) throw new ApplicationValidationError(`${unknownField} cannot be edited.`)

  const nextData = { ...(application.data || {}) }

  for (const [field, value] of entries) {
    if (field === 'stallType') {
      const stallType = String(value || '').trim()
      if (!STALL_TYPES[stallType]) throw new ApplicationValidationError('Please select a valid stall type.')
      if (stallType !== nextData.stallType) nextData.stallTypeLabel = STALL_TYPES[stallType].label
      nextData.stallType = stallType
      continue
    }

    if (field === 'totalPayable') {
      const totalPayable = Number(value)
      if (!Number.isFinite(totalPayable) || totalPayable < 0 || totalPayable > 100000) {
        throw new ApplicationValidationError('Please provide a valid total payable amount.')
      }
      nextData.totalPayable = Math.round(totalPayable * 100) / 100
      continue
    }

    const text = String(value ?? '').trim()
    if (text.length > EDITABLE_STRING_FIELDS[field]) {
      throw new ApplicationValidationError(`${field} is too long.`)
    }
    if (REQUIRED_EDITABLE_STRING_FIELDS.has(field) && !text) {
      throw new ApplicationValidationError(`${EDITABLE_FIELD_LABELS[field]} is required.`)
    }
    if (field === 'businessEmail' && text && !isValidEmail(text)) {
      throw new ApplicationValidationError('Please provide a valid business email address.')
    }
    nextData[field] = text
  }

  const changedFields = entries
    .map(([field]) => field)
    .filter((field) => nextData[field] !== application.data?.[field])

  if (entries.some(([field]) => field === 'stallType') && nextData.stallTypeLabel !== application.data?.stallTypeLabel) {
    changedFields.push('stallTypeLabel')
  }

  if (changedFields.length) application.data = nextData
  return [...new Set(changedFields)]
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

  const changedDataFields = changes.data !== undefined
    ? applyApplicationDataChanges(application, changes.data)
    : []

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

  if (changedDataFields.length) {
    application.editHistory = [
      ...(Array.isArray(application.editHistory) ? application.editHistory : []),
      {
        editedAt: new Date().toISOString(),
        fields: changedDataFields,
      },
    ].slice(-100)
  }

  application.updatedAt = new Date().toISOString()
  return writeApplicationRecord(application)
}

export async function addApplicationAttachmentFromUpload({ applicationId, field, filename: suppliedFilename, pathname }) {
  const application = await getApplication(applicationId)
  if (!application) return null

  const filename = safeFilename(suppliedFilename)
  const contentType = applicationContentTypeForName(filename)
  const safeField = String(field || '')
  const safePathname = String(pathname || '')
  const prefix = `applications/files/${applicationId}/${safeField}-`
  const suffix = `-${filename}`
  const uploadId = safePathname.startsWith(prefix) && safePathname.endsWith(suffix)
    ? safePathname.slice(prefix.length, -suffix.length)
    : ''

  if (!ADMIN_APPLICATION_FILE_FIELD_SET.has(safeField) || !contentType || !/^[a-f0-9-]{36}$/i.test(uploadId)) {
    throw new ApplicationValidationError('Invalid supporting document information.')
  }

  const attachments = Array.isArray(application.attachments) ? application.attachments : []
  if (attachments.some((attachment) => attachment.pathname === safePathname)) return application

  let blob
  try {
    blob = await head(safePathname)
  } catch {
    throw new ApplicationValidationError('The uploaded document could not be found.')
  }

  if (!blob || blob.pathname !== safePathname || blob.contentType !== contentType) {
    throw new ApplicationValidationError('Invalid supporting document information.')
  }
  if (blob.size > 5 * 1024 * 1024) throw new ApplicationValidationError(`${filename} must be 5MB or less.`)

  const uploadedAt = new Date().toISOString()
  application.attachments = [
    ...attachments,
    {
      id: crypto.randomUUID(),
      field: safeField,
      filename,
      contentType,
      size: blob.size,
      pathname: safePathname,
      uploadedAt,
      uploadedBy: 'admin',
    },
  ]
  application.updatedAt = uploadedAt
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
