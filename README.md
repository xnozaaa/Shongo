# Shongo Shomithi

Public website and stall application system for Walsall’s First Ever Bangla Community Day 2026.

## Local development

```bash
npm install
cp .env.example .env.local
npm run api
```

In a second terminal:

```bash
npm run dev
```

The Vite development server proxies `/api` requests to the local API server on port 8787.

## Application emails and admin dashboard

New stall applications are handled by `api/stall-application.js`. Each successful submission:

1. Uploads supporting documents directly to a private Vercel Blob store, avoiding Vercel Function upload-size limits.
2. Saves the application record alongside those private documents.
3. Sends the full application and attachments to the configured admin address through Resend.
4. Sends the applicant acknowledgement email through Resend.
5. Makes the saved application available at `/admin`.

The admin dashboard is protected by an HTTP-only, signed session cookie. Attachment requests are authorised by the API and redirected to a two-minute, file-specific signed URL; permanent private Blob URLs and storage credentials are never exposed.

## Vercel configuration

Before deploying the dashboard:

1. In the Vercel project, open **Storage**, create a **Blob** store with **Private** access, and connect it to this project. Vercel adds `BLOB_READ_WRITE_TOKEN` automatically.
2. In **Settings → Environment Variables**, add:
   - `ADMIN_PASSWORD`: a unique password with at least 12 characters.
   - `ADMIN_SESSION_SECRET`: at least 32 random characters. Generate one with `openssl rand -base64 48`.
3. Keep the existing `RESEND_API_KEY`, `FORM_TO_EMAIL`, and `FORM_FROM_EMAIL` variables.
4. Redeploy the project, then visit `/admin`.

Only applications submitted after private storage is enabled appear in the dashboard. Existing applications held in email are not imported automatically.
