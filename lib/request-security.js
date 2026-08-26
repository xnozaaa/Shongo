const globalStore = globalThis
const rateLimits = globalStore.__shongoRateLimits || new Map()
globalStore.__shongoRateLimits = rateLimits

function requestHost(req) {
  return String(req.headers?.['x-forwarded-host'] || req.headers?.host || '')
    .split(',')[0]
    .trim()
    .toLowerCase()
}

function clientIp(req) {
  return String(
    req.headers?.['x-vercel-forwarded-for']
      || req.headers?.['x-forwarded-for']
      || req.socket?.remoteAddress
      || 'unknown',
  ).split(',')[0].trim()
}

export function isSameOrigin(req) {
  const origin = String(req.headers?.origin || '').trim()
  if (!origin) return true

  try {
    return new URL(origin).host.toLowerCase() === requestHost(req)
  } catch {
    return false
  }
}

export function guardPost(req, res, {
  scope,
  limit,
  maxBodyBytes,
  windowMs = 15 * 60 * 1000,
}) {
  if (!isSameOrigin(req)) {
    res.status(403).json({ error: 'Request not allowed.' })
    return false
  }

  const contentLength = Number(req.headers?.['content-length'])
  if (Number.isFinite(contentLength) && contentLength > maxBodyBytes) {
    res.status(413).json({ error: 'Request is too large.' })
    return false
  }

  const now = Date.now()
  const key = `${scope}:${clientIp(req)}`
  const current = rateLimits.get(key)
  if (!current || current.resetAt <= now) {
    rateLimits.set(key, { count: 1, resetAt: now + windowMs })
  } else if (current.count >= limit) {
    res.status(429).json({ error: 'Too many requests. Please try again later.' })
    return false
  } else {
    current.count += 1
  }

  if (rateLimits.size > 2000) {
    for (const [entryKey, entry] of rateLimits) {
      if (entry.resetAt <= now) rateLimits.delete(entryKey)
    }
  }
  return true
}

export function cleanText(value, maxLength) {
  const cleaned = typeof value === 'string' ? value.trim() : ''
  if (cleaned.length > maxLength) throw new Error('Invalid form data.')
  return cleaned
}
