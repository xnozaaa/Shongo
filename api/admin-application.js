import { requireAdmin } from '../lib/admin-auth.js'
import { getApplication, updateApplication } from '../lib/application-store.js'

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (!['GET', 'PATCH'].includes(req.method)) return res.status(405).json({ error: 'Method not allowed.' })

  const id = String(req.query?.id || '')

  try {
    const application = req.method === 'PATCH'
      ? await updateApplication(id, {
          status: req.body?.status,
          adminNotes: req.body?.adminNotes,
        })
      : await getApplication(id)

    if (!application) return res.status(404).json({ error: 'Application not found.' })
    return res.status(200).json({ application })
  } catch (error) {
    console.error('admin-application api error', error)
    const status = error?.message === 'Invalid application ID.' || error?.message === 'Invalid application status.' ? 400 : 500
    return res.status(status).json({ error: error?.message || 'Unable to load the application.' })
  }
}
