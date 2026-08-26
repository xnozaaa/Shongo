import { clearAdminSessionCookie } from '../lib/admin-auth.js'
import { guardPost } from '../lib/request-security.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  if (!guardPost(req, res, { scope: 'admin-logout', limit: 20, maxBodyBytes: 1024 })) return
  clearAdminSessionCookie(res)
  return res.status(200).json({ ok: true })
}
