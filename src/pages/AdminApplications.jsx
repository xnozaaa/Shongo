import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const statuses = [
  { value: 'new', label: 'New' },
  { value: 'reviewing', label: 'Reviewing' },
  { value: 'approved', label: 'Approved' },
  { value: 'waitlisted', label: 'Waitlisted' },
  { value: 'declined', label: 'Declined' },
]

const fieldLabels = {
  insuranceFile: 'Liability insurance',
  foodHygieneFile: 'Food hygiene certificate',
  localAuthorityFile: 'Local authority registration',
  hygieneRatingFile: 'Food hygiene rating',
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
  const label = statuses.find((item) => item.value === status)?.label || status
  const styles = {
    new: 'bg-blue-50 text-blue-700 ring-blue-600/15',
    reviewing: 'bg-amber-50 text-amber-700 ring-amber-600/20',
    approved: 'bg-emerald-50 text-emerald-700 ring-emerald-600/15',
    waitlisted: 'bg-violet-50 text-violet-700 ring-violet-600/15',
    declined: 'bg-rose-50 text-rose-700 ring-rose-600/15',
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
    <div className="rounded-2xl border border-mela-gold/15 bg-white px-5 py-4 shadow-sm">
      <div className={`mb-3 h-1.5 w-10 rounded-full ${accent}`} />
      <p className="text-sm font-semibold text-mela-dark/55">{label}</p>
      <p className="mt-1 font-display text-3xl text-mela-green-dark">{value}</p>
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

function ApplicationDrawer({ application, loading, onClose, onSaved }) {
  const [status, setStatus] = useState('new')
  const [adminNotes, setAdminNotes] = useState('')
  const [saving, setSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    if (!application) return
    setStatus(application.status || 'new')
    setAdminNotes(application.adminNotes || '')
    setSaveMessage('')
    setError('')
  }, [application])

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

  const data = application?.data || {}

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
            {application.emailDelivery?.lastError && (
              <div className="rounded-2xl border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-800">
                <p className="font-bold">Email delivery needs attention</p>
                <p className="mt-1 break-words">{application.emailDelivery.lastError}</p>
              </div>
            )}
            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <StatusBadge status={application.status} />
                <p className="text-sm text-mela-dark/55">Submitted {formatDate(application.submittedAt)}</p>
              </div>
              <dl className="mt-6 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <DetailItem label="Business / trading name" value={data.businessName} />
                <DetailItem label="Stall type" value={data.stallTypeLabel} />
                <DetailItem label="Registered business address" value={data.businessAddress} wide />
                <DetailItem label="Local authority" value={data.localAuthority} />
                <DetailItem label="Total payable" value={formatMoney(data.totalPayable)} />
              </dl>
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl text-mela-green-dark">Contact details</h3>
              <dl className="mt-5 grid gap-x-6 gap-y-5 sm:grid-cols-2">
                <DetailItem label="Contact name" value={data.contactName} />
                <DetailItem label="Applicant name" value={data.applicantFullName} />
                <DetailItem label="Business email" value={data.businessEmail} />
                <DetailItem label="Contact number" value={data.businessContactNumber} />
              </dl>
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl text-mela-green-dark">Trading requirements</h3>
              <dl className="mt-5 grid gap-5">
                <DetailItem label="Items to be sold" value={data.itemsToBeSold} wide />
                <DetailItem label="Electrical requirements" value={data.electricalRequirements} wide />
                <DetailItem label="Digital signature" value={data.digitalSignature} wide />
              </dl>
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl text-mela-green-dark">Agreements and declarations</h3>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                <ConfirmationItem label="Terms & Conditions for Traders" value={data.termsAgreement} confirmedText="Accepted" />
                <ConfirmationItem label="Trader declaration checkbox" value={data.declarationSafety} confirmedText="Confirmed" />
              </div>
            </section>

            <section className="rounded-2xl border border-mela-gold/15 bg-white p-5 sm:p-6">
              <div className="flex items-center justify-between gap-3">
                <h3 className="font-display text-xl text-mela-green-dark">Supporting documents</h3>
                <span className="text-sm font-semibold text-mela-dark/50">{application.attachments.length} files</span>
              </div>
              <div className="mt-5 space-y-3">
                {application.attachments.map((attachment) => {
                  const baseUrl = `/api/admin-file?applicationId=${encodeURIComponent(application.id)}&attachmentId=${encodeURIComponent(attachment.id)}`
                  const canPreview = ['application/pdf', 'image/jpeg', 'image/png'].includes(attachment.contentType)
                  return (
                    <div key={attachment.id} className="flex flex-col gap-3 rounded-xl border border-mela-green/10 bg-mela-cream/30 p-4 sm:flex-row sm:items-center sm:justify-between">
                      <div className="min-w-0">
                        <p className="font-bold text-mela-green-dark">{fieldLabels[attachment.field] || 'Supporting document'}</p>
                        <p className="mt-1 truncate text-sm text-mela-dark/55">{attachment.filename} · {formatFileSize(attachment.size)}</p>
                      </div>
                      <div className="flex shrink-0 gap-2">
                        {canPreview && <a href={baseUrl} target="_blank" rel="noreferrer" className="rounded-lg bg-mela-green px-3.5 py-2 text-sm font-bold text-white hover:bg-mela-green-light">View</a>}
                        <a href={`${baseUrl}&download=1`} className="rounded-lg border border-mela-green/15 bg-white px-3.5 py-2 text-sm font-bold text-mela-green-dark hover:bg-mela-cream">Download</a>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            <section className="rounded-2xl border border-mela-gold/20 bg-white p-5 sm:p-6">
              <h3 className="font-display text-xl text-mela-green-dark">Review decision</h3>
              <div className="mt-5 grid gap-5">
                <label>
                  <span className="block text-sm font-bold text-mela-green-dark mb-2">Status</span>
                  <select value={status} onChange={(event) => setStatus(event.target.value)} className="w-full rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-mela-dark">
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
                    placeholder="Add review notes, follow-up details or payment information…"
                    className="w-full resize-y rounded-xl border border-mela-green/15 bg-mela-cream/25 px-4 py-3 text-mela-dark"
                  />
                </label>
              </div>
              {error && <p role="alert" className="mt-4 text-sm font-semibold text-rose-700">{error}</p>}
              <div className="mt-5 flex items-center gap-4">
                <button type="button" onClick={handleSave} disabled={saving} className="rounded-xl bg-mela-red px-5 py-3 font-bold text-white shadow-md hover:bg-mela-red-light disabled:opacity-55">
                  {saving ? 'Saving…' : 'Save changes'}
                </button>
                {saveMessage && <span className="text-sm font-bold text-emerald-700">{saveMessage}</span>}
              </div>
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
  }), [applications])

  const openApplication = (id) => setSearchParams({ application: id })
  const closeApplication = useCallback(() => setSearchParams({}), [setSearchParams])

  const handleSaved = (application) => {
    setSelected(application)
    setApplications((current) => current.map((item) => (
      item.id === application.id
        ? { ...item, status: application.status, updatedAt: application.updatedAt }
        : item
    )))
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
          <button type="button" onClick={loadApplications} disabled={loading} className="self-start rounded-xl bg-mela-green px-4 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-mela-green-light disabled:opacity-55 sm:self-auto">
            {loading ? 'Refreshing…' : 'Refresh applications'}
          </button>
        </div>

        <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
          <MetricCard label="Total applications" value={counts.total} accent="bg-mela-green" />
          <MetricCard label="New" value={counts.new} accent="bg-blue-500" />
          <MetricCard label="Reviewing" value={counts.reviewing} accent="bg-amber-500" />
          <MetricCard label="Approved" value={counts.approved} accent="bg-emerald-500" />
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
                          {application.emailDelivery?.lastError && <p className="mt-1 text-xs font-bold text-amber-700">Email delivery issue</p>}
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
                        {application.emailDelivery?.lastError && <p className="mt-1 text-xs font-bold text-amber-700">Email delivery issue</p>}
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
        />
      )}
    </main>
  )
}
