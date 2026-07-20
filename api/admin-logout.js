import { clearAdminSessionCookie } from '../lib/admin-auth.js'

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store')
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed.' })
  clearAdminSessionCookie(res)
  return res.status(200).json({ ok: true })
}
