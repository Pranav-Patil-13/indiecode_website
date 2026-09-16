/**
 * Serverless Contact Form Handler for indiecode
 * Works seamlessly with Vercel, Netlify, and custom Node servers.
 */

export async function sendLeadEmail({ name, email, company, phone, message }) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('Missing RESEND_API_KEY environment variable.');
  }

  const toEmail = process.env.RESEND_TO_EMAIL || 'hello@indiecode.in';
  let fromEmail = process.env.RESEND_FROM_EMAIL || 'onboarding@resend.dev';

  // Ensure fromEmail has a display name if not present
  if (!fromEmail.includes('<')) {
    fromEmail = `indiecode Leads <${fromEmail}>`;
  }

  const subject = `New Project Inquiry: ${name}${company ? ` (${company})` : ''}`;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            background-color: #F7F5F0;
            margin: 0;
            padding: 40px 20px;
            color: #2F2921;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #FFFFFF;
            border-radius: 12px;
            border: 1px solid #E6E2D8;
            overflow: hidden;
            box-shadow: 0 4px 20px rgba(47, 41, 33, 0.06);
          }
          .header {
            background-color: #2F2921;
            padding: 30px;
            text-align: left;
            border-bottom: 2px solid #A88447;
          }
          .logo {
            font-size: 20px;
            font-weight: 700;
            letter-spacing: 0.05em;
            color: #F7F5F0;
            margin: 0;
          }
          .eyebrow {
            color: #A88447;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.15em;
            text-transform: uppercase;
            margin-top: 6px;
            display: block;
          }
          .content {
            padding: 32px 30px;
          }
          .lead-title {
            font-size: 20px;
            font-weight: 600;
            color: #2F2921;
            margin: 0 0 20px 0;
          }
          .info-table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 24px;
          }
          .info-table td {
            padding: 10px 0;
            border-bottom: 1px solid #F0ECE1;
            vertical-align: top;
          }
          .label {
            width: 130px;
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #8C827A;
          }
          .value {
            font-size: 15px;
            font-weight: 500;
            color: #2F2921;
          }
          .value a {
            color: #A88447;
            text-decoration: none;
          }
          .message-box {
            background-color: #FAF8F5;
            border: 1px solid #EAE5D9;
            border-radius: 8px;
            padding: 18px;
            margin-top: 10px;
          }
          .message-label {
            font-size: 12px;
            font-weight: 600;
            text-transform: uppercase;
            letter-spacing: 0.08em;
            color: #8C827A;
            margin-bottom: 8px;
          }
          .message-text {
            font-size: 14px;
            line-height: 1.6;
            color: #2F2921;
            white-space: pre-wrap;
          }
          .footer {
            padding: 20px 30px;
            background-color: #FAF8F5;
            border-top: 1px solid #EAE5D9;
            text-align: center;
            font-size: 12px;
            color: #A39B92;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 class="logo">indiecode</h1>
            <span class="eyebrow">NEW WEBSITE INQUIRY</span>
          </div>
          <div class="content">
            <h2 class="lead-title">You've received a new project lead.</h2>
            <table class="info-table">
              <tr>
                <td class="label">Client Name</td>
                <td class="value"><strong>${name}</strong></td>
              </tr>
              <tr>
                <td class="label">Email Address</td>
                <td class="value"><a href="mailto:${email}">${email}</a></td>
              </tr>
              <tr>
                <td class="label">Company</td>
                <td class="value">${company ? company : '<span style="color: #A39B92;">Not provided</span>'}</td>
              </tr>
              <tr>
                <td class="label">Phone</td>
                <td class="value">${phone ? `<a href="tel:${phone}">${phone}</a>` : '<span style="color: #A39B92;">Not provided</span>'}</td>
              </tr>
            </table>

            <div class="message-box">
              <div class="message-label">Project Details / Message</div>
              <div class="message-text">${message}</div>
            </div>
          </div>
          <div class="footer">
            Delivered via indiecode.in Contact Form • Simply click Reply to respond to the client directly.
          </div>
        </div>
      </body>
    </html>
  `;

  // Function to call Resend
  async function callResend(from, to) {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        reply_to: email,
        subject,
        html: htmlContent,
      }),
    });

    const data = await res.json();
    return { ok: res.ok, status: res.status, data };
  }

  let result = await callResend(fromEmail, toEmail);

  // If failed due to unverified custom domain, fallback to onboarding@resend.dev
  if (!result.ok && fromEmail !== 'onboarding@resend.dev' && !fromEmail.includes('onboarding@resend.dev')) {
    console.warn('Custom domain sending failed, falling back to onboarding@resend.dev:', result.data);
    fromEmail = 'indiecode Leads <onboarding@resend.dev>';
    result = await callResend(fromEmail, toEmail);
  }

  // If failed due to testing recipient restriction, fallback to the account email (indiecode.in@gmail.com)
  if (!result.ok && result.data?.message && result.data.message.includes('You can only send testing emails to your own email address')) {
    const match = result.data.message.match(/\(([^)]+)\)/);
    const accountEmail = match ? match[1] : (process.env.RESEND_ACCOUNT_EMAIL || 'indiecode.in@gmail.com');
    console.warn(`Recipient domain not verified yet. Delivering lead to Resend account email (${accountEmail}):`, result.data);
    result = await callResend(fromEmail, accountEmail);
  }

  if (!result.ok) {
    throw new Error(result.data?.message || 'Failed to send email via Resend.');
  }

  return result.data;
}

// Standard Vercel / Node serverless export
export default async function handler(req, res) {
  // Enable CORS if accessed from other origins
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed. Use POST.' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { name, email, company, phone, message } = body || {};

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Please provide name, email, and message.' });
    }

    const data = await sendLeadEmail({ name, email, company, phone, message });
    return res.status(200).json({ success: true, id: data.id });
  } catch (err) {
    console.error('Contact API Error:', err);
    return res.status(500).json({ error: err.message || 'Internal Server Error' });
  }
}
