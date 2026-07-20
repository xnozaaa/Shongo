import {
  resendFromEnv,
  formToEmail,
  safeFromEmail,
  safeEmail,
  brandedFromEmail,
  stallConfirmationFooterAttachment,
  escapeHtml,
} from '../lib/email.js'
import {
  createApplicationFromUploads,
  loadApplicationAttachmentsForEmail,
  updateApplication,
} from '../lib/application-store.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  let applicationId

  try {
    const resend = resendFromEnv()
    if (!resend) {
      return res.status(500).json({ error: 'Email sending is not configured yet. Please set RESEND_API_KEY, FORM_TO_EMAIL and FORM_FROM_EMAIL.' })
    }

    const submittedData = req.body?.formData || {}
    const uploads = Array.isArray(req.body?.uploads) ? req.body.uploads : []
    const submissionId = String(req.body?.submissionId || '')
    const stallOptions = {
      artisan: { label: 'Artisan Stall – £200', fee: 200 },
      'cold-food': { label: 'Cold Food Stall – £300', fee: 300 },
      'hot-food': { label: 'Hot Food Stall – £400', fee: 400 },
    }
    const selectedStall = stallOptions[submittedData.stallType]
    const requiredValues = [
      submittedData.businessName,
      submittedData.businessAddress,
      submittedData.businessContactNumber,
      submittedData.businessEmail,
      submittedData.contactName,
      submittedData.itemsToBeSold,
      submittedData.electricalRequirements,
      submittedData.applicantFullName,
      submittedData.digitalSignature,
    ]

    if (!selectedStall || requiredValues.some((value) => !String(value || '').trim()) || !submittedData.termsAgreement || !submittedData.declarationSafety) {
      return res.status(400).json({ error: 'Please complete all required fields and confirmations.' })
    }
    if (!safeEmail(submittedData.businessEmail) || (submittedData.contactEmail && !safeEmail(submittedData.contactEmail))) {
      return res.status(400).json({ error: 'Please provide a valid email address.' })
    }

    const data = {
      ...submittedData,
      stallTypeLabel: selectedStall.label,
      totalPayable: selectedStall.fee + 100,
    }
    const isFoodStall = data.stallType === 'cold-food' || data.stallType === 'hot-food'

    const uploadedFields = new Set(uploads.map((upload) => upload.field))
    if (!uploadedFields.has('insuranceFile')) return res.status(400).json({ error: 'Public & Employer Liability Insurance is required.' })
    if (isFoodStall && (!uploadedFields.has('foodHygieneFile') || !uploadedFields.has('localAuthorityFile') || !uploadedFields.has('hygieneRatingFile'))) {
      return res.status(400).json({ error: 'Food stall applications must include all food safety documents.' })
    }

    const submittedAt = new Date()
    const submittedDate = submittedAt.toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' })
    const application = await createApplicationFromUploads({ data, uploads, submissionId, submittedAt })
    applicationId = application.id
    const uploadedFiles = await loadApplicationAttachmentsForEmail(application)
    const uploadedFileLines = application.attachments.map((attachment) => `- ${attachment.field}: ${attachment.filename}`)

    const forwardedHost = req.headers?.['x-forwarded-host']
    const host = String(forwardedHost || req.headers?.host || '').replace(/[^a-zA-Z0-9.:-]/g, '')
    const requestedProtocol = String(req.headers?.['x-forwarded-proto'] || (process.env.VERCEL ? 'https' : 'http'))
    const protocol = requestedProtocol === 'http' ? 'http' : 'https'
    const dashboardUrl = host ? `${protocol}://${host}/admin?application=${application.id}` : ''
    const htmlData = Object.fromEntries(Object.entries(data).map(([key, value]) => [key, escapeHtml(value)]))

    const adminText = [
      'New Stall Application – Walsall’s First Ever Bangla Community Day 2026',
      '',
      'Application summary',
      `- Business / Trading Name: ${data.businessName}`,
      `- Registered Business Address: ${data.businessAddress || 'Not provided'}`,
      `- Contact Name: ${data.contactName}`,
      `- Contact Email: ${data.contactEmail || data.businessEmail || 'Not provided'}`,
      `- Contact Mobile: ${data.contactNumber || data.businessContactNumber || 'Not provided'}`,
      `- Selected Stall Type: ${data.stallTypeLabel}`,
      `- Total amount payable: £${data.totalPayable}`,
      `- Declaration accepted: ${data.declarationSafety ? 'Yes' : 'No'}`,
      `- Date submitted: ${submittedDate}`,
      '',
      'Items to be sold:',
      `${data.itemsToBeSold}`,
      '',
      'Electrical requirements:',
      `${data.electricalRequirements}`,
      '',
      'Uploaded documents:',
      ...uploadedFileLines,
      ...(dashboardUrl ? ['', `Open in admin dashboard: ${dashboardUrl}`] : []),
    ].join('\n')

    const adminHtml = `
      <div style="font-family: Arial, sans-serif; background:#f7f4ee; padding:24px; color:#1a1a1a;">
        <div style="max-width:760px; margin:0 auto; background:#ffffff; border:1px solid rgba(201,168,76,0.22); border-radius:20px; overflow:hidden; box-shadow:0 12px 32px rgba(0,0,0,0.06);">
          <div style="background:linear-gradient(135deg,#9f1d20 0%,#bf2a2d 100%); padding:28px 32px; color:#ffffff;">
            <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:#f6d889; margin-bottom:8px;">New Stall Application</div>
            <h1 style="margin:0; font-size:30px; line-height:1.2;">Walsall’s First Ever Bangla Community Day 2026</h1>
            <p style="margin:14px 0 0; color:rgba(255,255,255,0.88); font-size:15px;">A new trader application has been submitted and supporting files are attached to this email.</p>
          </div>
          <div style="padding:28px 32px; font-size:16px; line-height:1.7;">
            <div style="margin-bottom:22px; padding:18px 20px; border-radius:16px; background:#faf7f1; border:1px solid rgba(201,168,76,0.16);">
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:10px;">Application Summary</div>
              <div><strong>Business / Trading Name:</strong> ${htmlData.businessName || 'Not provided'}</div>
              <div><strong>Registered Business Address:</strong> ${htmlData.businessAddress || 'Not provided'}</div>
              <div><strong>Contact Name:</strong> ${htmlData.contactName || 'Not provided'}</div>
              <div><strong>Contact Email:</strong> ${htmlData.contactEmail || htmlData.businessEmail || 'Not provided'}</div>
              <div><strong>Contact Mobile:</strong> ${htmlData.contactNumber || htmlData.businessContactNumber || 'Not provided'}</div>
              <div><strong>Selected Stall Type:</strong> ${htmlData.stallTypeLabel || 'Not provided'}</div>
              <div><strong>Total Amount Payable:</strong> £${htmlData.totalPayable || '0'}</div>
              <div><strong>Declaration Accepted:</strong> ${data.declarationSafety ? 'Yes' : 'No'}</div>
              <div><strong>Date Submitted:</strong> ${submittedDate}</div>
            </div>
            <div style="margin-bottom:20px;">
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:8px;">Items To Be Sold</div>
              <div style="padding:16px 18px; border-radius:14px; background:#fcfbf8; border:1px solid rgba(1,68,55,0.1); white-space:pre-line;">${htmlData.itemsToBeSold || 'Not provided'}</div>
            </div>
            <div style="margin-bottom:20px;">
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:8px;">Electrical Requirements</div>
              <div style="padding:16px 18px; border-radius:14px; background:#fcfbf8; border:1px solid rgba(1,68,55,0.1); white-space:pre-line;">${htmlData.electricalRequirements || 'Not provided'}</div>
            </div>
            <div>
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:8px;">Uploaded Documents</div>
              <ul style="margin:0; padding-left:20px; color:#1a1a1a;">
                ${uploadedFileLines.map((item) => `<li style="margin:6px 0;">${escapeHtml(item.replace(/^-\s*/, ''))}</li>`).join('')}
              </ul>
            </div>
            ${dashboardUrl ? `
              <div style="margin-top:26px;">
                <a href="${dashboardUrl}" style="display:inline-block; background:#014437; color:#ffffff; text-decoration:none; font-weight:700; padding:13px 20px; border-radius:10px;">Open in admin dashboard</a>
              </div>
            ` : ''}
          </div>
        </div>
      </div>
    `

    let emailStage = 'admin'
    try {
      const adminEmailResult = await resend.emails.send({
      from: safeFromEmail(),
      to: formToEmail(),
      reply_to: safeEmail(data.businessEmail || data.contactEmail),
      subject: 'New Stall Application – Walsall’s First Ever Bangla Community Day 2026',
      text: adminText,
      html: adminHtml,
      attachments: uploadedFiles.length ? uploadedFiles : undefined,
      })
      if (adminEmailResult.error) throw new Error(adminEmailResult.error.message || 'Unable to send the admin email.')
      await updateApplication(application.id, { emailDelivery: { admin: 'sent', lastError: null } })

      const acknowledgementRecipient = data.businessEmail || data.contactEmail
      if (acknowledgementRecipient) {
        emailStage = 'applicant'
        const footerAttachment = stallConfirmationFooterAttachment()

        const applicantEmailResult = await resend.emails.send({
        from: brandedFromEmail(),
        to: safeEmail(acknowledgementRecipient) || acknowledgementRecipient,
        subject: 'Stall Trader Application Received',
        text: [
          'Dear Applicant,',
          '',
          'Thank you for submitting your stall trader application for Walsall’s First Ever Bangla Community Day.',
          '',
          'We can confirm that your application has been received successfully. Our organising team will now review the information provided, including the stall category, supporting documents and any requirements linked to your application.',
          '',
          'Please note that submission of the application form does not automatically confirm a stall booking. Once your application has been reviewed, we will contact you with the next steps and, where applicable, payment details or further information required.',
          '',
          'If you have any questions in the meantime, please contact the organisers at joinus@shongoshomithi.co.uk.',
          '',
          'Kind regards,',
          '',
          'Shongo Shomithi',
          'United Bangla Community',
        ].join('\n'),
        html: `
          <div style="font-family: Arial, sans-serif; background:#f7f4ee; padding:24px; color:#1a1a1a;">
            <div style="max-width:720px; margin:0 auto; background:#ffffff; border:1px solid rgba(201,168,76,0.22); border-radius:20px; overflow:hidden; box-shadow:0 12px 32px rgba(0,0,0,0.06);">
              <div style="background:linear-gradient(135deg,#014437 0%,#0b5a49 100%); padding:28px 32px; color:#ffffff;">
                <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:#d9bf68; margin-bottom:8px;">Application Received</div>
                <h1 style="margin:0; font-size:30px; line-height:1.2;">Stall Trader Application Received</h1>
                <p style="margin:14px 0 0; color:rgba(255,255,255,0.84); font-size:15px;">Thank you for applying to be part of Walsall’s First Ever Bangla Community Day.</p>
              </div>
              <div style="padding:28px 32px; line-height:1.7; font-size:16px; color:#1a1a1a;">
                <p>Dear Applicant,</p>
                <p>Thank you for submitting your stall trader application for Walsall’s First Ever Bangla Community Day.</p>
                <p>We can confirm that your application has been received successfully. Our organising team will now review the information provided, including the stall category, supporting documents and any requirements linked to your application.</p>
                <div style="margin:22px 0; padding:18px 20px; border-radius:16px; background:#faf7f1; border:1px solid rgba(201,168,76,0.16);">
                  <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:10px;">Important Note</div>
                  <div>Submitting the application form does not automatically confirm a stall booking.</div>
                  <div style="margin-top:8px;">Once reviewed, we will contact you with next steps and, where applicable, payment details or any further information required.</div>
                </div>
                <p>If you have any questions in the meantime, please contact the organisers at <a href="mailto:joinus@shongoshomithi.co.uk" style="color:#014437;">joinus@shongoshomithi.co.uk</a>.</p>
                <p>Kind regards,</p>
                <p style="margin-bottom:24px;">Shongo Shomithi<br/>United Bangla Community</p>
                ${footerAttachment ? '<img src="cid:stall-footer-image" alt="Shongo Shomithi footer" style="display:block; width:100%; max-width:640px; height:auto; margin-top:16px;" />' : ''}
              </div>
            </div>
          </div>
        `,
        attachments: footerAttachment ? [footerAttachment] : undefined,
        })
        if (applicantEmailResult.error) throw new Error(applicantEmailResult.error.message || 'Unable to send the applicant confirmation email.')
        await updateApplication(application.id, { emailDelivery: { applicant: 'sent', lastError: null } })
      }
    } catch (emailError) {
      console.error('stall-application email delivery error', emailError)
      await updateApplication(application.id, {
        emailDelivery: {
          [emailStage]: 'failed',
          lastError: String(emailError?.message || 'Email delivery failed').slice(0, 500),
        },
      }).catch(() => {})
      return res.status(200).json({ ok: true, applicationId: application.id, emailWarning: true })
    }

    return res.status(200).json({ ok: true, applicationId: application.id })
  } catch (error) {
    console.error('stall-application api error', error)
    if (applicationId) {
      await updateApplication(applicationId, {
        emailDelivery: { lastError: String(error?.message || 'Email delivery failed').slice(0, 500) },
      }).catch(() => {})
    }
    const clientError = /invalid|supporting document|required|already been submitted|must be 5mb|must not exceed 20mb|not accepted/i.test(String(error?.message || ''))
    return res.status(clientError ? 400 : 500).json({ error: error?.message || error?.toString?.() || 'Unable to send application.' })
  }
}
