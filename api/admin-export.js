import { requireAdmin } from '../lib/admin-auth.js'
import { activeEmailDeliveryError, listApplications } from '../lib/application-store.js'

const documentLabels = {
  insuranceFile: 'Liability insurance',
  foodHygieneFile: 'Food hygiene certificate',
  localAuthorityFile: 'Local authority registration',
  hygieneRatingFile: 'Food hygiene rating',
  otherFile: 'Other supporting document',
}
const stageOrder = new Map([
  ['new', 0],
  ['reviewing', 1],
  ['approved', 2],
  ['paid', 3],
  ['declined', 4],
  ['waitlisted', 5],
])

function formatDate(value) {
  if (!value) return ''
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return String(value)
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Europe/London',
  }).format(date)
}

function exportFileDate() {
  const parts = new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    timeZone: 'Europe/London',
  }).formatToParts(new Date())
  const values = Object.fromEntries(parts.map((part) => [part.type, part.value]))
  return `${values.year}-${values.month}-${values.day}`
}

function confirmation(value, confirmedText) {
  if (value === undefined || value === null || value === '') return 'Not recorded'
  const confirmed = value === true || ['true', 'yes', 'accepted', 'confirmed'].includes(String(value).toLowerCase())
  return confirmed ? confirmedText : 'Not accepted'
}

function csvCell(value) {
  let text = String(value ?? '').replace(/\r\n?/g, '\n')
  if (/^\s*[=+\-@]/.test(text)) text = `'${text}`
  return `"${text.replace(/"/g, '""')}"`
}

function applicationRow(application) {
  const data = application.data || {}
  const attachments = Array.isArray(application.attachments) ? application.attachments : []
  const supportingFiles = attachments.map((attachment) => {
    const label = documentLabels[attachment.field] || 'Supporting document'
    return `${label}: ${attachment.filename || 'Unnamed file'}`
  }).join('; ')

  return [
    data.stallTypeLabel,
    application.status ? application.status[0].toUpperCase() + application.status.slice(1) : '',
    application.status === 'paid' ? 'Yes' : 'No',
    data.businessName,
    data.itemsToBeSold,
    Number.isFinite(Number(data.totalPayable)) ? Number(data.totalPayable).toFixed(2) : '',
    data.contactName,
    data.applicantFullName,
    data.businessEmail,
    data.businessContactNumber,
    data.businessAddress,
    data.localAuthority,
    data.electricalRequirements,
    formatDate(application.submittedAt),
    application.adminNotes,
    confirmation(data.termsAgreement, 'Accepted'),
    confirmation(data.declarationSafety, 'Confirmed'),
    data.digitalSignature,
    supportingFiles,
    attachments.length,
    application.emailDelivery?.admin || '',
    application.emailDelivery?.applicant || '',
    activeEmailDeliveryError(application) || '',
    application.id,
    formatDate(application.updatedAt),
  ]
}

export function applicationsToCsv(applications) {
  const headings = [
    'Stall Type',
    'Application Stage',
    'Payment Received',
    'Business / Trading Name',
    'Items Being Sold',
    'Total Payable (£)',
    'Contact Name',
    'Applicant Name',
    'Business Email',
    'Contact Number',
    'Registered Business Address',
    'Local Authority',
    'Electrical Requirements',
    'Submitted',
    'Private Admin Notes',
    'Terms & Conditions',
    'Safety Declaration',
    'Digital Signature',
    'Supporting Files',
    'File Count',
    'Admin Email Delivery',
    'Applicant Email Delivery',
    'Email Delivery Issue',
    'Application ID',
    'Last Updated',
  ]

  const sortedApplications = [...applications].sort((first, second) => {
    const firstData = first.data || {}
    const secondData = second.data || {}
    const typeComparison = String(firstData.stallTypeLabel || 'Unspecified').localeCompare(
      String(secondData.stallTypeLabel || 'Unspecified'),
      'en-GB',
    )
    if (typeComparison) return typeComparison

    const firstStage = stageOrder.get(first.status) ?? 99
    const secondStage = stageOrder.get(second.status) ?? 99
    if (firstStage !== secondStage) return firstStage - secondStage

    return String(firstData.businessName || '').localeCompare(String(secondData.businessName || ''), 'en-GB')
  })
  const rows = [headings, ...sortedApplications.map(applicationRow)]
  return `\uFEFF${rows.map((row) => row.map(csvCell).join(',')).join('\r\n')}`
}

export default async function handler(req, res) {
  if (!requireAdmin(req, res)) return
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed.' })

  try {
    const applications = await listApplications()
    const date = exportFileDate()
    res.setHeader('Cache-Control', 'private, no-store')
    res.setHeader('Content-Type', 'text/csv; charset=utf-8')
    res.setHeader('Content-Disposition', `attachment; filename="shongo-all-stall-applications-${date}.csv"`)
    return res.status(200).send(applicationsToCsv(applications))
  } catch (error) {
    console.error('admin-export api error', error)
    return res.status(500).json({ error: error?.message || 'Unable to export applications.' })
  }
}
