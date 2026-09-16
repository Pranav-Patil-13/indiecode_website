import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { sendLeadEmail } from './api/contact.js'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  process.env.RESEND_API_KEY = env.RESEND_API_KEY || process.env.RESEND_API_KEY
  process.env.RESEND_TO_EMAIL = env.RESEND_TO_EMAIL || process.env.RESEND_TO_EMAIL
  process.env.RESEND_FROM_EMAIL = env.RESEND_FROM_EMAIL || process.env.RESEND_FROM_EMAIL

  return {
    plugins: [
      react(),
      {
        name: 'resend-dev-api',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method === 'POST') {
              let bodyStr = ''
              req.on('data', (chunk) => {
                bodyStr += chunk
              })
              req.on('end', async () => {
                try {
                  const body = JSON.parse(bodyStr || '{}')
                  const { name, email, company, phone, message } = body
                  if (!name || !email || !message) {
                    res.statusCode = 400
                    res.setHeader('Content-Type', 'application/json')
                    res.end(JSON.stringify({ error: 'Name, email, and message are required.' }))
                    return
                  }
                  const data = await sendLeadEmail({ name, email, company, phone, message })
                  res.statusCode = 200
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: true, id: data.id }))
                } catch (err) {
                  res.statusCode = 500
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ error: err.message || 'Failed to send email.' }))
                }
              })
            } else {
              res.statusCode = 405
              res.end('Method Not Allowed')
            }
          })
        },
      },
    ],
  }
})

