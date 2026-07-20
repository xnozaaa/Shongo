import { useMemo, useRef, useState } from 'react'
import PageHero from '../components/PageHero'

const stallOptions = [
  {
    value: 'artisan',
    label: 'Artisan Stall – £200',
    fee: 200,
    description: 'Arts, crafts, clothing, jewellery, henna, gifts and other non-food goods.',
  },
  {
    value: 'cold-food',
    label: 'Cold Food Stall – £300',
    fee: 300,
    description: 'Pre-packed food / no on-site cooking.',
  },
  {
    value: 'hot-food',
    label: 'Hot Food Stall – £400',
    fee: 400,
    description: 'On-site cooking.',
  },
]

const acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
const depositFee = 100

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

const termsClauses = [
  'The allocation of trading stalls at Walsall’s First Bangla Community Day 2026 is at the sole discretion of the organisers, Shongo Shomithi, who reserve the right to allocate stalls as they see fit.',
  'The organisers reserve the right to refuse any application for a trading stall, and to cancel any such application or decline at any stage to admit a trader.',
  'The organisers reserve the right to change the layout and location of trading stalls without prior notice where necessary.',
  'The subletting of trading stalls is strictly prohibited.',
  'No vehicles are permitted onto the event space at any time, including for setting up or packing down. All cars and vehicles must be left in the designated car park. Traders must unload at the car park and carry their equipment and stock to their allocated pitch on foot.',
  'Traders should arrive in good time to unload at the car park and set up their stall ready for trading, which begins at 12:00pm. No vehicle access onto the event space will be permitted for set-up, re-stocking or breakdown at any point during the event.',
  'Trading takes place from 12:00pm to 6:00pm. You must ensure your stall is fully set up and ready for inspection by 11:30am.',
  'The organisers have the authority to close any stall run by a trader who, in the opinion of the organisers, has infringed any regulation connected to the event or has been guilty of unfair, dishonest or unseemly conduct.',
  'Stall holders may only deal in the products detailed in their application form on the day of the event. You cannot book a non-food stall and then sell food items; likewise, you cannot sell non-food items on a food stall.',
  'The organisers will provide each stall with a 3m × 3m mini marquee (gazebo), one table and two chairs.',
  'All traders must provide the organisers with a copy of their public liability insurance with the stall application. In addition, food stalls must provide with the application copies of: Food Hygiene Certificate; Registration with the appropriate local authority as a food business; Evidence that the business holds a food hygiene rating of no less than 4.',
  'Food stalls are responsible for the fire safety of their own stall, equipment and cooking activities, and must take all reasonable precautions to prevent fire.',
  '**Stall holders must meet all trading, health and safety criteria.** Where these are not adequately met, the organisers reserve the right to prohibit trading without refund of fees.',
  'Food stalls will be provided with electricity through a shared generator. Each food stall may connect **only 2 electrical items** to the power supply. If your stall requires additional power, you must inform the organisers at least 7 days before the event so that appropriate arrangements can be made. A charge for additional power will be determined at the time of the request.',
  'The organisers may refuse, disconnect or close any stall using any electrical supply, generator, cabling or appliance that has not been declared and approved in advance, or that is found to be unsafe or unsuitable for outdoor use.',
  'The following items must not, under any circumstances, be exhibited or offered for sale: Replica or toy guns, and any toy that looks like or is likely to be used as a weapon or to cause injury; Any knife with a blade, or other bladed article; Offensive, obscene or otherwise inappropriate materials; Raffles, other than any official event raffle; “Roving sales” or trading from any site other than the pitch allocated by the organisers.',
  'Stall holders must not bring any flammable, explosive, toxic or oil-based substances — including gas bottles or generators — without the prior written consent of the organisers. Failure to comply may result in ejection from the site and recovery of any remedial costs.',
  'Stall holders must return all equipment provided in the same condition in which it was issued. Any damage will be assessed by the organisers, and the cost of repair will be charged to the stall holder and payable on demand; in such cases the deposit will be forfeited. Any damage to the marquee including but not limited to staining, burns, or residue from food preparation, cooking or smoke will also result in the full deposit being withheld. Deposits will be returned within two weeks of the event, subject to confirmation from the marquee provider that no damage has occurred, and no additional cleaning is required.',
  'Stall holders must leave their pitch and the surrounding area clean, with no litter or rubbish whatsoever. Designated areas for rubbish will be provided. Failure to do so will result in the deposit being forfeited to cover the additional cost of cleaning.',
  'Where electrical power is supplied (the “Electrical Supply”), the organisers will meet their statutory obligations for safe supply.',
  'Any electrical goods provided by the stall holder must be PAT tested and able to demonstrate valid PAT test certification.',
  'The organisers shall not be liable for any loss of, or damage to, any exhibits or any property belonging to any stall holder, their servants, agents or contractors.',
  'The organisers accept no responsibility for personal injury sustained by any stall holder, their staff or members of the public arising from the trader’s business or equipment.',
  'No nails, pins, staples, tape or fixings may be used on any marquee supplied by the organisers unless expressly authorised.',
  'Any trader using amplified sound, loud music or any activity deemed disruptive may be required to stop immediately.',
  'All food traders must comply with current food hygiene legislation and any instructions given by Environmental Health officers or the organisers.',
  'Stall holders are responsible for ensuring that all prices, descriptions and claims relating to their products are accurate and lawful.',
  'Halal & permitted items: This is a family-friendly community event. All food stalls must serve halal food only. No alcohol, pork or pork-derived products may be sold, prepared, served or consumed anywhere on site.',
  'Allergen information: Food stalls must comply with all UK food information and allergen regulations (including “Natasha’s Law”) and must clearly display allergen information for every item offered for sale.',
  'Gas safety: Any LPG or gas appliances must be in safe working order and used in accordance with the manufacturer’s instructions. Stalls cooking on site must carry an appropriate fire extinguisher and/or fire blanket suitable for the cooking method used.',
  'Waste oil & waste: Hot food stalls must remove all of their own waste cooking oil from site. Cooking oil, fats or food waste must never be poured onto the ground, into drains, or into general waste bins.',
  'No smoking: Smoking and vaping are not permitted within any marquee, stall or food-preparation area.',
  'Conduct: All traders and their staff must behave courteously and respectfully towards visitors, other traders, volunteers and organisers throughout the event. The organisers may remove from site anyone behaving inappropriately, without refund.',
  'Indemnity: The stall holder agrees to indemnify the organisers against any claim, loss, damage or liability arising out of the stall holder’s operation, products, equipment or conduct at the event.',
  'Photography & media: The event will be photographed and filmed for promotional and archival purposes. By trading at the event, traders consent to their stall and staff appearing in such material.',
  'Data protection: Personal information provided on this form will be used by Shongo Shomithi solely for the administration of this event and will be held and processed in accordance with UK GDPR.',
  'Cancellation & refunds: If you wish to cancel your stall, you must do so in writing by email to joinus@shongoshomithi.co.uk, to reach the organisers by 12:00pm on Friday 14 August 2026, in which case you will receive a 50% refund of the stall fee. Cancellation received after this time, or non-attendance on 30 August 2026, will incur the full charge and no refund will be given. The £100 deposit is refundable as set out in clause 18.',
]

