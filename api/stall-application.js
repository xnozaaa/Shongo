import multer from 'multer'
import {
  resendFromEnv,
  formToEmail,
  safeFromEmail,
  safeEmail,
  brandedFromEmail,
  attachmentsFromFiles,
  uploadedFileSummary,
  totalAttachmentSize,
  stallConfirmationFooterAttachment,
} from '../lib/email.js'

export const config = {
  api: {
    bodyParser: false,
  },
}

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})

const fieldsMiddleware = upload.fields([
  { name: 'insuranceFile', maxCount: 1 },
  { name: 'foodHygieneFile', maxCount: 1 },
  { name: 'localAuthorityFile', maxCount: 1 },
  { name: 'hygieneRatingFile', maxCount: 1 },
])

function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) return reject(result)
      return resolve(result)
    })
  })
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

  try {
    await runMiddleware(req, res, fieldsMiddleware)

    const resend = resendFromEnv()
    if (!resend) {
      return res.status(500).json({ error: 'Email sending is not configured yet. Please set RESEND_API_KEY, FORM_TO_EMAIL and FORM_FROM_EMAIL.' })
    }

    const data = JSON.parse(req.body.formData || '{}')
    const isFoodStall = data.stallType === 'cold-food' || data.stallType === 'hot-food'
    const uploaded = req.files || {}

    if (!uploaded.insuranceFile?.length) return res.status(400).json({ error: 'Public & Employer Liability Insurance is required.' })
    if (isFoodStall && (!uploaded.foodHygieneFile?.length || !uploaded.localAuthorityFile?.length || !uploaded.hygieneRatingFile?.length)) {
      return res.status(400).json({ error: 'Food stall applications must include all food safety documents.' })
    }

    const totalSize = totalAttachmentSize(uploaded)
    if (totalSize > 20 * 1024 * 1024) {
      return res.status(400).json({ error: 'Total uploaded files must not exceed 20MB.' })
    }

    const submittedDate = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' })
    const uploadedFiles = attachmentsFromFiles(uploaded).map(({ filename, content, contentType }) => ({ filename, content, contentType }))

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
      ...uploadedFileSummary(uploaded),
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
              <div><strong>Business / Trading Name:</strong> ${data.businessName || 'Not provided'}</div>
              <div><strong>Registered Business Address:</strong> ${data.businessAddress || 'Not provided'}</div>
              <div><strong>Contact Name:</strong> ${data.contactName || 'Not provided'}</div>
              <div><strong>Contact Email:</strong> ${data.contactEmail || data.businessEmail || 'Not provided'}</div>
              <div><strong>Contact Mobile:</strong> ${data.contactNumber || data.businessContactNumber || 'Not provided'}</div>
              <div><strong>Selected Stall Type:</strong> ${data.stallTypeLabel || 'Not provided'}</div>
              <div><strong>Total Amount Payable:</strong> £${data.totalPayable || '0'}</div>
              <div><strong>Declaration Accepted:</strong> ${data.declarationSafety ? 'Yes' : 'No'}</div>
              <div><strong>Date Submitted:</strong> ${submittedDate}</div>
            </div>
            <div style="margin-bottom:20px;">
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:8px;">Items To Be Sold</div>
              <div style="padding:16px 18px; border-radius:14px; background:#fcfbf8; border:1px solid rgba(1,68,55,0.1); white-space:pre-line;">${data.itemsToBeSold || 'Not provided'}</div>
            </div>
            <div style="margin-bottom:20px;">
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:8px;">Electrical Requirements</div>
              <div style="padding:16px 18px; border-radius:14px; background:#fcfbf8; border:1px solid rgba(1,68,55,0.1); white-space:pre-line;">${data.electricalRequirements || 'Not provided'}</div>
            </div>
            <div>
              <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:8px;">Uploaded Documents</div>
              <ul style="margin:0; padding-left:20px; color:#1a1a1a;">
                ${uploadedFileSummary(uploaded).map((item) => `<li style="margin:6px 0;">${item.replace(/^-\s*/, '')}</li>`).join('')}
              </ul>
            </div>
          </div>
        </div>
      </div>
    `

    await resend.emails.send({
      from: safeFromEmail(),
      to: formToEmail(),
      reply_to: safeEmail(data.businessEmail || data.contactEmail),
      subject: 'New Stall Application – Walsall’s First Ever Bangla Community Day 2026',
      text: adminText,
      html: adminHtml,
      attachments: uploadedFiles.length ? uploadedFiles : undefined,
    })

    const acknowledgementRecipient = data.businessEmail || data.contactEmail
    if (acknowledgementRecipient) {
      const footerAttachment = stallConfirmationFooterAttachment()

      await resend.emails.send({
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
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('stall-application api error', error)
    if (error?.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Each uploaded file must be 5MB or less.' })
    }
    return res.status(500).json({ error: error?.message || error?.toString?.() || 'Unable to send application.' })
  }
}
