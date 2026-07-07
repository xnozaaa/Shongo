import express from 'express'
import multer from 'multer'
import nodemailer from 'nodemailer'

const app = express()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } })
const port = process.env.PORT || 8787

const fields = upload.fields([
  { name: 'insuranceFile', maxCount: 1 },
  { name: 'foodHygieneFile', maxCount: 1 },
  { name: 'localAuthorityFile', maxCount: 1 },
  { name: 'hygieneRatingFile', maxCount: 1 },
  { name: 'supportingFiles', maxCount: 10 },
])

function transporterFromEnv() {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_SECURE, MAIL_FROM } = process.env

  if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS || !MAIL_FROM) return null

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT),
    secure: SMTP_SECURE === 'true',
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  })
}

function fileList(files = {}) {
  return Object.entries(files)
    .flatMap(([name, values]) => values.map((file) => ({ field: name, filename: file.originalname, content: file.buffer, contentType: file.mimetype })))
}

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.post('/api/stall-application', fields, async (req, res) => {
  try {
    const transporter = transporterFromEnv()
    if (!transporter) {
      return res.status(500).json({ error: 'Email sending is not configured yet. Please set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS and MAIL_FROM.' })
    }

    const data = JSON.parse(req.body.formData || '{}')
    const isFoodStall = data.stallType === 'cold-food' || data.stallType === 'hot-food'
    const uploaded = req.files || {}

    if (!uploaded.insuranceFile?.length) return res.status(400).json({ error: 'Insurance file is required.' })
    if (isFoodStall && (!uploaded.foodHygieneFile?.length || !uploaded.localAuthorityFile?.length || !uploaded.hygieneRatingFile?.length)) {
      return res.status(400).json({ error: 'Food stall applications must include all food safety documents.' })
    }

    const adminRecipient = process.env.MAIL_TO || 'yulaversestudio@gmail.com'
    const submittedDate = new Date(data.submittedAt || Date.now()).toLocaleString('en-GB', { dateStyle: 'long', timeStyle: 'short' })

    const adminText = [
      'New Stall Application – Walsall’s First Ever Bangla Community Day 2026',
      '',
      `Business / Trading Name: ${data.businessName}`,
      `Contact Name: ${data.contactName}`,
      `Contact Email: ${data.contactEmail}`,
      `Contact Mobile: ${data.contactMobile}`,
      `Selected Stall Type: ${data.stallTypeLabel}`,
      `Total amount payable: £${data.totalPayable}`,
      `Items to be sold: ${data.itemsToBeSold}`,
      `Electrical requirements: ${data.electricalRequirements}`,
      `Declaration confirmations:`,
      `- Information correct: ${data.declarationCorrect ? 'Yes' : 'No'}`,
      `- Terms understood: ${data.declarationTerms ? 'Yes' : 'No'}`,
      `- Safety responsibilities accepted: ${data.declarationSafety ? 'Yes' : 'No'}`,
      `Date submitted: ${submittedDate}`,
      '',
      'Uploaded documents:',
      ...fileList(uploaded).map((file) => `- ${file.field}: ${file.filename}`),
    ].join('\n')

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: adminRecipient,
      replyTo: data.contactEmail,
      subject: 'New Stall Application – Walsall’s First Ever Bangla Community Day 2026',
      text: adminText,
      attachments: fileList(uploaded),
    })

    await transporter.sendMail({
      from: process.env.MAIL_FROM,
      to: data.contactEmail,
      subject: 'Your Stall Application Has Been Received',
      text: [
        'Thank you for submitting your stall application for Walsall’s First Ever Bangla Community Day 2026.',
        '',
        'Your application will be reviewed by the organisers. If your application is approved, you will be invoiced with full payment details.',
        '',
        'Event details:',
        'Sunday 30 August 2026',
        '12:00pm – 6:00pm',
        'Walsall Rugby Club, Delves Road, Walsall, WS1 3JY',
        '',
        'If you have any questions, please contact:',
        'joinus@shongoshomithi.co.uk',
      ].join('\n'),
    })

    return res.json({ ok: true })
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Unable to send application.' })
  }
})

app.listen(port, () => {
  console.log(`Stall application API listening on http://localhost:${port}`)
})
