import fs from 'fs'
import path from 'path'
import { Resend } from 'resend'

export function resendFromEnv() {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) return null
  return new Resend(apiKey)
}

export function cleanEnvValue(value) {
  return String(value || '').trim()
}

export function formToEmail() {
  return cleanEnvValue(process.env.FORM_TO_EMAIL) || 'joinus@shongoshomithi.co.uk'
}

export function formFromEmail() {
  return cleanEnvValue(process.env.FORM_FROM_EMAIL) || 'forms@send.shongoshomithi.co.uk'
}

export function extractEmailAddress(value) {
  const raw = String(value || '').trim()
  const match = raw.match(/<([^>]+)>/)
  return match ? match[1].trim() : raw
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').trim())
}

export function safeEmail(value) {
  const email = String(value || '').trim()
  return isValidEmail(email) ? email : undefined
}

export function safeFromEmail() {
  return safeEmail(extractEmailAddress(formFromEmail())) || 'forms@send.shongoshomithi.co.uk'
}

export function brandedFromEmail(name = 'Shongo Shomithi') {
  const email = safeFromEmail()
  return `${name} <${email}>`
}

export function safeFilename(value) {
  return String(value || 'attachment')
    .replace(/[^a-zA-Z0-9._-]/g, '-')
    .replace(/-+/g, '-')
}

const applicationContentTypes = {
  '.pdf': 'application/pdf',
  '.doc': 'application/msword',
  '.docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
}

export function applicationContentTypeForName(filename) {
  return applicationContentTypes[path.extname(String(filename || '')).toLowerCase()] || null
}

export function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}

export function stallConfirmationFooterAttachment() {
  const imagePath = path.join(process.cwd(), 'server', 'stall-email-footer.png')
  if (!fs.existsSync(imagePath)) return null

  return {
    filename: 'stall-email-footer.png',
    content: fs.readFileSync(imagePath).toString('base64'),
    contentType: 'image/png',
    contentId: 'stall-footer-image',
  }
}


export function interestConfirmationFooterAttachment() {
  const imagePath = path.join(process.cwd(), 'server', 'interest-email-footer.png')
  if (!fs.existsSync(imagePath)) return null

  return {
    filename: 'interest-email-footer.png',
    content: fs.readFileSync(imagePath).toString('base64'),
    contentType: 'image/png',
    contentId: 'interest-footer-image',
  }
}
