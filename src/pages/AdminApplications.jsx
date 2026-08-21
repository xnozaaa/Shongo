import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const statuses = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'approved', label: 'Approved' },
  { value: 'declined', label: 'Declined' },
  { value: 'paid', label: 'Paid' },
]

const fieldLabels = {
  insuranceFile: 'Liability insurance',
  foodHygieneFile: 'Food hygiene certificate',
  localAuthorityFile: 'Local authority registration',
  hygieneRatingFile: 'Food hygiene rating',
  otherFile: 'Other supporting document',
}

const stallOptions = [
  { value: 'artisan', label: 'Artisan Stall – £200' },
  { value: 'cold-food', label: 'Cold Food Stall – £300' },
  { value: 'hot-food', label: 'Hot Food Stall – £400' },
]

const attachmentFieldOptions = [
  { value: 'insuranceFile', label: 'Liability insurance' },
  { value: 'foodHygieneFile', label: 'Food hygiene certificate' },
  { value: 'localAuthorityFile', label: 'Local authority registration' },
  { value: 'hygieneRatingFile', label: 'Food hygiene rating' },
  { value: 'otherFile', label: 'Other supporting document' },
]

const acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
const uploadContentTypes = {
  pdf: 'application/pdf',
  doc: 'application/msword',
  docx: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  jpg: 'image/jpeg',
  jpeg: 'image/jpeg',
  png: 'image/png',
}

function safeUploadFilename(value) {
  return String(value || 'attachment')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
}

function uploadContentType(filename) {
  const extension = String(filename || '').split('.').pop().toLowerCase()
  return uploadContentTypes[extension]
}

function getEmailDeliveryIssue(application) {
  if (!application) return ''
  if (Object.prototype.hasOwnProperty.call(application, 'emailDeliveryIssue')) {
    return String(application.emailDeliveryIssue || '')
  }

  const delivery = application.emailDelivery || {}
  const error = String(delivery.lastError || '')
  if (!error || delivery.applicant !== 'failed') return error

  const lastErrorAt = Date.parse(delivery.lastErrorAt || '')
  const latestEmailEditAt = (Array.isArray(application.editHistory) ? application.editHistory : [])
    .filter((entry) => Array.isArray(entry?.fields) && entry.fields.includes('businessEmail'))
    .reduce((latest, entry) => Math.max(latest, Date.parse(entry.editedAt || '') || 0), 0)

  return latestEmailEditAt && (!lastErrorAt || latestEmailEditAt > lastErrorAt) ? '' : error
}

function formatDate(value, options = {}) {
  if (!value) return 'Not available'
  return new Intl.DateTimeFormat('en-GB', {
    dateStyle: 'medium',
    timeStyle: options.dateOnly ? undefined : 'short',
  }).format(new Date(value))
}

function formatMoney(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(Number(value || 0))
}

function formatFileSize(bytes) {
  const size = Number(bytes || 0)
  if (size < 1024 * 1024) return `${Math.max(1, Math.round(size / 1024))} KB`
  return `${(size / (1024 * 1024)).toFixed(1)} MB`
}

async function apiRequest(url, options) {
  const response = await fetch(url, options)
  const contentType = response.headers.get('content-type') || ''
  const result = contentType.includes('application/json') ? await response.json() : {}
  if (!response.ok) {
    const error = new Error(result.error || 'Something went wrong.')
    error.status = response.status
    throw error
  }
  return result
}

