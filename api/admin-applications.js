import { requireAdmin } from '../lib/admin-auth.js'
import { activeEmailDeliveryError, listApplications } from '../lib/application-store.js'

function toSummary(application) {
  const data = application.data || {}
  return {
    id: application.id,
    submittedAt: application.submittedAt,
    updatedAt: application.updatedAt,
    status: application.status,
    businessName: data.businessName || 'Unnamed business',
    contactName: data.contactName || '',
    contactEmail: data.businessEmail || data.contactEmail || '',
    contactNumber: data.contactNumber || data.businessContactNumber || '',
    stallType: data.stallType || '',
    stallTypeLabel: data.stallTypeLabel || '',
    totalPayable: data.totalPayable || 0,
    attachmentCount: application.attachments?.length || 0,
    emailDelivery: application.emailDelivery,
    emailDeliveryIssue: activeEmailDeliveryError(application),
  }
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })

  try {
    const applications = await listApplications()
    return res.status(200).json({ applications: applications.map(toSummary) })
  } catch (error) {
    console.error('admin-applications api error', error)
    return res.status(500).json({ error: error?.message || 'Unable to load applications.' })
  }
}
