import { getDownloadUrl, issueSignedToken, presignUrl } from '@vercel/blob'
import { requireAdmin } from '../lib/admin-auth.js'
import { findApplicationAttachment } from '../lib/application-store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })

  try {
    const stored = await findApplicationAttachment(
      String(req.query?.applicationId || ''),
      String(req.query?.attachmentId || ''),
    )

    if (!stored) return res.status(404).json({ error: 'Attachment not found.' })

    const canPreview = ['application/pdf', 'image/jpeg', 'image/png'].includes(stored.attachment.contentType)
    const validUntil = Date.now() + (2 * 60 * 1000)
    const signedToken = await issueSignedToken({
      pathname: stored.attachment.pathname,
      operations: ['get'],
      validUntil,
    })
    const { presignedUrl } = await presignUrl(signedToken, {
      operation: 'get',
      pathname: stored.attachment.pathname,
      access: 'private',
      validUntil,
    })
    const destination = req.query?.download === '1' || !canPreview ? getDownloadUrl(presignedUrl) : presignedUrl

    res.setHeader('Cache-Control', 'private, no-store')
    res.setHeader('Location', destination)
    return res.status(302).end()
  } catch (error) {
    console.error('admin-file api error', error)
    return res.status(500).json({ error: error?.message || 'Unable to open the attachment.' })
  }
}