function StatusBadge({ status }) {
  const label = statuses.find((item) => item.value === status)?.label || (status === 'waitlisted' ? 'Waitlisted (legacy)' : status)
  const styles = {
    new: 'bg-blue-50 text-blue-700 ring-blue-600/15',
    reviewing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
    declined: 'bg-rose-50 text-rose-700 ring-rose-600/15',
    paid: 'bg-violet-50 text-violet-700 ring-violet-600/15',
    waitlisted: 'bg-stone-100 text-stone-700 ring-stone-600/10',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold ring-1 ring-inset ${styles[status] || 'bg-stone-100 text-stone-700 ring-stone-600/10'}`}>
      {label}
    </span>
  )
}

function AdminLogin({ onLogin }) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await apiRequest('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      await onLogin()
    } catch (loginError) {
      setError(loginError.message)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen bg-mela-green-dark px-4 py-10 flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(201,168,76,0.22),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(159,29,32,0.35),transparent_42%)]" />
      <section className="relative w-full max-w-md rounded-[2rem] bg-white shadow-2xl shadow-black/25 border border-white/40 overflow-hidden">
        <div className="h-2 bg-gradient-to-r from-mela-red via-mela-gold to-mela-green" />
        <div className="p-7 sm:p-9">
          <a href="/" className="inline-flex mb-8" aria-label="Return to Shongo Shomithi home page">
            <img src="/ss-logo-horizontal.webp" alt="Shongo Shomithi" className="h-16 w-auto" />
          </a>
          <p className="text-xs font-bold uppercase tracking-[0.18em] text-mela-red mb-2">Private administration</p>
          <h1 className="font-display text-3xl sm:text-4xl text-mela-green-dark">Application dashboard</h1>
          <p className="mt-3 text-mela-dark/65 leading-relaxed">Sign in to review stall applications and supporting documents.</p>

          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            <label className="block">
              <span className="block text-sm font-bold text-mela-green-dark mb-2">Admin password</span>
              <input
                type="password"
                autoComplete="current-password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
                autoFocus
                className="w-full rounded-xl border border-mela-green/20 bg-mela-cream/35 px-4 py-3.5 text-base text-mela-dark shadow-inner focus:border-mela-gold"
              />
            </label>

            {error && (
              <div role="alert" className="rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-700">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={submitting || !password}
              className="w-full rounded-xl bg-mela-green px-5 py-3.5 font-bold text-white shadow-lg shadow-mela-green/15 transition hover:bg-mela-green-light disabled:cursor-not-allowed disabled:opacity-55"
            >
              {submitting ? 'Signing in…' : 'Sign in securely'}
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}

function MetricCard({ label, value, accent }) {
  return (
    <div className="min-w-[120px] flex-1 rounded-2xl border border-mela-gold/15 bg-white px-4 py-4 shadow-sm sm:min-w-0 sm:px-5">
      <div className={`mb-3 h-1.5 w-10 rounded-full ${accent}`} />
      <p className="whitespace-nowrap text-xs font-semibold text-mela-dark/55 sm:text-sm">{label}</p>
      <p className="mt-1 font-display text-2xl text-mela-green-dark sm:text-3xl">{value}</p>
    </div>
  )
}

function DetailItem({ label, value, wide = false }) {
  return (
    <div className={wide ? 'sm:col-span-2' : ''}>
      <dt className="text-xs font-bold uppercase tracking-[0.12em] text-mela-red/75">{label}</dt>
      <dd className="mt-1.5 whitespace-pre-wrap break-words text-[15px] leading-relaxed text-mela-dark/80">{value || 'Not provided'}</dd>
    </div>
  )
}

function SectionHeader({ title, onEdit, editing, disabled = false }) {
  return (
    <div className="flex items-center justify-between gap-3">
      <h3 className="font-display text-xl text-mela-green-dark">{title}</h3>
      {!editing && (
        <button type="button" onClick={onEdit} disabled={disabled} className="rounded-lg border border-mela-green/15 bg-mela-cream/35 px-3.5 py-2 text-sm font-bold text-mela-green-dark hover:bg-mela-cream disabled:cursor-not-allowed disabled:opacity-50">
          Edit
        </button>
      )}
    </div>
  )
}

function EditField({ label, name, value, onChange, type = 'text', wide = false, multiline = false, required = false, min, step }) {
  const classes = 'mt-2 w-full rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-mela-dark focus:border-mela-gold'
  return (
    <label className={wide ? 'sm:col-span-2' : ''}>
      <span className="block text-sm font-bold text-mela-green-dark">{label}{required ? ' *' : ''}</span>
      {multiline ? (
        <textarea name={name} value={value} onChange={onChange} rows={4} className={`${classes} resize-y`} required={required} />
      ) : (
        <input name={name} value={value} onChange={onChange} type={type} min={min} step={step} className={classes} required={required} />
      )}
    </label>
  )
}

function EditActions({ saving, onCancel, disabled = false }) {
  return (
    <div className="mt-5 flex flex-wrap items-center gap-3 sm:col-span-2">
      <button type="submit" disabled={saving || disabled} className="rounded-xl bg-mela-green px-5 py-3 font-bold text-white hover:bg-mela-green-light disabled:opacity-55">
        {saving ? 'Saving…' : 'Save changes'}
      </button>
      <button type="button" onClick={onCancel} disabled={saving} className="rounded-xl border border-mela-green/15 bg-white px-5 py-3 font-bold text-mela-green-dark hover:bg-mela-cream disabled:opacity-55">
        Cancel
      </button>
    </div>
  )
}

const editableSectionFields = {
  business: ['businessName', 'businessAddress', 'localAuthority', 'stallType', 'totalPayable'],
  contact: ['contactName', 'applicantFullName', 'businessEmail', 'businessContactNumber'],
  trading: ['itemsToBeSold', 'electricalRequirements'],
}

const editableSectionLabels = {
  business: 'Business details',
  contact: 'Contact details',
  trading: 'Trading requirements',
}

function ConfirmationItem({ label, value, confirmedText }) {
  const confirmed = value === true || ['true', 'yes', 'accepted', 'confirmed'].includes(String(value || '').toLowerCase())
  const missing = value === undefined || value === null || value === ''
  const status = confirmed ? confirmedText : missing ? 'Not recorded for this imported application' : 'Not accepted'

  return (
    <div className={`flex gap-3 rounded-xl border p-4 ${confirmed ? 'border-emerald-200 bg-emerald-50' : 'border-amber-200 bg-amber-50'}`}>
      <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-sm font-black ${confirmed ? 'bg-emerald-600 text-white' : 'bg-amber-500 text-white'}`} aria-hidden="true">
        {confirmed ? '✓' : '—'}
      </span>
      <div>
        <p className="font-bold text-mela-green-dark">{label}</p>
        <p className={`mt-1 text-sm font-semibold ${confirmed ? 'text-emerald-800' : 'text-amber-800'}`}>{status}</p>
      </div>
    </div>
  )
}

