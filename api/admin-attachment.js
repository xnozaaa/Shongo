import { requireAdmin } from '../lib/admin-auth.js'
import {
  addApplicationAttachmentFromUpload,
  ApplicationValidationError,
} from '../lib/application-store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })

  try {
    const application = await addApplicationAttachmentFromUpload({
      applicationId: String(req.body?.applicationId || ''),
      field: req.body?.field,
      filename: req.body?.filename,
      pathname: req.body?.pathname,
    })

    if (!application) return res.status(404).json({ error: 'Application not found.' })
    return res.status(200).json({ application })
  } catch (error) {
    console.error('admin-attachment api error', error)
    const status = error instanceof ApplicationValidationError || error?.message === 'Invalid application ID.' ? 400 : 500
    return res.status(status).json({ error: error?.message || 'Unable to add the document.' })
  }
}
