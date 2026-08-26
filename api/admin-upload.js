import { handleUpload } from '@vercel/blob/client'
import { requireAdmin } from '../lib/admin-auth.js'
import { ADMIN_APPLICATION_FILE_FIELDS, getApplication } from '../lib/application-store.js'
import { applicationContentTypeForName, safeFilename } from '../lib/email.js'

const uploadFields = new Set(ADMIN_APPLICATION_FILE_FIELDS)
const allowedContentTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })

  try {
    const result = await handleUpload({
      body: req.body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let payload
        try {
          payload = JSON.parse(clientPayload || '{}')
        } catch {
          throw new Error('Invalid upload request.')
        }

        const applicationId = String(payload.applicationId || '')
        const uploadId = String(payload.uploadId || '')
        const field = String(payload.field || '')
        const filename = String(payload.filename || '')
        const expectedPathname = `applications/files/${applicationId}/${field}-${uploadId}-${safeFilename(filename)}`

        if (!/^[a-f0-9-]{36}$/i.test(applicationId) || !/^[a-f0-9-]{36}$/i.test(uploadId) || !uploadFields.has(field)) {
          throw new Error('Invalid upload request.')
        }
        if (!applicationContentTypeForName(filename) || pathname !== expectedPathname) {
          throw new Error('This file type is not accepted.')
        }
        if (!await getApplication(applicationId)) throw new Error('Application not found.')

        return {
          allowedContentTypes,
          maximumSizeInBytes: 5 * 1024 * 1024,
          validUntil: Date.now() + (10 * 60 * 1000),
          addRandomSuffix: false,
          allowOverwrite: false,
          cacheControlMaxAge: 60,
        }
      },
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error('admin-upload request failed')
    const knownError = /invalid upload|file type|application not found/i.test(String(error?.message || ''))
    return res.status(400).json({ error: knownError ? error.message : 'Unable to upload the document.' })
  }
}
