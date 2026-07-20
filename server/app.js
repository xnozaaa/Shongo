import dotenv from 'dotenv'
import express from 'express'
import registerInterestHandler from '../api/register-interest.js'
import stallApplicationHandler from '../api/stall-application.js'
import stallUploadHandler from '../api/stall-upload.js'
import adminLoginHandler from '../api/admin-login.js'
import adminLogoutHandler from '../api/admin-logout.js'
import adminApplicationsHandler from '../api/admin-applications.js'
import adminApplicationHandler from '../api/admin-application.js'
import adminFileHandler from '../api/admin-file.js'

dotenv.config({ path: '.env.local' })

const app = express()
const port = process.env.PORT || 8787

app.use(express.json({ limit: '2mb' }))

app.get('/api/health', (_req, res) => {
  res.json({ ok: true })
})

app.all('/api/register-interest', registerInterestHandler)
app.all('/api/stall-application', stallApplicationHandler)
app.all('/api/stall-upload', stallUploadHandler)
app.all('/api/admin-login', adminLoginHandler)
app.all('/api/admin-logout', adminLogoutHandler)
app.all('/api/admin-applications', adminApplicationsHandler)
app.all('/api/admin-application', adminApplicationHandler)
app.all('/api/admin-file', adminFileHandler)

app.listen(port, () => {
  console.log(`Shongo API listening on http://localhost:${port}`)
})
