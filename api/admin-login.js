import {
  adminAuthIsConfigured,
  setAdminSessionCookie,
  verifyAdminPassword,
} from '../lib/admin-auth.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })

  if (!adminAuthIsConfigured()) {
    return res.status(503).json({ error: 'Admin access has not been configured yet.' })
  }

  if (!verifyAdminPassword(req.body?.password)) {
    return res.status(401).json({ error: 'The password is incorrect.' })
  }

  setAdminSessionCookie(res)
  return res.status(200).json({ ok: true })
}
