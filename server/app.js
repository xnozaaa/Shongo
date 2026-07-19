import dotenv from 'dotenv'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
dotenv.config({ path: '.env.local' })
import express from 'express'
import multer from 'multer'
import { Resend } from 'resend'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
})
const port = process.env.PORT || 8787

app.use(express.json({ limit: '2mb' }))

const fields = upload.fields([
  { name: 'insuranceFile', maxCount: 1 },
  { name: 'foodHygieneFile', maxCount: 1 },
  { name: 'localAuthorityFile', maxCount: 1 },
  { name: 'hygieneRatingFile', maxCount: 1 },
  { name: 'supportingFiles', maxCount: 10 },
])

function resendFromEnv() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

function cleanEnvValue(value) {
  return String(value || '').trim()
}

function formToEmail() {
  return cleanEnvValue(process.env.FORM_TO_EMAIL) || 'joinus@shongoshomithi.co.uk'
}

function formFromEmail() {
  return cleanEnvValue(process.env.FORM_FROM_EMAIL) || 'Shongo Shomithi Forms <forms@send.shongoshomithi.co.uk>'
}


function extractEmailAddress(value) {
  const raw = String(value || '').trim()
  const match = raw.match(/<([^>]+)>/)
  return match ? match[1].trim() : raw
}

function safeFromEmail() {
  return safeEmail(extractEmailAddress(formFromEmail())) || 'forms@send.shongoshomithi.co.uk'
}

function brandedFromEmail(name = 'Shongo Shomithi') {
  const email = safeFromEmail()
  return `${name} <${email}>`
}


function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

function safeEmail(value) {
  const email = String(value || '').trim()
  return isValidEmail(email) ? email : undefined
}

function safeFilename(value) {
  return String(value || 'attachment')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
}

function attachmentsFromFiles(files = {}) {
  return Object.entries(files).flatMap(([name, values]) =>
    values.map((file) => ({
      field: name,
      filename: safeFilename(file.originalname),
      content: file.buffer,
      contentType: file.mimetype,
      size: file.size,
    }))
  )
}

function uploadedFileSummary(files = {}) {
  return Object.entries(files).flatMap(([name, values]) => values.map((file) => `- ${name}: ${file.originalname}`))
}

