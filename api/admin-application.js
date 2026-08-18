import { requireAdmin } from '../lib/admin-auth.js'
import {
  ApplicationValidationError,
  ApplicationConflictError,
  activeEmailDeliveryError,
  deleteApplication,
  getApplication,
  updateApplication,
} from '../lib/application-store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (!['GET', 'PATCH', 'DELETE'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed.' })

  const id = String(req.query?.id || '')

  try {
    if (req.method === 'DELETE') {
      const deletedApplication = await deleteApplication(id)
      if (!deletedApplication) return res.status(404).json({ error: 'Application not found.' })
      return res.status(200).json({ deleted: true, id: deletedApplication.id })
    }

    const application = req.method === 'PATCH'
      ? await updateApplication(id, {
          status: req.body?.status,
          adminNotes: req.body?.adminNotes,
          data: req.body?.data,
        })
      : await getApplication(id)

    if (!application) return res.status(404).json({ error: 'Application not found.' })
    return res.status(200).json({
      application: {
        ...application,
        emailDeliveryIssue: activeEmailDeliveryError(application),
      },
    })
  } catch (error) {
    console.error('admin-application api error', error)
    const isBadRequest = error instanceof ApplicationValidationError
      || error?.message === 'Invalid application ID.'
      || error?.message === 'Invalid application status.'
    const status = error instanceof ApplicationConflictError
      ? 409
      : isBadRequest ? 400 : 500
    return res.status(status).json({ error: error?.message || 'Unable to load the application.' })
  }
}
