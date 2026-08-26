import { requireAdmin } from '../lib/admin-auth.js'
import {
  addApplicationAttachmentFromUpload,
  ApplicationConflictError,
  ApplicationValidationError,
  deleteApplicationAttachment,
} from '../lib/application-store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (!['POST', 'DELETE'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed.' })

  try {
    if (req.method === 'DELETE') {
      const deleted = await deleteApplicationAttachment(
        String(req.query?.applicationId || ''),
        String(req.query?.attachmentId || ''),
      )

      if (!deleted?.application) return res.status(404).json({ error: 'Application not found.' })
      if (!deleted.attachment) return res.status(404).json({ error: 'Attachment not found.' })
      return res.status(200).json({
        application: deleted.application,
        deletedAttachmentId: deleted.attachment.id,
      })
    }

    const application = await addApplicationAttachmentFromUpload({
      applicationId: String(req.body?.applicationId || ''),
      field: req.body?.field,
      filename: req.body?.filename,
      pathname: req.body?.pathname,
    })

    if (!application) return res.status(404).json({ error: 'Application not found.' })
    return res.status(200).json({ application })
  } catch (error) {
    console.error('admin-attachment request failed')
    const isBadRequest = error instanceof ApplicationValidationError || error?.message === 'Invalid application ID.'
    const status = error instanceof ApplicationConflictError
      ? 409
      : isBadRequest ? 400 : 500
    const fallback = req.method === 'DELETE' ? 'Unable to delete the document.' : 'Unable to add the document.'
    return res.status(status).json({ error: status === 500 ? fallback : error.message })
  }
}
