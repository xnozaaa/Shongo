import { resendFromEnv, formToEmail, safeFromEmail, safeEmail, brandedFromEmail, interestConfirmationFooterAttachment } from '../lib/email.js'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed.' })
  }

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

    const footerAttachment = interestConfirmationFooterAttachment()

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

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('register-interest api error', error)
    return res.status(500).json({ error: error?.message || error?.toString?.() || 'Unable to send interest form.' })
  }
}
