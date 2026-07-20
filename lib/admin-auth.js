import crypto from 'crypto'

const COOKIE_NAME = 'shongo_admin_session'
const SESSION_DURATION_SECONDS = 12 * 60 * 60

function configuredPassword() {
  return String(process.env.ADMIN_PASSWORD || '')
}

function configuredSecret() {
  return String(process.env.ADMIN_SESSION_SECRET || '')
}

function digest(value) {
  return crypto.createHash('sha256').update(String(value)).digest()
}

function sign(value) {
  return crypto.createHmac('sha256', configuredSecret()).update(value).digest('base64url')
}

function parseCookies(header = '') {
  return String(header)
    .split(';')
    .map((part) => part.trim())
    .filter(Boolean)
    .reduce((cookies, part) => {
      const separator = part.indexOf('=')
      if (separator === -1) return cookies
      cookies[part.slice(0, separator)] = decodeURIComponent(part.slice(separator + 1))
      return cookies
    }, {})
}

export function adminAuthIsConfigured() {
  return configuredPassword().length >= 12 && configuredSecret().length >= 32
}

export function verifyAdminPassword(password) {
  if (!adminAuthIsConfigured()) return false
  return crypto.timingSafeEqual(digest(password), digest(configuredPassword()))
}

export function createAdminSessionToken(now = Date.now()) {
  if (!adminAuthIsConfigured()) throw new Error('Admin access is not configured.')

  const payload = Buffer.from(JSON.stringify({
    version: 1,
    expiresAt: now + (SESSION_DURATION_SECONDS * 1000),
  })).toString('base64url')

  return `${payload}.${sign(payload)}`
}

export function verifyAdminSessionToken(token, now = Date.now()) {
  if (!adminAuthIsConfigured() || !token) return false

  const [payload, signature, ...extra] = String(token).split('.')
  if (!payload || !signature || extra.length) return false

  const expectedSignature = sign(payload)
  if (signature.length !== expectedSignature.length) return false
  if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) return false

  try {
    const parsed = JSON.parse(Buffer.from(payload, 'base64url').toString('utf8'))
    return parsed.version === 1 && Number(parsed.expiresAt) > now
  } catch {
    return false
  }
}

export function isAdminRequest(req) {
  const cookies = parseCookies(req.headers?.cookie)
  return verifyAdminSessionToken(cookies[COOKIE_NAME])
}

export function setAdminSessionCookie(res) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === 'production'
  const attributes = [
    `${COOKIE_NAME}=${encodeURIComponent(createAdminSessionToken())}`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    `Max-Age=${SESSION_DURATION_SECONDS}`,
  ]

  if (secure) attributes.push('Secure')
  res.setHeader('Set-Cookie', attributes.join('; '))
}

export function clearAdminSessionCookie(res) {
  const secure = process.env.VERCEL || process.env.NODE_ENV === 'production'
  const attributes = [
    `${COOKIE_NAME}=`,
    'Path=/',
    'HttpOnly',
    'SameSite=Strict',
    'Max-Age=0',
  ]

  if (secure) attributes.push('Secure')
  res.setHeader('Set-Cookie', attributes.join('; '))
}

export function requireAdmin(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (isAdminRequest(req)) return true
  res.status(401).json({ error: 'Admin sign-in required.' })
  return false
}