function totalAttachmentSize(files = {}) {
  return attachmentsFromFiles(files).reduce((total, file) => total + (file.size || 0), 0)
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/register-interest', async (req, res) => {
  try {
    const resend = resendFromEnv()
    if (!resend) {
      return res.status(500).json({ error: 'Email sending is not configured yet. Please set RESEND_API_KEY, FORM_TO_EMAIL and FORM_FROM_EMAIL.' })
    }

    const data = req.body || {}

    if (!data.firstName || !data.lastName || !data.email || !data.involvement) {
      return res.status(400).json({ error: 'Please complete all required fields.' })
    }

    const submittedDate = new Date().toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short', timeZone: 'Europe/London' })

    const adminText = [
      'New Register Interest Submission – Walsall’s First Ever Bangla Community Day 2026',
      '',
      `First Name: ${data.firstName}`,
      `Last Name: ${data.lastName}`,
      `Email Address: ${data.email}`,
      `Phone Number: ${data.phone || 'Not provided'}`,
      `How would they like to get involved?: ${data.involvement}`,
      `Any message for us?: ${data.message || 'No message provided'}`,
      `Date submitted: ${submittedDate}`,
    ].join('\n')

    await resend.emails.send({
      from: brandedFromEmail(),
      to: formToEmail(),
      reply_to: safeEmail(data.email),
      subject: 'New Register Interest Submission – Walsall’s First Ever Bangla Community Day 2026',
      text: adminText,
    })

    const footerImagePath = path.join(process.cwd(), 'server', 'interest-email-footer.png')
    const footerAttachment = fs.existsSync(footerImagePath)
      ? {
          filename: 'interest-email-footer.png',
          content: fs.readFileSync(footerImagePath).toString('base64'),
          contentType: 'image/png',
          contentId: 'interest-footer-image',
        }
      : null

    await resend.emails.send({
      from: safeFromEmail(),
      to: safeEmail(data.email) || data.email,
      subject: 'Your Interest Has Been Received',
      text: [
        'Dear Applicant,',
        '',
        'Thank you for registering your interest in Walsall’s First Ever Bangla Community Day 2026.',
        '',
        'We have received your details successfully and a member of the Shongo Shomithi team will be in touch soon.',
        '',
        'Event details:',
        'Sunday 30 August 2026',
        '12:00pm – 6:00pm',
        'Walsall Rugby Club, Delves Road, Walsall, WS1 3JY',
        '',
        'If you have any questions in the meantime, please contact joinus@shongoshomithi.co.uk.',
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
              <div style="font-size:14px; letter-spacing:0.08em; text-transform:uppercase; color:#d9bf68; margin-bottom:8px;">Interest Received</div>
              <h1 style="margin:0; font-size:30px; line-height:1.2;">Walsall’s First Ever Bangla Community Day 2026</h1>
              <p style="margin:14px 0 0; color:rgba(255,255,255,0.84); font-size:15px;">Thank you for expressing your interest in this landmark community celebration.</p>
            </div>
            <div style="padding:28px 32px; line-height:1.7; font-size:16px; color:#1a1a1a;">
              <p>Dear Applicant,</p>
              <p>Thank you for registering your interest in Walsall’s First Ever Bangla Community Day 2026.</p>
              <p>We have received your details successfully and a member of the Shongo Shomithi team will be in touch soon.</p>
              <div style="margin:22px 0; padding:18px 20px; border-radius:16px; background:#faf7f1; border:1px solid rgba(201,168,76,0.16);">
                <div style="font-size:12px; text-transform:uppercase; letter-spacing:0.08em; color:#9f1d20; margin-bottom:10px;">Event Details</div>
                <div>Sunday 30 August 2026</div>
                <div>12:00pm – 6:00pm</div>
                <div>Walsall Rugby Club, Delves Road, Walsall, WS1 3JY</div>
              </div>
              <p>If you have any questions in the meantime, please contact <a href="mailto:joinus@shongoshomithi.co.uk" style="color:#014437;">joinus@shongoshomithi.co.uk</a>.</p>
              <p>Kind regards,</p>
              <p style="margin-bottom:24px;">Shongo Shomithi<br/>United Bangla Community</p>
              ${footerAttachment ? '<img src="cid:interest-footer-image" alt="Shongo Shomithi footer" style="display:block; width:100%; max-width:640px; height:auto; margin-top:16px;" />' : ''}
            </div>
          </div>
        </div>
      `,
      attachments: footerAttachment ? [footerAttachment] : undefined,
    })

    res.json({ ok: true })
  } catch (error) {
    console.error('register-interest error', error)
    res.status(500).json({ error: error?.message || error?.toString?.() || 'Unable to send interest form.' })
  }
})

app.post('/api/stall-application', fields, async (req, res) => {
  try {
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

    await resend.emails.send({
      from: safeFromEmail(),
      to: formToEmail(),
      reply_to: safeEmail(data.businessEmail || data.contactEmail),
      subject: 'New Stall Application – Walsall’s First Ever Bangla Community Day 2026',
      text: adminText,
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
          <div style="font-family: Arial, sans-serif; color: #1a1a1a; line-height: 1.7; font-size: 16px;">
            <p>Dear Applicant,</p>
            <p>Thank you for submitting your stall trader application for Walsall’s First Ever Bangla Community Day.</p>
            <p>We can confirm that your application has been received successfully. Our organising team will now review the information provided, including the stall category, supporting documents and any requirements linked to your application.</p>
            <p>Please note that submission of the application form does not automatically confirm a stall booking. Once your application has been reviewed, we will contact you with the next steps and, where applicable, payment details or further information required.</p>
            <p>If you have any questions in the meantime, please contact the organisers at <a href="mailto:joinus@shongoshomithi.co.uk" style="color:#014437;">joinus@shongoshomithi.co.uk</a>.</p>
            <p>Kind regards,</p>
            <p style="margin-bottom: 24px;">Shongo Shomithi<br/>United Bangla Community</p>
            ${footerAttachment ? '<img src="cid:stall-footer-image" alt="Shongo Shomithi footer" style="display:block; width:100%; max-width:640px; height:auto; margin-top:16px;" />' : ''}
          </div>
        `,
        attachments: footerAttachment ? [footerAttachment] : undefined,
      })
    }

    return res.json({ ok: true })
  } catch (error) {
    console.error('stall-application error', error)
    if (error.code === 'LIMIT_FILE_SIZE') {
      return res.status(400).json({ error: 'Each uploaded file must be 5MB or less.' })
    }
    return res.status(500).json({ error: error.message || 'Unable to send application.' })
  }
})

app.use((error, _req, res, next) => {
  if (error?.code === 'LIMIT_FILE_SIZE') {
    return res.status(400).json({ error: 'Each uploaded file must be 5MB or less.' })
  }
  return next(error)
})

app.listen(port, () => {
  console.log(`Stall application API listening on http://localhost:${port}`)
})
