# indiecode

Official website for **indiecode** (Software Solutions) — Crafting high-performance custom web applications, SaaS platforms, and enterprise digital solutions.

## Tech Stack
- **Frontend**: React 19, Vite, Vanilla CSS
- **Icons**: Lucide React
- **Email Delivery**: Resend API (`/api/contact`)
- **Deployment**: Compatible with Vercel, Netlify, and custom Node hosts

## Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Environment Setup
Copy `.env.example` to `.env` and fill in your Resend credentials:
```bash
cp .env.example .env
```

```env
RESEND_API_KEY=re_your_api_key_here
RESEND_TO_EMAIL=hello@indiecode.in
RESEND_FROM_EMAIL=onboarding@resend.dev
```

### 3. Run Locally
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 4. Build for Production
```bash
npm run build
```

---

© 2026 indiecode. All rights reserved.