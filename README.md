# Spire Infotech Website

Modern corporate website for **Spire Infotech** — built with Next.js 15, TypeScript, and Tailwind CSS.

---

## 🚀 View the Website

### Option 1 — Deploy to Vercel (recommended, free)

Click the button below to deploy your own live copy in under 2 minutes:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/AbhiZoe/spire-infotech-website)

After deploying, Vercel gives you a public URL like `https://spire-infotech-website.vercel.app`.

> **Environment variables** — the site works without them, but the contact form email delivery requires SMTP credentials. Add them in the Vercel dashboard under **Settings → Environment Variables** (see the [Contact Form Setup](#contact-form-setup) section below).

---

### Option 2 — Run locally

**Prerequisites:** Node.js 18 or later, npm 9 or later.

```bash
# 1. Clone the repository
git clone https://github.com/AbhiZoe/spire-infotech-website.git
cd spire-infotech-website

# 2. Install dependencies
npm install

# 3. (Optional) Set up environment variables for the contact form
cp .env.local.example .env.local
# Edit .env.local and fill in your SMTP credentials

# 4. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser — the site hot-reloads as you edit files.

#### Other useful commands

| Command | What it does |
|---|---|
| `npm run dev` | Start development server on port 3000 |
| `npm run build` | Create an optimised production build |
| `npm run start` | Serve the production build locally |
| `npm run lint` | Run ESLint |

---

## 📄 Pages

| Route | Description |
|---|---|
| `/` | Home — Navbar, Hero, About, Services, Why Us, Technologies, Projects, Testimonials, Contact, Footer |
| `/privacy-policy` | Privacy policy |
| `/api/contact` | Contact form API endpoint (POST) |
| `/404` | Custom 404 error page |

---

## 🎨 Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org) (Pages Router)
- **Language:** TypeScript
- **Styling:** [Tailwind CSS 3](https://tailwindcss.com) with custom Spire colour palette
- **Email:** [Nodemailer](https://nodemailer.com)
- **Deployment:** [Vercel](https://vercel.com)

### Brand colours

| Token | Hex | Usage |
|---|---|---|
| `primary` | `#1FC7C7` | Buttons, highlights, accents |
| `secondary` | `#1F2A30` | Dark backgrounds, headings |
| `accent` | `#7FE6E6` | Soft highlights |

---

## ✉️ Contact Form Setup

The contact form (`/api/contact`) sends emails via SMTP. Copy `.env.local.example` to `.env.local` and fill in your credentials:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password      # Gmail: use an App Password

COMPANY_EMAIL=info@spireitco.com # Recipient of form submissions
NEXT_PUBLIC_SITE_URL=https://www.spireitco.com
```

For Gmail, [create an App Password](https://support.google.com/accounts/answer/185833) instead of using your regular password.

---

## 📁 Project Structure

```
spire-infotech-website/
├── src/
│   ├── components/
│   │   ├── Contact.tsx        # Contact section (info cards + form)
│   │   ├── ContactForm.tsx    # Validated contact form
│   │   ├── Footer.tsx         # Site footer
│   │   └── Testimonials.tsx   # Client testimonials carousel
│   ├── pages/
│   │   ├── api/
│   │   │   └── contact.ts     # Contact form API route (Nodemailer)
│   │   ├── _app.tsx           # Global app wrapper
│   │   ├── _document.tsx      # HTML document structure
│   │   ├── 404.tsx            # Custom 404 page
│   │   ├── index.tsx          # Home page
│   │   └── privacy-policy.tsx # Privacy policy page
│   └── styles/
│       └── globals.css        # Global styles & animations
├── .env.local.example         # Environment variable template
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind theme (Spire colours)
├── tsconfig.json              # TypeScript configuration
└── postcss.config.js          # PostCSS configuration
```

---

## 📝 License

ISC © Spire Infotech
