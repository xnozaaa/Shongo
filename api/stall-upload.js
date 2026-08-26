import { handleUpload } from '@vercel/blob/client'
import { applicationContentTypeForName, safeFilename } from '../lib/email.js'
import { guardPost } from '../lib/request-security.js'

const uploadFields = new Set([
  'insuranceFile',
  'foodHygieneFile',
  'localAuthorityFile',
  'hygieneRatingFile',
])

const allowedContentTypes = [
  'application/pdf',
  'application/msword',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  'image/jpeg',
  'image/png',
]

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  if (!guardPost(req, res, {
    scope: 'stall-upload',
    limit: 24,
    maxBodyBytes: 32 * 1024,
    windowMs: 30 * 60 * 1000,
  })) return

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

        const submissionId = String(payload.submissionId || '')
        const field = String(payload.field || '')
        const filename = String(payload.filename || '')
        const expectedPathname = `applications/files/${submissionId}/${field}-${safeFilename(filename)}`

        if (!/^[a-f0-9-]{36}$/i.test(submissionId) || !uploadFields.has(field)) {
          throw new Error('Invalid upload request.')
        }
        if (!applicationContentTypeForName(filename) || pathname !== expectedPathname) {
          throw new Error('This file type is not accepted.')
        }

        return {
          allowedContentTypes,
          maximumSizeInBytes: 5 * 1024 * 1024,
          addRandomSuffix: false,
          allowOverwrite: false,
          cacheControlMaxAge: 60,
          tokenPayload: JSON.stringify({ submissionId, field, filename: safeFilename(filename) }),
        }
      },
    })

    return res.status(200).json(result)
  } catch (error) {
    console.error('stall-upload request failed')
    const knownError = /invalid upload|file type|application not found/i.test(String(error?.message || ''))
    return res.status(400).json({ error: knownError ? error.message : 'Unable to upload the document.' })
  }
}