const initialForm = {
  businessName: '',
  businessAddress: '',
  localAuthority: '',
  businessContactNumber: '',
  businessEmail: '',
  contactName: '',
  contactAddress: '',
  contactNumber: '',
  contactEmail: '',
  itemsToBeSold: '',
  electricalRequirements: '',
  stallType: '',
  termsAgreement: false,
  declarationSafety: false,
  applicantFullName: '',
  digitalSignature: '',
}

const initialFiles = {
  insuranceFile: null,
  foodHygieneFile: null,
  localAuthorityFile: null,
  hygieneRatingFile: null,
}

export default function Traders() {
  const [formData, setFormData] = useState(initialForm)
  const [files, setFiles] = useState(initialFiles)
  const [showTerms, setShowTerms] = useState(false)
  const [hasOpenedTerms, setHasOpenedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')
  const insuranceRef = useRef(null)
  const foodHygieneRef = useRef(null)
  const localAuthorityRef = useRef(null)
  const hygieneRatingRef = useRef(null)

  const isFoodStall = formData.stallType === 'cold-food' || formData.stallType === 'hot-food'
  const selectedStall = stallOptions.find((option) => option.value === formData.stallType)
  const totalPayable = selectedStall ? selectedStall.fee + depositFee : depositFee

  const validationErrors = useMemo(() => {
    const errors = []

    Object.entries({
      businessName: 'Business / Trading Name',
      businessAddress: 'Registered Business Address',
      businessContactNumber: 'Business Contact Number',
      businessEmail: 'Business Email Address',
      contactName: 'Contact Name',
      itemsToBeSold: 'Items to be sold',
      electricalRequirements: 'Electrical requirements',
      stallType: 'Stall type',
      applicantFullName: 'Name',
      digitalSignature: 'Signature / Digital Verification Name',
    }).forEach(([key, label]) => {
      if (!String(formData[key]).trim()) errors.push(label)
    })

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (formData.businessEmail && !emailPattern.test(formData.businessEmail.trim())) errors.push('Valid business email address')
    if (formData.contactEmail && !emailPattern.test(formData.contactEmail.trim())) errors.push('Valid contact email address')

    if (!files.insuranceFile) errors.push('Copy of Public & Employer Liability Insurance')
    if (!formData.termsAgreement) errors.push('Terms & Conditions agreement')
    if (!formData.declarationSafety) errors.push('Declaration: safety responsibilities')

    if (isFoodStall) {
      if (!files.foodHygieneFile) errors.push('Food Hygiene Certificate')
      if (!files.localAuthorityFile) errors.push('Local authority food business registration')
      if (!files.hygieneRatingFile) errors.push('Food hygiene rating evidence')
    }

    const selectedFiles = Object.values(files).filter(Boolean)
    if (selectedFiles.some((file) => file.size > 5 * 1024 * 1024)) errors.push('Each uploaded file must be 5MB or less')
    if (selectedFiles.reduce((total, file) => total + file.size, 0) > 20 * 1024 * 1024) errors.push('Total uploaded files must not exceed 20MB')

    return errors
  }, [files, formData, isFoodStall])

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target
    setFormData((current) => ({
      ...current,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleFileChange = (event) => {
    const { name, files: pickedFiles } = event.target
    setFiles((current) => ({
      ...current,
      [name]: pickedFiles?.[0] ?? null,
    }))
  }

  const clearFile = (name, ref) => {
    setFiles((current) => ({ ...current, [name]: null }))
    if (ref?.current) ref.current.value = ''
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')
    setSubmitError('')

    if (validationErrors.length > 0) {
      setSubmitError('Please complete all required fields, uploads and confirmations before submitting.')
      return
    }

    setIsSubmitting(true)

    try {
      const { upload } = await import('@vercel/blob/client')
      const submissionId = crypto.randomUUID()
      const selectedFiles = Object.entries(files).filter(([, file]) => file)
      const uploadedDocuments = await Promise.all(selectedFiles.map(async ([field, file]) => {
        const contentType = uploadContentType(file.name)
        if (!contentType) throw new Error(`${file.name} is not an accepted file type.`)

        const pathname = `applications/files/${submissionId}/${field}-${safeUploadFilename(file.name)}`
        const blob = await upload(pathname, file, {
          access: 'private',
          handleUploadUrl: '/api/stall-upload',
          contentType,
          multipart: false,
          clientPayload: JSON.stringify({ submissionId, field, filename: file.name }),
        })

        return { field, filename: file.name, pathname: blob.pathname }
      }))

      const response = await fetch('/api/stall-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          submissionId,
          uploads: uploadedDocuments,
          formData: {
            ...formData,
            totalPayable,
            stallTypeLabel: selectedStall?.label ?? '',
          },
        }),
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit application at this time.')

      setSubmitMessage('Thank you for submitting your stall application for Walsall’s First Ever Bangla Community Day 2026. Your application has been received successfully and will now be reviewed by the organising team.')
      setFormData(initialForm)
      setFiles(initialFiles)
      setShowTerms(false)
      setHasOpenedTerms(false)
      event.target.reset()
    } catch (error) {
      setSubmitError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <PageHero
        landmark="traders"
        subtitle="Stall Applications"
        title="Stall Applications"
        description="Please complete the form below to apply for a stall at Walsall’s First Ever Bangla Community Day 2026."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-mela-gold/15 shadow-sm overflow-hidden">
            <div className="bg-mela-green-dark text-white p-6 md:p-8 lg:p-10">
              <p className="font-sub text-mela-gold text-xl mb-4 text-center md:text-left">Walsall’s First Ever Bangla Community Day 2026</p>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 text-white/85 leading-relaxed text-center md:text-left">
                <p><strong>Sunday 30 August 2026</strong></p>
                <p><strong>12:00pm – 6:00pm</strong></p>
                <p><strong>Walsall Rugby Club, Delves Road, Walsall WS1 3JY</strong></p>
                <p><strong>FREE community event — open to all</strong></p>
              </div>
            </div>

            <form noValidate onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10 space-y-10">
              <FormSection title="Section 1: Business / Trading Details">
                <FormGrid>
                  <TextField label="Business/Trading Name *" name="businessName" value={formData.businessName} onChange={handleChange} required />
                  <TextField label="Contact Name *" name="contactName" value={formData.contactName} onChange={handleChange} required />
                  <TextField label="Registered Business Address *" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
                  <TextField label="Local Authority your food business is registered with" name="localAuthority" value={formData.localAuthority} onChange={handleChange} />
                  <TextField label="Contact Number *" name="businessContactNumber" value={formData.businessContactNumber} onChange={handleChange} required />
                  <TextField label="Business Email Address *" name="businessEmail" type="text" inputMode="email" autoComplete="email" value={formData.businessEmail} onChange={handleChange} required />
                </FormGrid>
              </FormSection>

              <FormSection title="Section 2: Products and Requirements">
                <FormGrid>
                  <TextAreaField label="Items to be sold *" name="itemsToBeSold" value={formData.itemsToBeSold} onChange={handleChange} helper="Please provide a full list all items / goods to be sold on your stall (please see clause 13)." />
                  <TextAreaField label="Electrical requirements *" name="electricalRequirements" value={formData.electricalRequirements} onChange={handleChange} helper="Please list all your electrical equipment to be connected through the shared generator. (please see clause 14)" />
                </FormGrid>
              </FormSection>

              <FormSection title="Section 3: Stall Selection">
                <p className="text-mela-red font-semibold leading-relaxed">All trader stalls will be provided as standard with a 3m × 3m mini marquee (gazebo), one table and two chairs.</p>
                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-mela-green-dark mb-4">Please select your stall type <span className="ml-1 text-mela-red text-2xl font-black leading-none align-middle">*</span></legend>
                  <div className="grid gap-4 md:grid-cols-3">
                    {stallOptions.map((option) => (
                      <label key={option.value} className={`rounded-2xl border p-5 transition cursor-pointer ${formData.stallType === option.value ? 'border-mela-red bg-mela-red/5 shadow-sm' : 'border-mela-gold/15 bg-white'}`}>
                        <input type="radio" name="stallType" value={option.value} checked={formData.stallType === option.value} onChange={handleChange} className="sr-only" />
                        <p className="font-display text-2xl text-mela-green-dark">{option.label}</p>
                        <p className="mt-3 text-mela-dark/70 leading-relaxed">{option.description}</p>
                      </label>
                    ))}
                  </div>
                </fieldset>
                <div className="rounded-2xl border border-mela-gold/15 bg-mela-cream/40 p-5 text-mela-dark/80 leading-relaxed">
                  <p><strong>Refundable deposit:</strong> £{depositFee}</p>
                  <p className="mt-2"><strong>Total payable:</strong> £{totalPayable}</p>
                </div>
              </FormSection>

              <FormSection title="Section 4: Required Documents">
                <div className="grid gap-6 md:grid-cols-2">
                  <FileField inputRef={insuranceRef} label="Copy of Public & Employer Liability Insurance *" name="insuranceFile" onChange={handleFileChange} required accept={acceptedFileTypes} helper="Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG." file={files.insuranceFile} onClear={() => clearFile('insuranceFile', insuranceRef)} />
                  <FileField inputRef={foodHygieneRef} label={`Food Hygiene Certificate${isFoodStall ? ' *' : ''}`} name="foodHygieneFile" onChange={handleFileChange} required={isFoodStall} accept={acceptedFileTypes} helper="Required for food stalls only." file={files.foodHygieneFile} onClear={() => clearFile('foodHygieneFile', foodHygieneRef)} />
                  <FileField inputRef={localAuthorityRef} label={`Registration with the appropriate local authority as a food business${isFoodStall ? ' *' : ''}`} name="localAuthorityFile" onChange={handleFileChange} required={isFoodStall} accept={acceptedFileTypes} helper="Required for food stalls only." file={files.localAuthorityFile} onClear={() => clearFile('localAuthorityFile', localAuthorityRef)} />
                  <FileField inputRef={hygieneRatingRef} label={`Evidence of a food hygiene rating of no less than 4${isFoodStall ? ' *' : ''}`} name="hygieneRatingFile" onChange={handleFileChange} required={isFoodStall} accept={acceptedFileTypes} helper="Required for food stalls only." file={files.hygieneRatingFile} onClear={() => clearFile('hygieneRatingFile', hygieneRatingRef)} />
                </div>
              </FormSection>

              <FormSection title="Section 5: Terms & Conditions for Traders">
                <p className="text-sm font-medium text-mela-red">Please open the Terms & Conditions for Traders and tick the confirmation box at the bottom once you have read and agreed to them.</p>
                <div className="rounded-2xl border border-mela-gold/15 overflow-hidden">
                  <button type="button" onClick={() => {
                    setShowTerms((current) => {
                      const next = !current
                      if (next) setHasOpenedTerms(true)
                      return next
                    })
                  }} className="w-full px-5 py-4 bg-mela-cream/40 text-left flex items-center justify-between gap-4">
                    <span className="font-display text-2xl text-mela-green-dark">Terms & Conditions for Traders</span>
                    <span className="text-mela-green-dark text-xl">{showTerms ? '−' : '+'}</span>
                  </button>
                  {showTerms && (
                    <div className="p-5 md:p-6 bg-white text-mela-dark/80 space-y-3 leading-relaxed text-left">
                      <p><strong>By signing the declaration in this application form, the stall holder confirms they have read, understood and agree to be bound by the following Terms & Conditions.</strong></p>
                      {termsClauses.map((clause, index) => (
                        <p key={index}><strong>{index + 1}.</strong> <ClauseText clause={clause} /></p>
                      ))}
                      <div className="pt-4 border-t border-mela-gold/15">
                        <CheckboxField label="I confirm that I have read and understood the Terms & Conditions for Traders and agree to abide by them. *" name="termsAgreement" checked={formData.termsAgreement} onChange={handleChange} required />
                      </div>
                    </div>
                  )}
                </div>
                {!hasOpenedTerms && (
                  <p className="text-sm font-medium text-mela-red">Please open the Terms & Conditions for Traders to continue.</p>
                )}
              </FormSection>

              <FormSection title="Section 6: Trader Declaration">
                <div className="grid gap-4">
                  <CheckboxField
                    name="declarationSafety"
                    checked={formData.declarationSafety}
                    onChange={handleChange}
                    required
                    content={(
                      <div className="space-y-3">
                        <p><span className="font-semibold text-mela-green-dark">DECLARATION</span><span className="ml-1 text-mela-red text-2xl font-black leading-none align-middle">*</span></p>
                        <p>I/we declare that, to the best of my/our knowledge, the information provided in this application form is true and correct.</p>
                        <p>I/we confirm that I/we have read, understood and agree to comply with the Terms &amp; Conditions for Traders set out in this form. I/we understand that failure to comply with these terms may result in the stall not being permitted to trade, and that any stall fee paid may be non-refundable.</p>
                        <p>I/we further confirm that I/we are responsible for the fire safety of my/our own stall and for meeting all food safety, licensing and local authority requirements that apply to my/our business at the event.</p>
                      </div>
                    )}
                  />
                </div>
              </FormSection>

              <FormSection title="Section 7: Applicant Confirmation">
                <FormGrid>
                  <TextField label="Name *" name="applicantFullName" value={formData.applicantFullName} onChange={handleChange} required />
                  <TextField label="Signature / Digital Verification Name *" name="digitalSignature" value={formData.digitalSignature} onChange={handleChange} required />
                </FormGrid>
              </FormSection>

              {submitError && <p className="rounded-2xl border border-mela-red/20 bg-mela-red/5 px-5 py-4 text-mela-red font-medium">{submitError}</p>}
              {submitMessage && <p className="rounded-2xl border border-mela-green/20 bg-mela-green/5 px-5 py-4 text-mela-green-dark font-medium">{submitMessage}</p>}

              <div className="rounded-2xl border border-mela-gold/15 bg-mela-cream/30 px-5 py-4 text-mela-dark/80 space-y-2">
                <p className="font-semibold text-mela-green-dark">If you have any further queries, please contact the organisers:</p>
                <a href="tel:07817176637" className="block hover:text-mela-green-dark transition">Nazrul: 07817 176637</a>
                <a href="tel:07958600250" className="block hover:text-mela-green-dark transition">Shab: 07958 600250</a>
                <a href="mailto:joinus@shongoshomithi.co.uk" className="block hover:text-mela-green-dark transition">joinus@shongoshomithi.co.uk</a>
              </div>

              <button type="submit" disabled={isSubmitting || validationErrors.length > 0} className="w-full md:w-auto inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-mela-gold to-mela-gold-light text-mela-green-dark px-8 py-4 font-semibold shadow-md disabled:opacity-50 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting…' : 'Submit Stall Application'}
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function FormSection({ title, intro, children }) {
  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-display text-3xl text-mela-green-dark leading-tight">{title}</h2>
        {intro && <p className="mt-3 text-mela-dark/70 leading-relaxed text-pretty">{intro}</p>}
      </div>
      {children}
    </section>
  )
}

function FormGrid({ children }) {
  return <div className="grid gap-6 md:grid-cols-2">{children}</div>
}

function formatRequiredLabel(label) {
  if (!label.includes('*')) return label

  const withoutStar = label.replace(/\s*\*\s*$/, '')
  return (
    <>
      {withoutStar} <span className="ml-1 text-mela-red text-2xl font-black leading-none align-middle">*</span>
    </>
  )
}

function TextField({ label, helper, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-mela-green-dark">{formatRequiredLabel(label)}</span>
      {helper && <span className="block text-sm text-mela-dark/60 leading-relaxed">{helper}</span>}
      <input {...props} className="w-full rounded-xl border border-mela-gold/20 bg-white px-4 py-3.5 text-mela-dark outline-none focus:border-mela-gold focus:ring-2 focus:ring-mela-gold/20" />
    </label>
  )
}

function TextAreaField({ label, helper, ...props }) {
  return (
    <label className="flex h-full flex-col space-y-2">
      <span className="text-sm font-semibold text-mela-green-dark min-h-[1.25rem]">{formatRequiredLabel(label)}</span>
      <span className="block min-h-[3rem] text-sm text-mela-dark/60 leading-relaxed">{helper || ""}</span>
      <textarea {...props} rows={5} className="w-full flex-1 rounded-xl border border-mela-gold/20 bg-white px-4 py-3.5 text-mela-dark outline-none focus:border-mela-gold focus:ring-2 focus:ring-mela-gold/20 resize-y min-h-[180px]" />
    </label>
  )
}

function FileField({ label, helper, file, onClear, inputRef, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-mela-green-dark">{formatRequiredLabel(label)}</span>
      {helper && <span className="block text-sm text-mela-dark/60 leading-relaxed">{helper}</span>}
      <input ref={inputRef} {...props} type="file" className="w-full rounded-xl border border-dashed border-mela-gold/30 bg-mela-cream/30 px-4 py-3 text-sm text-mela-dark file:mr-4 file:rounded-lg file:border-0 file:bg-mela-green-dark file:px-4 file:py-2 file:text-white" />
      {file && (
        <div className="flex items-center justify-between gap-3 rounded-xl border border-mela-gold/15 bg-white px-4 py-3 text-sm">
          <span className="text-mela-dark/80 truncate">{file.name}</span>
          <button type="button" onClick={onClear} className="shrink-0 rounded-lg bg-mela-red/10 px-3 py-1.5 font-semibold text-mela-red hover:bg-mela-red/15">
            Remove
          </button>
        </div>
      )}
    </label>
  )
}

function ClauseText({ clause }) {
  const boldPrefixes = [
    'Halal & permitted items:',
    'Allergen information:',
    'Gas safety:',
    'Waste oil & waste:',
    'No smoking:',
    'Conduct:',
    'Indemnity:',
    'Photography & media:',
    'Data protection:',
    'Cancellation & refunds:',
  ]

  const parts = String(clause).split(/(\*\*.*?\*\*)/g)
  const prefix = boldPrefixes.find((item) => clause.startsWith(item))

  return parts.map((part, index) => {
    const isMarkdownBold = part.startsWith('**') && part.endsWith('**')
    const value = isMarkdownBold ? part.slice(2, -2) : part

    if (index === 0 && prefix && value.startsWith(prefix)) {
      return (
        <span key={index}>
          <strong>{prefix}</strong>
          {value.slice(prefix.length)}
        </span>
      )
    }

    if (isMarkdownBold) {
      return <strong key={index}>{value}</strong>
    }

    return <span key={index}>{value}</span>
  })
}

function CheckboxField({ label, content, ...props }) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-mela-gold/15 bg-mela-cream/20 p-4 has-[:disabled]:opacity-60 has-[:disabled]:cursor-not-allowed">
      <input {...props} type="checkbox" className="mt-1 h-4 w-4 accent-[#014437]" />
      <span className="text-mela-dark/80 leading-relaxed">{content || formatRequiredLabel(label)}</span>
    </label>
  )
}