function ApplicationDrawer({ application, loading, onClose, onSaved, onDeleted }) {
  const [status, setStatus] = useState('new')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [editingSection, setEditingSection] = useState(null)
  const [editDraft, setEditDraft] = useState({})
  const [sectionSaving, setSectionSaving] = useState(false)
  const [sectionMessage, setSectionMessage] = useState('')
  const [sectionError, setSectionError] = useState('')
  const [uploadField, setUploadField] = useState('otherFile')
  const [uploadFiles, setUploadFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState('')
  const [uploadMessage, setUploadMessage] = useState('')
  const [uploadError, setUploadError] = useState('')
  const [confirmAttachmentDelete, setConfirmAttachmentDelete] = useState(null)
  const [deletingAttachmentId, setDeletingAttachmentId] = useState(null)
  const [attachmentMessage, setAttachmentMessage] = useState('')
  const [attachmentError, setAttachmentError] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [error, setError] = useState('')
  const uploadInputRef = useRef(null)
  const applicationId = application?.id
  const data = application?.data || {}
  const attachments = Array.isArray(application?.attachments) ? application.attachments : []
  const emailDeliveryIssue = getEmailDeliveryIssue(application)
  const mutationBusy = saving || sectionSaving || uploading || Boolean(deletingAttachmentId) || deleting

  useEffect(() => {
    if (!application) return
    setStatus(application.status || 'new')
    setAdminNotes(application.adminNotes || '')
  }, [application])

  useEffect(() => {
    setEditingSection(null)
    setEditDraft({})
    setSectionMessage('')
    setSectionError('')
    setUploadFiles([])
    setUploadProgress('')
    setUploadMessage('')
    setUploadError('')
    setConfirmAttachmentDelete(null)
    setDeletingAttachmentId(null)
    setAttachmentMessage('')
    setAttachmentError('')
    setConfirmDelete(false)
    setSaveMessage('')
    setError('')
    if (uploadInputRef.current) uploadInputRef.current.value = ''
  }, [applicationId])

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [onClose])

  const handleSave = async () => {
    setSaving(true)
    setError('')
    setSaveMessage('')
    try {
      const result = await apiRequest(`/api/admin-application?id=${encodeURIComponent(application.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, adminNotes }),
      })
      onSaved(result.application)
      setSaveMessage('Changes saved')
    } catch (saveError) {
      setError(saveError.message)
    } finally {
      setSaving(false)
    }
  }

  const startEditing = (section) => {
    const drafts = {
      business: {
        businessName: data.businessName || '',
        businessAddress: data.businessAddress || '',
        localAuthority: data.localAuthority || '',
        stallType: stallOptions.some((option) => option.value === data.stallType) ? data.stallType : '',
        totalPayable: data.totalPayable ?? '',
      },
      contact: {
        contactName: data.contactName || '',
        applicantFullName: data.applicantFullName || '',
        businessEmail: data.businessEmail || '',
        businessContactNumber: data.businessContactNumber || '',
      },
      trading: {
        itemsToBeSold: data.itemsToBeSold || '',
        electricalRequirements: data.electricalRequirements || '',
      },
    }

    setEditingSection(section)
    setEditDraft(drafts[section])
    setSectionMessage('')
    setSectionError('')
  }

  const handleEditChange = (event) => {
    const { name, value } = event.target
    setEditDraft((current) => ({ ...current, [name]: value }))
  }

  const cancelEditing = () => {
    setEditingSection(null)
    setEditDraft({})
    setSectionError('')
  }

  const handleSectionSave = async (event) => {
    event.preventDefault()
    setSectionSaving(true)
    setSectionError('')
    setSectionMessage('')

    try {
      const correctedFailedRecipient = editingSection === 'contact'
        && application.emailDelivery?.applicant === 'failed'
        && application.emailDelivery?.lastError
        && String(editDraft.businessEmail || '').trim() !== String(data.businessEmail || '').trim()
      const changes = Object.fromEntries(editableSectionFields[editingSection].flatMap((field) => {
        const value = editDraft[field]
        if ((field === 'stallType' || field === 'totalPayable') && value === '') return []
        return [[field, value]]
      }))
      const result = await apiRequest(`/api/admin-application?id=${encodeURIComponent(application.id)}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data: changes }),
      })
      const savedSection = editingSection
      onSaved(result.application)
      setEditingSection(null)
      setEditDraft({})
      setSectionMessage(correctedFailedRecipient
        ? 'Contact details updated. The old email delivery warning was cleared; no email was resent.'
        : `${editableSectionLabels[savedSection]} updated`)
    } catch (saveError) {
      setSectionError(saveError.message)
    } finally {
      setSectionSaving(false)
    }
  }

  const handleUpload = async () => {
    setUploadError('')
    setUploadMessage('')

    if (!uploadFiles.length) {
      setUploadError('Please choose at least one file to upload.')
      return
    }
    if (uploadFiles.length > 10) {
      setUploadError('Please upload no more than 10 files at a time.')
      return
    }

    const invalidFile = uploadFiles.find((file) => !uploadContentType(file.name) || file.size > 5 * 1024 * 1024)
    if (invalidFile) {
      setUploadError(`${invalidFile.name} must be a PDF, Word document, JPG or PNG file no larger than 5MB.`)
      return
    }

    setUploading(true)
    try {
      const { upload } = await import('@vercel/blob/client')
      let updatedApplication = application

      for (const [index, file] of uploadFiles.entries()) {
        setUploadProgress(`Uploading ${index + 1} of ${uploadFiles.length}…`)
        const uploadId = crypto.randomUUID()
        const pathname = `applications/files/${application.id}/${uploadField}-${uploadId}-${safeUploadFilename(file.name)}`
        const blob = await upload(pathname, file, {
          access: 'private',
          handleUploadUrl: '/api/admin-upload',
          contentType: uploadContentType(file.name),
          multipart: false,
          clientPayload: JSON.stringify({
            applicationId: application.id,
            uploadId,
            field: uploadField,
            filename: file.name,
          }),
        })
        const result = await apiRequest('/api/admin-attachment', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            applicationId: application.id,
            field: uploadField,
            filename: file.name,
            pathname: blob.pathname,
          }),
        })
        updatedApplication = result.application
        onSaved(updatedApplication)
      }

      setUploadMessage(`${uploadFiles.length} ${uploadFiles.length === 1 ? 'file' : 'files'} uploaded successfully`)
      setUploadFiles([])
      setUploadProgress('')
      if (uploadInputRef.current) uploadInputRef.current.value = ''
    } catch (uploadErrorValue) {
      setUploadError(uploadErrorValue.message)
    } finally {
      setUploading(false)
      setUploadProgress('')
    }
  }

  const handleDeleteAttachment = async (attachment) => {
    setDeletingAttachmentId(attachment.id)
    setAttachmentError('')
    setAttachmentMessage('')

    try {
      const result = await apiRequest(`/api/admin-attachment?applicationId=${encodeURIComponent(application.id)}&attachmentId=${encodeURIComponent(attachment.id)}`, {
        method: 'DELETE',
      })
      onSaved(result.application)
      setConfirmAttachmentDelete(null)
      setAttachmentMessage(`${attachment.filename} was deleted from this application.`)
    } catch (deleteError) {
      setAttachmentError(deleteError.message)
    } finally {
      setDeletingAttachmentId(null)
    }
  }

  const handleDelete = async () => {
    setDeleting(true)
    setError('')
    try {
      await apiRequest(`/api/admin-application?id=${encodeURIComponent(application.id)}`, { method: 'DELETE' })
      onDeleted(application.id)
    } catch (deleteError) {
      setError(deleteError.message)
      setDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-[100] flex justify-end" role="dialog" aria-modal="true" aria-label="Application details">
      <button type="button" onClick={onClose} className="absolute inset-0 bg-mela-green-dark/55 backdrop-blur-[2px]" aria-label="Close application details" />
      <aside className="relative h-full w-full max-w-3xl overflow-y-auto bg-mela-warm shadow-2xl">
        <div className="sticky top-0 z-10 border-b border-mela-gold/15 bg-white/95 px-5 py-4 backdrop-blur-xl sm:px-7">
          <div className="flex items-start justify-between gap-4">
            <div className="min-w-0">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-mela-red">Application details</p>
              <h2 className="mt-1 truncate font-display text-2xl text-mela-green-dark sm:text-3xl">
                {application?.data?.businessName || 'Loading…'}
              </h2>
            </div>
            <button type="button" onClick={onClose} className="rounded-full border border-mela-green/15 bg-mela-cream/50 px-3 py-2 text-sm font-bold text-mela-green-dark hover:bg-mela-cream">
              Close
            </button>
          </div>
        </div>

        {loading || !application ? (
          <div className="p-8 text-mela-dark/60">Loading application…</div>
        ) : (
          <div className="space-y-6 p-5 sm:p-7">
            {emailDeliveryIssue && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                <p className="font-bold">Email delivery needs attention</p>
                <p className="mt-1 break-words">{emailDeliveryIssue}</p>
              </div>
            )}
            {sectionMessage && (
              <div role="status" className="rounded-2xl border border-emerald-200 bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-800">
                {sectionMessage}
              </div>
            )}
            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={application.status} />
                <p className="text-sm text-mela-dark/55">Submitted {formatDate(application.submittedAt)}</p>
              </div>
              <div className="mt-6">
                <SectionHeader title="Business details" editing={editingSection === 'business'} disabled={mutationBusy} onEdit={() => startEditing('business')} />
                {editingSection === 'business' ? (
                  <form onSubmit={handleSectionSave} className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <EditField label="Business / trading name" name="businessName" value={editDraft.businessName || ''} onChange={handleEditChange} required />
                    <label>
                      <span className="block text-sm font-bold text-mela-green-dark">Stall type</span>
                      <select name="stallType" value={editDraft.stallType || ''} onChange={handleEditChange} className="mt-2 w-full rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-mela-dark focus:border-mela-gold">
                        <option value="">Keep current: {data.stallTypeLabel || 'Not specified'}</option>
                        {stallOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                      </select>
                    </label>
                    <EditField label="Registered business address" name="businessAddress" value={editDraft.businessAddress || ''} onChange={handleEditChange} wide multiline required />
                    <EditField label="Local authority" name="localAuthority" value={editDraft.localAuthority || ''} onChange={handleEditChange} />
                    <EditField label="Total payable (£)" name="totalPayable" value={editDraft.totalPayable ?? ''} onChange={handleEditChange} type="number" min="0" step="0.01" />
                    {sectionError && <p role="alert" className="text-sm font-semibold text-rose-700 sm:col-span-2">{sectionError}</p>}
                    <EditActions saving={sectionSaving} disabled={mutationBusy && !sectionSaving} onCancel={cancelEditing} />
                  </form>
                ) : (
                  <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                    <DetailItem label="Business / trading name" value={data.businessName} />
                    <DetailItem label="Stall type" value={data.stallTypeLabel} />
                    <DetailItem label="Registered business address" value={data.businessAddress} wide />
                    <DetailItem label="Local authority" value={data.localAuthority} />
                    <DetailItem label="Total payable" value={formatMoney(data.totalPayable)} />
                  </dl>
                )}
              </div>
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <SectionHeader title="Contact details" editing={editingSection === 'contact'} disabled={mutationBusy} onEdit={() => startEditing('contact')} />
              {editingSection === 'contact' ? (
                <form onSubmit={handleSectionSave} className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  <EditField label="Contact name" name="contactName" value={editDraft.contactName || ''} onChange={handleEditChange} required />
                  <EditField label="Applicant name" name="applicantFullName" value={editDraft.applicantFullName || ''} onChange={handleEditChange} required />
                  <EditField label="Business email" name="businessEmail" value={editDraft.businessEmail || ''} onChange={handleEditChange} type="email" required />
                  <EditField label="Contact number" name="businessContactNumber" value={editDraft.businessContactNumber || ''} onChange={handleEditChange} required />
                  {sectionError && <p role="alert" className="text-sm font-semibold text-rose-700 sm:col-span-2">{sectionError}</p>}
                  <EditActions saving={sectionSaving} disabled={mutationBusy && !sectionSaving} onCancel={cancelEditing} />
                </form>
              ) : (
                <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                  <DetailItem label="Contact name" value={data.contactName} />
                  <DetailItem label="Applicant name" value={data.applicantFullName} />
                  <DetailItem label="Business email" value={data.businessEmail} />
                  <DetailItem label="Contact number" value={data.businessContactNumber} />
                </dl>
              )}
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <SectionHeader title="Trading requirements" editing={editingSection === 'trading'} disabled={mutationBusy} onEdit={() => startEditing('trading')} />
              {editingSection === 'trading' ? (
                <form onSubmit={handleSectionSave} className="mt-5 grid gap-5">
                  <EditField label="Items to be sold" name="itemsToBeSold" value={editDraft.itemsToBeSold || ''} onChange={handleEditChange} wide multiline required />
                  <EditField label="Electrical requirements" name="electricalRequirements" value={editDraft.electricalRequirements || ''} onChange={handleEditChange} wide multiline required />
                  {sectionError && <p role="alert" className="text-sm font-semibold text-rose-700">{sectionError}</p>}
                  <EditActions saving={sectionSaving} disabled={mutationBusy && !sectionSaving} onCancel={cancelEditing} />
                </form>
              ) : (
                <dl className="mt-5 grid gap-5">
                  <DetailItem label="Items to be sold" value={data.itemsToBeSold} wide />
                  <DetailItem label="Electrical requirements" value={data.electricalRequirements} wide />
                </dl>
              )}
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl text-mela-green-dark">Agreements and declarations</h3>
              <dl className="mt-5 grid gap-5">
                <DetailItem label="Digital signature" value={data.digitalSignature} wide />
              </dl>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ConfirmationItem label="Terms & Conditions for Traders" value={data.termsAgreement} confirmedText="Accepted" />
                <ConfirmationItem label="Trader declaration checkbox" value={data.declarationSafety} confirmedText="Confirmed" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-mela-dark/55">The original signature and consent confirmations are preserved exactly as submitted and cannot be changed by an administrator.</p>
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl text-mela-green-dark">Supporting documents</h3>
                <span className="text-sm font-semibold text-mela-dark/50">{attachments.length} {attachments.length === 1 ? 'file' : 'files'}</span>
              </div>
              {attachmentMessage && <p role="status" className="mt-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">{attachmentMessage}</p>}
              {attachmentError && <p role="alert" className="mt-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-800">{attachmentError}</p>}
              <div className="mt-5 space-y-3">
                {!attachments.length && <p className="rounded-xl bg-mela-cream/35 px-4 py-5 text-sm text-mela-dark/55">No supporting documents have been added yet.</p>}
                {attachments.map((attachment) => {
                  const baseUrl = `/api/admin-file?applicationId=${encodeURIComponent(application.id)}&attachmentId=${encodeURIComponent(attachment.id)}`
                  const canPreview = ['application/pdf', 'image/jpeg', 'image/png'].includes(attachment.contentType)
                  return (
                    <div key={attachment.id} className="rounded-xl border border-mela-green/10 bg-mela-cream/30 p-4">
                      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <div className="min-w-0">
                          <p className="font-bold text-mela-green-dark">{fieldLabels[attachment.field] || 'Supporting document'}</p>
                          <p className="mt-1 truncate text-sm text-mela-dark/55">{attachment.filename} · {formatFileSize(attachment.size)}</p>
                          {attachment.uploadedBy === 'admin' && <p className="mt-1 text-xs font-semibold text-violet-700">Added by admin</p>}
                        </div>
                        <div className="flex shrink-0 flex-wrap gap-2">
                          {canPreview && <a href={baseUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-mela-green px-3.5 py-2 text-sm font-bold text-white hover:bg-mela-green-light">View</a>}
                          <a href={`${baseUrl}&download=1`} className="rounded-lg border border-mela-green/15 bg-white px-3.5 py-2 text-sm font-bold text-mela-green-dark hover:bg-mela-cream">Download</a>
                          <button type="button" aria-label={`Delete ${attachment.filename}`} onClick={() => setConfirmAttachmentDelete(attachment.id)} disabled={mutationBusy} className="rounded-lg border border-rose-200 bg-white px-3.5 py-2 text-sm font-bold text-rose-700 hover:bg-rose-50 disabled:opacity-50">Delete</button>
                        </div>
                      </div>
                      {confirmAttachmentDelete === attachment.id && (
                        <div className="mt-4 rounded-xl border border-rose-200 bg-white p-4">
                          <p className="font-bold text-rose-900">Delete this document permanently?</p>
                          <p className="mt-1 text-sm leading-relaxed text-rose-800/75">It will be removed from this dashboard and private storage. Copies attached to emails already sent cannot be removed.</p>
                          <div className="mt-4 flex flex-wrap gap-3">
                            <button type="button" onClick={() => handleDeleteAttachment(attachment)} disabled={mutationBusy} className="rounded-lg bg-rose-700 px-4 py-2.5 text-sm font-bold text-white hover:bg-rose-800 disabled:opacity-50">
                              {deletingAttachmentId === attachment.id ? 'Deleting…' : 'Yes, delete document'}
                            </button>
                            <button type="button" onClick={() => setConfirmAttachmentDelete(null)} disabled={Boolean(deletingAttachmentId)} className="rounded-lg border border-mela-green/15 bg-white px-4 py-2.5 text-sm font-bold text-mela-green-dark hover:bg-mela-cream disabled:opacity-50">Cancel</button>
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
              <div className="mt-6 rounded-xl border border-dashed border-mela-green/25 bg-mela-cream/25 p-4 sm:p-5">
                <h4 className="font-bold text-mela-green-dark">Add supporting documents</h4>
                <p className="mt-1 text-sm text-mela-dark/55">Files are stored privately and will only be available inside this admin dashboard.</p>
                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <label>
                    <span className="block text-sm font-bold text-mela-green-dark">Document category</span>
                    <select value={uploadField} onChange={(event) => setUploadField(event.target.value)} disabled={mutationBusy} className="mt-2 w-full rounded-xl border border-mela-green/15 bg-white px-4 py-3 text-mela-dark disabled:opacity-55">
                      {attachmentFieldOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
                    </select>
                  </label>
                  <label>
                    <span className="block text-sm font-bold text-mela-green-dark">Choose files</span>
                    <input ref={uploadInputRef} type="file" accept={acceptedFileTypes} multiple disabled={mutationBusy} onChange={(event) => setUploadFiles(Array.from(event.target.files || []))} className="mt-2 block w-full rounded-xl border border-mela-green/15 bg-white px-3 py-2.5 text-sm text-mela-dark file:mr-3 file:rounded-lg file:border-0 file:bg-mela-green file:px-3 file:py-2 file:font-bold file:text-white disabled:opacity-55" />
                  </label>
                </div>
                {uploadFiles.length > 0 && <p className="mt-3 text-sm font-semibold text-mela-dark/65">{uploadFiles.length} {uploadFiles.length === 1 ? 'file' : 'files'} selected</p>}
                {uploadError && <p role="alert" className="mt-3 text-sm font-semibold text-rose-700">{uploadError}</p>}
                {uploadMessage && <p role="status" className="mt-3 text-sm font-semibold text-emerald-700">{uploadMessage}</p>}
                <div className="mt-4 flex flex-wrap items-center gap-3">
                  <button type="button" onClick={handleUpload} disabled={mutationBusy || !uploadFiles.length} className="rounded-xl bg-mela-green px-5 py-3 font-bold text-white hover:bg-mela-green-light disabled:opacity-55">
                    {uploading ? 'Uploading…' : 'Upload selected files'}
                  </button>
                  {uploadProgress && <span className="text-sm font-bold text-mela-green-dark">{uploadProgress}</span>}
                </div>
                <p className="mt-3 text-xs text-mela-dark/45">Accepted: PDF, DOC, DOCX, JPG and PNG. Maximum 5MB per file.</p>
              </div>
            </section>

            <section className="rounded-2xl border border-mela-gold/20 bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl text-mela-green-dark">Review decision</h3>
              <div className="mt-5 grid gap-5">
                <label>
                  <span className="block text-sm font-bold text-mela-green-dark mb-2">Status</span>
                  <select value={status} onChange={(event) => setStatus(event.target.value)} disabled={mutationBusy} className="w-full rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-mela-dark disabled:opacity-55">
                    {status === 'waitlisted' && <option value="waitlisted">Waitlisted (legacy)</option>}
                    {statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
                  </select>
                </label>
                <label>
                  <span className="block text-sm font-bold text-mela-green-dark mb-2">Private admin notes</span>
                  <textarea
                    value={adminNotes}
                    onChange={(event) => setAdminNotes(event.target.value)}
                    rows={5}
                    maxLength={5000}
                    disabled={mutationBusy}
                    placeholder="Add review notes, follow-up details or payment information…"
                    className="w-full resize-y rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-mela-dark"
                  />
                </label>
              </div>
              {error && <p role="alert" className="mt-4 text-sm font-semibold text-rose-700">{error}</p>}
              <div className="mt-5 flex items-center gap-4">
                <button type="button" onClick={handleSave} disabled={mutationBusy} className="rounded-xl bg-mela-red px-5 py-3 font-bold text-white shadow-md hover:bg-mela-red-light disabled:opacity-55">
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                {saveMessage && <span className="text-sm font-bold text-emerald-700">{saveMessage}</span>}
              </div>
            </section>

            <section className="rounded-2xl border border-rose-200 bg-rose-50 p-5 sm:p-6">
              <h3 className="font-display text-xl text-rose-900">Delete application</h3>
              <p className="mt-2 text-sm leading-relaxed text-rose-800/80">
                Use this to remove unwanted records. The application and all attached files will be permanently deleted and cannot be recovered.
              </p>
              {confirmDelete ? (
                <div className="mt-5 rounded-xl border border-rose-300 bg-white p-4">
                  <p className="font-bold text-rose-900">Are you sure? This cannot be undone.</p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <button type="button" onClick={handleDelete} disabled={mutationBusy} className="rounded-xl bg-rose-700 px-5 py-3 font-bold text-white hover:bg-rose-800 disabled:opacity-55">
                      {deleting ? 'Deleting…' : 'Yes, delete permanently'}
                    </button>
                    <button type="button" onClick={() => setConfirmDelete(false)} disabled={deleting} className="rounded-xl border border-mela-green/15 bg-white px-5 py-3 font-bold text-mela-green-dark hover:bg-mela-cream disabled:opacity-55">
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <button type="button" onClick={() => setConfirmDelete(true)} disabled={mutationBusy} className="mt-5 rounded-xl border border-rose-300 bg-white px-5 py-3 font-bold text-rose-800 hover:bg-rose-100 disabled:opacity-50">
                  Delete application
                </button>
              )}
            </section>
          </div>
        )}
      </aside>
    </div>
  )
}

export default function AdminApplications() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [authState, setAuthState] = useState('loading')
  const [applications, setApplications] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [selected, setSelected] = useState(null)
  const [detailLoading, setDetailLoading] = useState(false)

  const loadApplications = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const result = await apiRequest('/api/admin-applications')
      setApplications(result.applications || [])
      setAuthState('authenticated')
    } catch (loadError) {
      if (loadError.status === 401) setAuthState('anonymous')
      else setError(loadError.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadApplications()
  }, [loadApplications])

  const selectedId = searchParams.get('application')
  useEffect(() => {
    if (!selectedId || authState !== 'authenticated') {
      setSelected(null)
      return
    }

    let cancelled = false
    setSelected(null)
    setDetailLoading(true)
    apiRequest(`/api/admin-application?id=${encodeURIComponent(selectedId)}`)
      .then((result) => {
        if (!cancelled) setSelected(result.application)
      })
      .catch((detailError) => {
        if (!cancelled) setError(detailError.message)
      })
      .finally(() => {
        if (!cancelled) setDetailLoading(false)
      })

    return () => { cancelled = true }
  }, [authState, selectedId])

  const filteredApplications = useMemo(() => {
    const query = search.trim().toLowerCase()
    return applications.filter((application) => {
      const matchesStatus = statusFilter === 'all' || application.status === statusFilter
      const haystack = [
        application.businessName,
        application.contactName,
        application.contactEmail,
        application.contactNumber,
        application.stallTypeLabel,
      ].join(' ').toLowerCase()
      return matchesStatus && (!query || haystack.includes(query))
    })
  }, [applications, search, statusFilter])

  const counts = useMemo(() => ({
    total: applications.length,
    new: applications.filter((item) => item.status === 'new').length,
    reviewing: applications.filter((item) => item.status === 'reviewing').length,
    approved: applications.filter((item) => item.status === 'approved').length,
    declined: applications.filter((item) => item.status === 'declined').length,
    paid: applications.filter((item) => item.status === 'paid').length,
  }), [applications])

  const openApplication = (id) => setSearchParams({ application: id })
  const closeApplication = useCallback(() => setSearchParams({}), [setSearchParams])

  const handleSaved = (application) => {
    setSelected(application)
    const data = application.data || {}
    const attachments = Array.isArray(application.attachments) ? application.attachments : []
    setApplications((current) => current.map((item) => (
      item.id === application.id
        ? {
            ...item,
            status: application.status,
            updatedAt: application.updatedAt,
            businessName: data.businessName || 'Unnamed business',
            contactName: data.contactName || '',
            contactEmail: data.businessEmail || data.contactEmail || '',
            contactNumber: data.businessContactNumber || data.contactNumber || '',
            stallType: data.stallType || '',
            stallTypeLabel: data.stallTypeLabel || '',
            totalPayable: data.totalPayable || 0,
            attachmentCount: attachments.length,
            emailDelivery: application.emailDelivery,
            emailDeliveryIssue: getEmailDeliveryIssue(application),
          }
        : item
    )))
  }

  const handleDeleted = (id) => {
    setApplications((current) => current.filter((item) => item.id !== id))
    closeApplication()
  }

  const handleLogout = async () => {
    await apiRequest('/api/admin-logout', { method: 'POST' }).catch(() => {})
    setApplications([])
    setAuthState('anonymous')
    closeApplication()
  }

  if (authState === 'loading') {
    return <main className="min-h-screen bg-mela-green-dark flex items-center justify-center text-white font-semibold">Opening secure dashboard…</main>
  }

  if (authState === 'anonymous') return <AdminLogin onLogin={loadApplications} />

  return (
    <main className="min-h-screen bg-[#f6f1e8]">
      <header className="border-b border-mela-gold/15 bg-white">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <a href="/" className="shrink-0" aria-label="Return to website"><img src="/ss-logo-horizontal.webp" alt="Shongo Shomithi" className="h-12 sm:h-14 w-auto" /></a>
            <div className="hidden h-9 w-px bg-mela-gold/25 sm:block" />
            <div className="min-w-0">
              <p className="truncate font-display text-xl text-mela-green-dark sm:text-2xl">Applications</p>
              <p className="hidden text-xs font-semibold text-mela-dark/45 sm:block">Private admin dashboard</p>
            </div>
          </div>
          <button type="button" onClick={handleLogout} className="rounded-xl border border-mela-green/15 bg-mela-cream/35 px-4 py-2.5 text-sm font-bold text-mela-green-dark hover:bg-mela-cream">Sign out</button>
        </div>
      </header>

      <div className="mx-auto max-w-[1500px] px-4 py-7 sm:px-6 sm:py-9 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-mela-red">Walsall Bangla Community Day 2026</p>
            <h1 className="mt-2 font-display text-3xl text-mela-green-dark sm:text-4xl">Stall applications</h1>
            <p className="mt-2 text-mela-dark/55">Review submissions, supporting documents and decisions in one place.</p>
          </div>
          <div className="flex flex-wrap gap-3 self-start sm:self-auto">
            <a href="/api/admin-export" download className="rounded-xl border border-mela-green/15 bg-white px-4 py-2.5 text-sm font-bold text-mela-green-dark shadow-sm hover:bg-mela-cream">
              Export to Excel
            </a>
            <button type="button" onClick={loadApplications} disabled={loading} className="rounded-xl bg-mela-green px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-mela-green-light disabled:opacity-55">
              {loading ? 'Refreshing…' : 'Refresh applications'}
            </button>
          </div>
        </div>

        <section className="mt-7 flex gap-3 overflow-x-auto pb-1">
          <MetricCard label="Total applications" value={counts.total} accent="bg-mela-green" />
          <MetricCard label="New" value={counts.new} accent="bg-blue-500" />
          <MetricCard label="Reviewing" value={counts.reviewing} accent="bg-amber-500" />
          <MetricCard label="Approved" value={counts.approved} accent="bg-emerald-500" />
          <MetricCard label="Declined" value={counts.declined} accent="bg-rose-500" />
          <MetricCard label="Paid" value={counts.paid} accent="bg-violet-500" />
        </section>

        <section className="mt-6 overflow-hidden rounded-2xl border border-mela-gold/15 bg-white shadow-sm">
          <div className="grid gap-3 border-b border-mela-gold/10 p-4 sm:grid-cols-[minmax(0,1fr)_220px] sm:p-5">
            <label className="relative block">
              <span className="sr-only">Search applications</span>
              <input
                type="search"
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search business, applicant, email or telephone…"
                className="w-full rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-sm text-mela-dark placeholder:text-mela-dark/35"
              />
            </label>
            <label>
              <span className="sr-only">Filter by status</span>
              <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value)} className="w-full rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-sm font-semibold text-mela-green-dark">
                <option value="all">All statuses</option>
                {statuses.map((item) => <option key={item.value} value={item.value}>{item.label}</option>)}
              </select>
            </label>
          </div>

          {error && (
            <div role="alert" className="m-4 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-semibold text-rose-700 sm:m-5">
              {error}
            </div>
          )}

          {loading && !applications.length ? (
            <div className="px-5 py-16 text-center text-mela-dark/50">Loading applications…</div>
          ) : !filteredApplications.length ? (
            <div className="px-5 py-16 text-center">
              <p className="font-display text-2xl text-mela-green-dark">No applications found</p>
              <p className="mt-2 text-sm text-mela-dark/50">New stall applications will appear here automatically.</p>
            </div>
          ) : (
            <>
              <div className="hidden overflow-x-auto lg:block">
                <table className="w-full border-collapse text-left">
                  <thead className="bg-mela-cream/35 text-xs uppercase tracking-[0.1em] text-mela-dark/45">
                    <tr>
                      <th className="px-5 py-3.5 font-bold">Business</th>
                      <th className="px-5 py-3.5 font-bold">Contact</th>
                      <th className="px-5 py-3.5 font-bold">Stall</th>
                      <th className="px-5 py-3.5 font-bold">Submitted</th>
                      <th className="px-5 py-3.5 font-bold">Files</th>
                      <th className="px-5 py-3.5 font-bold">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-mela-gold/10">
                    {filteredApplications.map((application) => (
                      <tr key={application.id} className="transition hover:bg-mela-cream/25">
                        <td className="px-5 py-4">
                          <button type="button" onClick={() => openApplication(application.id)} className="text-left font-bold text-mela-green-dark hover:text-mela-red hover:underline">
                            {application.businessName}
                          </button>
                          <p className="mt-1 text-xs text-mela-dark/40">{application.contactName}</p>
                          {application.emailDeliveryIssue && <p className="mt-1 text-xs font-bold text-amber-700">Email delivery issue</p>}
                        </td>
                        <td className="px-5 py-4 text-sm text-mela-dark/65">
                          <p>{application.contactEmail || 'No email'}</p>
                          <p className="mt-1 text-xs text-mela-dark/40">{application.contactNumber}</p>
                        </td>
                        <td className="max-w-[220px] px-5 py-4 text-sm text-mela-dark/65">{application.stallTypeLabel || 'Not specified'}</td>
                        <td className="whitespace-nowrap px-5 py-4 text-sm text-mela-dark/60">{formatDate(application.submittedAt)}</td>
                        <td className="px-5 py-4 text-sm font-semibold text-mela-dark/60">{application.attachmentCount}</td>
                        <td className="px-5 py-4"><StatusBadge status={application.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="divide-y divide-mela-gold/10 lg:hidden">
                {filteredApplications.map((application) => (
                  <button key={application.id} type="button" onClick={() => openApplication(application.id)} className="block w-full p-4 text-left transition hover:bg-mela-cream/25 sm:p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-bold text-mela-green-dark">{application.businessName}</p>
                        <p className="mt-1 truncate text-sm text-mela-dark/50">{application.contactName} · {application.stallTypeLabel}</p>
                        {application.emailDeliveryIssue && <p className="mt-1 text-xs font-bold text-amber-700">Email delivery issue</p>}
                      </div>
                      <StatusBadge status={application.status} />
                    </div>
                    <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-mela-dark/45">
                      <span>{formatDate(application.submittedAt)}</span>
                      <span>{application.attachmentCount} files</span>
                      <span>{formatMoney(application.totalPayable)}</span>
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}
        </section>
      </div>

      {selectedId && (
        <ApplicationDrawer
          application={selected}
          loading={detailLoading}
          onClose={closeApplication}
          onSaved={handleSaved}
          onDeleted={handleDeleted}
        />
      )}
    </main>
  )
}
