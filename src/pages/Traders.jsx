import { useMemo, useState } from 'react'
import PageHero from '../components/PageHero'
import SectionTitle from '../components/SectionTitle'

const stallOptions = [
  {
    value: 'artisan',
    label: 'Artisan Stall – £250',
    fee: 250,
    description: 'Arts, crafts, clothing, jewellery, henna, gifts and other non-food goods.',
  },
  {
    value: 'cold-food',
    label: 'Cold Food Stall – £350',
    fee: 350,
    description: 'Pre-packed food / no on-site cooking.',
  },
  {
    value: 'hot-food',
    label: 'Hot Food Stall – £450',
    fee: 450,
    description: 'On-site cooking.',
  },
]

const acceptedFileTypes = '.pdf,.doc,.docx,.jpg,.jpeg,.png'
const depositFee = 100

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
  'Stall holders must meet all trading, health and safety criteria. Where these are not adequately met, the organisers reserve the right to prohibit trading without refund of fees.',
  'Electricity is not included as standard with stall bookings. Vendors must declare their electricity requirements on the application form. Any electrical supply, generator, cabling or appliance must be approved by the organisers in advance and must be safe, suitable for outdoor use, PAT tested where applicable, and covered by the vendor’s risk assessment and insurance. No unauthorised generators or trailing cables will be permitted.',
  'The organisers may refuse, disconnect or close any stall using any electrical supply, generator, cabling or appliance that has not been declared and approved in advance, or that is found to be unsafe or unsuitable for outdoor use.',
  'The following items must not, under any circumstances, be exhibited or offered for sale: Replica or toy guns, and any toy that looks like or is likely to be used as a weapon or to cause injury; Any knife with a blade, or other bladed article; Offensive, obscene or otherwise inappropriate materials; Raffles, other than any official event raffle; “Roving sales” or trading from any site other than the pitch allocated by the organisers.',
  'Stall holders must not bring any flammable, explosive, toxic or oil-based substances — including gas bottles or generators — without the prior written consent of the organisers. Failure to comply may result in ejection from the site and recovery of any remedial costs.',
  'Stall holders must return all equipment provided in the same condition in which it was issued. Any damage will be assessed by the organisers, and the cost of repair will be charged to the stall holder and payable on demand; in such cases the deposit will be forfeited. Any damage to the marquee including but not limited to staining, burns, or residue from food preparation, cooking or smoke will also result in the full deposit being withheld. Deposits will be returned within two weeks of the event, subject to confirmation from the marquee provider that no damage has occurred, and no additional cleaning is required.',
  'Stall holders must leave their pitch and the surrounding area clean, with no litter or rubbish whatsoever. Designated areas for rubbish will be provided. Failure to do so will result in the deposit being forfeited to cover the additional cost of cleaning.',
  'Where electrical power is supplied (the “Electrical Supply”), the organisers will meet their statutory obligations for safe supply.',
  'Any electrical goods provided by the stall holder must be PAT tested and able to demonstrate valid PAT test certification.',
  'The organisers shall not be liable for any loss of, or damage to, any exhibits or any property belonging to any stall holder, however arising.',
  'The organisers’ liability arising from the cancellation of the event, the failure or inability to provide a pitch, or the subsequent cancellation of an application for a pitch, shall be limited to the amount of the stall fee paid.',
  'The organisers reserve the right at all times to access any stall for the purpose of carrying out a safety inspection, in order to satisfy themselves that applicable laws and statutory requirements are being observed.',
  'Any special requirements should be submitted in writing and sent with your application form.',
  'Stalls will be allocated once your application has been approved and full payment of the stall booking fee has been received. Payment must be made in full within 72 hours of the invoice being sent.',
  'Stall holders must trade only from the pitch allocated to them. Trading from car parks, walkways, entrances or any other unallocated area is not permitted. Anyone found trading outside their allocated pitch may be asked to cease trading and leave the event, with no refund given.',
  'Vehicles in the car park must follow the directions of the event marshals and observe the car park speed limit at all times. The organisers accept no responsibility for vehicles or their contents.',
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
  contactMobile: '',
  contactEmail: '',
  itemsToBeSold: '',
  electricalRequirements: '',
  stallType: '',
  termsAgreement: false,
  declarationTerms: false,
  declarationSafety: false,
  applicantFullName: '',
  applicantRole: '',
  digitalSignature: '',
}

const initialFiles = {
  insuranceFile: null,
  foodHygieneFile: null,
  localAuthorityFile: null,
  hygieneRatingFile: null,
  supportingFiles: [],
}

export default function Traders() {
  const [formData, setFormData] = useState(initialForm)
  const [files, setFiles] = useState(initialFiles)
  const [showTerms, setShowTerms] = useState(false)
  const [hasOpenedTerms, setHasOpenedTerms] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitMessage, setSubmitMessage] = useState('')
  const [submitError, setSubmitError] = useState('')

  const isFoodStall = formData.stallType === 'cold-food' || formData.stallType === 'hot-food'
  const selectedStall = stallOptions.find((option) => option.value === formData.stallType)
  const totalPayable = selectedStall ? selectedStall.fee + depositFee : depositFee

  const validationErrors = useMemo(() => {
    const errors = []

    Object.entries({
      businessName: 'Business / Trading Name',
      businessAddress: 'Registered Business Address',
      localAuthority: 'Local authority registration',
      businessContactNumber: 'Business Contact Number',
      businessEmail: 'Business Email Address',
      contactName: 'Contact Name',
      contactMobile: 'Contact Mobile Number',
      contactEmail: 'Contact Email Address',
      itemsToBeSold: 'Items to be sold',
      electricalRequirements: 'Electrical requirements',
      stallType: 'Stall type',
      applicantFullName: 'Applicant Full Name',
      applicantRole: 'Position / Role',
      digitalSignature: 'Digital Signature / Typed Name',
    }).forEach(([key, label]) => {
      if (!String(formData[key]).trim()) errors.push(label)
    })

    if (!files.insuranceFile) errors.push('Copy of Public & Employer Liability Insurance')
    if (!formData.termsAgreement) errors.push('Terms & Conditions agreement')
    if (!formData.declarationTerms) errors.push('Declaration: terms understood')
    if (!formData.declarationSafety) errors.push('Declaration: safety responsibilities')

    if (isFoodStall) {
      if (!files.foodHygieneFile) errors.push('Food Hygiene Certificate')
      if (!files.localAuthorityFile) errors.push('Local authority food business registration')
      if (!files.hygieneRatingFile) errors.push('Food hygiene rating evidence')
    }

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
    const { name, files: pickedFiles, multiple } = event.target
    setFiles((current) => ({
      ...current,
      [name]: multiple ? Array.from(pickedFiles || []) : (pickedFiles?.[0] ?? null),
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    setSubmitMessage('')
    setSubmitError('')

    if (validationErrors.length > 0) {
      setSubmitError('Please complete all required fields, uploads and confirmations before submitting.')
      return
    }

    const payload = new FormData()
    payload.append('formData', JSON.stringify({
        ...formData,
        totalPayable,
        stallTypeLabel: selectedStall?.label ?? '',
        submittedAt: new Date().toISOString(),
    }))

    payload.append('insuranceFile', files.insuranceFile)
    if (files.foodHygieneFile) payload.append('foodHygieneFile', files.foodHygieneFile)
    if (files.localAuthorityFile) payload.append('localAuthorityFile', files.localAuthorityFile)
    if (files.hygieneRatingFile) payload.append('hygieneRatingFile', files.hygieneRatingFile)
    files.supportingFiles.forEach((file) => payload.append('supportingFiles', file))

    setIsSubmitting(true)

    try {
      const response = await fetch('/api/stall-application', {
        method: 'POST',
        body: payload,
      })

      const result = await response.json()
      if (!response.ok) throw new Error(result.error || 'Unable to submit application at this time.')

      setSubmitMessage('Thank you for submitting your stall application for Walsall’s First Ever Bangla Community Day 2026. Your application has been received and will be reviewed by the organisers. If your application is approved, you will be invoiced with full payment details.')
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
        landmark="mosque"
        subtitle="Stalls / Traders"
        title="Stall Trader Application Form"
        description="Please complete the form below to apply for a stall at Walsall’s First Ever Bangla Community Day 2026."
      />

      <section className="py-16 md:py-20 lg:py-24 bg-mela-warm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl bg-white border border-mela-gold/15 shadow-sm overflow-hidden">
            <div className="bg-mela-green-dark text-white p-6 md:p-8 lg:p-10">
              <p className="font-sub text-mela-gold text-xl mb-3">Walsall’s First Ever Bangla Community Day 2026</p>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4 text-white/85 leading-relaxed">
                <p><strong>Sunday 30 August 2026</strong></p>
                <p><strong>12:00pm – 6:00pm</strong></p>
                <p>
                  <strong>
                    Walsall Rugby Club, Delves Road,<br />
                    Walsall WS1 3JY
                  </strong>
                </p>
                <p><strong>FREE community event — open to all</strong></p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8 lg:p-10 space-y-10">
              <FormSection title="Section 1: Business Details">
                <FormGrid>
                  <TextField label="Business / Trading Name *" name="businessName" value={formData.businessName} onChange={handleChange} required />
                  <TextField label="Registered Business Address *" name="businessAddress" value={formData.businessAddress} onChange={handleChange} required />
                  <TextField label="Name of local authority the food business is registered with *" name="localAuthority" value={formData.localAuthority} onChange={handleChange} helper="If you are not a food business, please enter N/A." required />
                  <TextField label="Business Contact Number *" name="businessContactNumber" value={formData.businessContactNumber} onChange={handleChange} required />
                  <TextField label="Business Email Address *" name="businessEmail" type="email" value={formData.businessEmail} onChange={handleChange} required />
                </FormGrid>
              </FormSection>

              <FormSection title="Section 2: Main Contact Details">
                <FormGrid>
                  <TextField label="Contact Name *" name="contactName" value={formData.contactName} onChange={handleChange} required />
                  <TextField label="Contact Mobile Number *" name="contactMobile" value={formData.contactMobile} onChange={handleChange} required />
                  <TextField label="Contact Email Address *" name="contactEmail" type="email" value={formData.contactEmail} onChange={handleChange} required />
                </FormGrid>
              </FormSection>

              <FormSection
                title="Section 3: Stall Information"
                intro="Please list all items / goods to be sold on your stall, and all electrical items you intend to use. Please refer to clauses 13 and 14 of the Terms & Conditions for Traders. You cannot book a non-food stall and then sell food items, and you cannot sell non-food items on a food stall. Please see the Terms & Conditions."
              >
                <div className="grid gap-6">
                  <TextAreaField label="Items to be sold *" name="itemsToBeSold" value={formData.itemsToBeSold} onChange={handleChange} helper="Please list all items / goods to be sold on your stall" required />
                  <TextAreaField
                    label="Electrical requirements *"
                    name="electricalRequirements"
                    value={formData.electricalRequirements}
                    onChange={handleChange}
                    helper="Electricity is not included as standard. List all electrical items, generators and power needs here for organiser approval (see clause 14). If you do not require electricity, please write “None”."
                    required
                  />
                </div>
              </FormSection>

              <FormSection title="Section 4: Stall Type" intro="All stalls are a 3m × 3m mini marquee (gazebo). One table and two chairs are provided per stall.">
                <fieldset className="space-y-4">
                  <legend className="text-sm font-semibold text-mela-green-dark mb-4">Please select your stall type *</legend>
                  {stallOptions.map((option) => (
                    <label key={option.value} className={`block rounded-2xl border p-5 transition-colors cursor-pointer ${formData.stallType === option.value ? 'border-mela-gold bg-mela-gold/5' : 'border-mela-gold/15 bg-white'}`}>
                      <div className="flex items-start gap-4">
                        <input type="radio" name="stallType" value={option.value} checked={formData.stallType === option.value} onChange={handleChange} required className="mt-1 accent-[#014437]" />
                        <div>
                          <p className="font-display text-2xl text-mela-green-dark leading-tight">{option.label}</p>
                          <p className="text-mela-dark/70 mt-2 leading-relaxed">{option.description}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </fieldset>
                <div className="rounded-2xl border border-mela-red/30 bg-mela-red/5 p-5">
                  <div className="flex items-start gap-4">
                    <input type="checkbox" checked readOnly className="mt-1 h-4 w-4 accent-[#9f1d20]" />
                    <div>
                      <p className="font-display text-2xl text-mela-red leading-tight">Cleaning / Damage Deposit – £100</p>
                      <p className="text-mela-dark/70 mt-2 leading-relaxed">Payable by all stalls and refundable subject to the Terms & Conditions. This mandatory deposit is automatically included in the total amount payable.</p>
                    </div>
                  </div>
                </div>
                <div className="rounded-2xl border border-mela-gold/15 bg-white p-5 shadow-sm">
                  <p className="font-display text-2xl text-mela-green-dark leading-tight">Total Amount Payable</p>
                  <p className="text-mela-dark/70 mt-2 leading-relaxed">Stall fee + £100 deposit</p>
                  <p className="font-display text-3xl text-mela-red mt-4 leading-none">
                    {selectedStall ? `£${totalPayable}` : 'Select a stall type'}
                  </p>
                  <p className="mt-4 font-semibold text-mela-green-dark leading-relaxed">FULL PAYMENT MUST BE MADE ONCE YOUR APPLICATION HAS BEEN APPROVED</p>
                </div>
              </FormSection>

              <FormSection title="Section 5: Required File Uploads" intro="Please upload any documents required for your stall application. All stall holders must upload Public & Employer Liability Insurance. Food stalls must also upload food safety documents.">
                <div className="grid gap-6 md:grid-cols-2">
                  <FileField label="Copy of Public & Employer Liability Insurance *" name="insuranceFile" onChange={handleFileChange} required accept={acceptedFileTypes} helper="Mandatory for all stall holders." />
                  <FileField label={`Food Hygiene Certificate${isFoodStall ? ' *' : ''}`} name="foodHygieneFile" onChange={handleFileChange} required={isFoodStall} accept={acceptedFileTypes} helper="Required for food stalls only." />
                  <FileField label={`Registration with the appropriate local authority as a food business${isFoodStall ? ' *' : ''}`} name="localAuthorityFile" onChange={handleFileChange} required={isFoodStall} accept={acceptedFileTypes} helper="Required for food stalls only." />
                  <FileField label={`Evidence of a food hygiene rating of no less than 4${isFoodStall ? ' *' : ''}`} name="hygieneRatingFile" onChange={handleFileChange} required={isFoodStall} accept={acceptedFileTypes} helper="Required for food stalls only." />
                  <div className="md:col-span-2">
                    <FileField label="Additional supporting documents" name="supportingFiles" onChange={handleFileChange} accept={acceptedFileTypes} helper="Optional upload field." multiple />
                  </div>
                </div>
              </FormSection>

              <FormSection title="Section 6: Terms & Conditions for Traders">
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
                        <p key={index}><strong>{index + 1}.</strong> <ClauseText index={index} clause={clause} /></p>
                      ))}
                      <div className="pt-4 border-t border-mela-gold/15">
                        <CheckboxField label="I confirm that I have read and understood the Terms & Conditions for Traders and agree to abide by them. *" name="termsAgreement" checked={formData.termsAgreement} onChange={handleChange} required />
                      </div>
                    </div>
                  )}
                </div>
                {!hasOpenedTerms && (
                  <p className="text-sm font-medium text-mela-red">Please open the Terms & Conditions for Traders and tick the confirmation box at the bottom of the expanded section.</p>
                )}
              </FormSection>

              <FormSection title="Section 7: Declaration">
                <div className="rounded-2xl bg-mela-cream/50 border border-mela-gold/15 p-5 md:p-6 space-y-4 text-mela-dark/80 leading-relaxed">
                  <p className="font-semibold text-mela-green-dark">DECLARATION</p>
                  <p>I declare that, to the best of my / our knowledge, the information contained in this application form is correct.</p>
                  <p>I confirm that I have read and understood the Terms & Conditions for Traders set out in this application form and will abide by them. Failure to comply may result in the stall not being allowed to trade, and the stall fee will not be refunded.</p>
                  <p>I further confirm that I am responsible for the fire safety of my own stall and for meeting all food safety and local authority requirements that apply to my business at the event.</p>
                </div>
                <div className="grid gap-4 mt-5">
                  <CheckboxField label="I confirm that the information I have provided is correct and that I am responsible for the fire safety of my own stall and for meeting all relevant food safety, trading, insurance and local authority requirements. *" name="declarationSafety" checked={formData.declarationSafety} onChange={handleChange} required />
                </div>
              </FormSection>

              <FormSection title="Section 8: Applicant Confirmation">
                <FormGrid>
                  <TextField label="Applicant Full Name *" name="applicantFullName" value={formData.applicantFullName} onChange={handleChange} required />
                  <TextField label="Position / Role *" name="applicantRole" value={formData.applicantRole} onChange={handleChange} required />
                  <TextField label="Digital Signature / Typed Name *" name="digitalSignature" value={formData.digitalSignature} onChange={handleChange} required />
                </FormGrid>
              </FormSection>

              {submitError && <p className="rounded-2xl border border-mela-red/20 bg-mela-red/5 px-5 py-4 text-mela-red font-medium">{submitError}</p>}
              {submitMessage && <p className="rounded-2xl border border-mela-green/20 bg-mela-green/5 px-5 py-4 text-mela-green-dark font-medium">{submitMessage}</p>}

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

function TextField({ label, helper, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-mela-green-dark">{label}</span>
      {helper && <span className="block text-sm text-mela-dark/60 leading-relaxed">{helper}</span>}
      <input {...props} className="w-full rounded-xl border border-mela-gold/20 bg-white px-4 py-3.5 text-mela-dark outline-none focus:border-mela-gold focus:ring-2 focus:ring-mela-gold/20" />
    </label>
  )
}

function TextAreaField({ label, helper, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-mela-green-dark">{label}</span>
      {helper && <span className="block text-sm text-mela-dark/60 leading-relaxed">{helper}</span>}
      <textarea {...props} rows={5} className="w-full rounded-xl border border-mela-gold/20 bg-white px-4 py-3.5 text-mela-dark outline-none focus:border-mela-gold focus:ring-2 focus:ring-mela-gold/20 resize-y min-h-[140px]" />
    </label>
  )
}

function FileField({ label, helper, ...props }) {
  return (
    <label className="block space-y-2">
      <span className="text-sm font-semibold text-mela-green-dark">{label}</span>
      {helper && <span className="block text-sm text-mela-dark/60 leading-relaxed">{helper}</span>}
      <input {...props} type="file" className="w-full rounded-xl border border-dashed border-mela-gold/30 bg-mela-cream/30 px-4 py-3 text-sm text-mela-dark file:mr-4 file:rounded-lg file:border-0 file:bg-mela-green-dark file:px-4 file:py-2 file:text-white" />
    </label>
  )
}


function ClauseText({ index, clause }) {
  const boldPrefixes = {
    28: 'Halal & permitted items:',
    29: 'Allergen information:',
    30: 'Gas safety:',
    31: 'Waste oil & waste:',
    32: 'No smoking:',
    33: 'Conduct:',
    34: 'Indemnity:',
    35: 'Photography & media:',
    36: 'Data protection:',
    37: 'Cancellation & refunds:',
  }

  const prefix = boldPrefixes[index]
  if (!prefix || !clause.startsWith(prefix)) {
    const fullyBoldClauses = new Set([4, 8, 12, 13])
    if (fullyBoldClauses.has(index)) {
      return <strong>{clause}</strong>
    }

    const boldFragments = [
      '12:00pm',
      '12:00pm to 6:00pm',
      'ready for inspection by 11:30am',
      'PAT tested',
      'once your application has been approved',
      'within 72 hours of the invoice being sent',
      'joinus@shongoshomithi.co.uk',
      '12:00pm on Friday 14 August 2026',
      'public liability insurance',
      'food only.',
      'Deposits will be returned within two weeks of the event',
      'The £100 deposit is refundable as set out in clause 18.',
    ]

    let remaining = clause
    const parts = []

    while (remaining.length > 0) {
      const match = boldFragments
        .map((fragment) => ({ fragment, index: remaining.indexOf(fragment) }))
        .filter((item) => item.index >= 0)
        .sort((left, right) => left.index - right.index)[0]

      if (!match) {
        parts.push(remaining)
        break
      }

      if (match.index > 0) {
        parts.push(remaining.slice(0, match.index))
      }

      parts.push(<strong key={`${match.fragment}-${parts.length}`}>{match.fragment}</strong>)
      remaining = remaining.slice(match.index + match.fragment.length)
    }

    return <>{parts}</>
  }

  return (
    <>
      <strong>{prefix}</strong>
      {clause.slice(prefix.length)}
    </>
  )
}

function CheckboxField({ label, ...props }) {
  return (
    <label className="flex items-start gap-3 rounded-2xl border border-mela-gold/15 bg-mela-cream/20 p-4 has-[:disabled]:opacity-60 has-[:disabled]:cursor-not-allowed">
      <input {...props} type="checkbox" className="mt-1 h-4 w-4 accent-[#014437]" />
      <span className="text-mela-dark/80 leading-relaxed">{label}</span>
    </label>
  )
}
