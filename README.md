# MediCore HMS — Public Landing Page

The public-facing marketing site for MediCore HMS. Built with Next.js for server-side rendering and SEO. Served at `yourapp.com`.

**Role in the monorepo:**
- `hms/` → Backend API (api.yourapp.com)
- `Health-bridge/` → Hospital web app (app.yourapp.com)
- `healthbridge/` → **This repo** — Public landing page (yourapp.com)

---

## Purpose

This repo is the first thing visitors see — hospital decision-makers, clinic owners, and lab managers who want to learn about and sign up for MediCore. It handles:

- Marketing pages (hero, features, pricing, about, contact)
- Hospital registration / onboarding flow
- Login page that authenticates and redirects to `app.yourapp.com`
- FAQ and support content
- SEO — server-side rendered for search engine visibility

Once a user is authenticated, they are redirected to `app.yourapp.com` (the Health-bridge web app) for all clinical and operational work.

---

## Tech Stack

### Frontend (`Client/`)
| Layer | Technology |
|-------|-----------|
| Framework | Next.js 15.1 (React 19) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3.4 |
| UI Components | Radix UI (dropdown-menu, hover-card, slot) |
| Icons | Lucide React |
| Utilities | clsx, class-variance-authority, tailwind-merge |

### Backend (`Server/`)
| Layer | Technology |
|-------|-----------|
| Framework | Express 4 |
| Language | TypeScript |
| Database | PostgreSQL + Sequelize |
| Auth | JWT + bcrypt |
| Cache | Redis (ioredis) |
| Message Queue | RabbitMQ |
| Email | Nodemailer + Brevo SMTP |
| Rate Limiting | express-rate-limit |

> The Server/ in this repo handles the registration and initial onboarding flow. All clinical API calls are handled by `hms/`.

---

## Pages

| Route | Page | Description |
|-------|------|-------------|
| `/` | Home / Hero | Main landing — headline, CTAs, trust indicators |
| `/features` | Features | All 12+ platform features with icons and descriptions |
| `/pricing` | Pricing | 4 subscription tiers (Individual / Basic / Standard / Pro) with feature comparison |
| `/about` | About | Company story, mission, team |
| `/contact` | Contact | Contact form + support channels |
| `/faq` | FAQ | Public FAQ pulled from `hms` FAQ API |
| `/login/sign_In` | Login | Authenticates user → redirects to app.yourapp.com |
| `/register/sign_up` | Register | Hospital onboarding — 3-step form (hospital info, admin account, plan selection) |

---

## Auth Flow

```
yourapp.com/login
  → User enters credentials
  → POST to api.yourapp.com/auth/login
  → JWT issued
  → Cookie set with domain=.yourapp.com  (shared across subdomains)
  → Redirect to app.yourapp.com/dashboard
```

The shared cookie domain means the hospital web app (`app.yourapp.com`) automatically picks up the authentication without a second login.

---

## Current State

The frontend is currently in **early placeholder stage**. The component structure is in place (Radix UI, Tailwind, layout) but page content needs to be built out from the Google Stitch designs.

Backend (`Server/`) has:
- User, Doctor, Hospital, Appointment models and routes
- Email verification flow (6-digit code via Redis, 10-min TTL)
- JWT auth with secure cookies
- RabbitMQ notification queue
- Atomic appointment creation with conflict detection

---

## Getting Started

### Frontend

```bash
cd healthbridge/Client
npm install
npm run dev
# Runs at http://localhost:3000
```

### Backend

```bash
cd healthbridge/Server
npm install
cp .env.example .env
npm run migrate
npm run dev
# Runs at http://localhost:4000
```

---

## Environment Variables

### Frontend (`Client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:5173
```

> In production:
> ```env
> NEXT_PUBLIC_API_URL=https://api.yourapp.com
> NEXT_PUBLIC_APP_URL=https://app.yourapp.com
> ```

### Backend (`Server/.env`)

```env
PORT=4000
NODE_ENV=development

DB_HOST=localhost
DB_PORT=5432
DB_NAME=healthbridge_landing
DB_USER=postgres
DB_PASSWORD=yourpassword

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=1h

REDIS_URL=redis://localhost:6379
RABBITMQ_URL=amqp://localhost

SMTP_HOST=smtp-relay.brevo.com
SMTP_PORT=587
SMTP_USER=your_login
SMTP_PASS=your_key

# App URLs (for CORS and redirects)
APP_URL=http://localhost:5173
LANDING_URL=http://localhost:3000
```

---

## Domain Architecture

```
yourapp.com          →  This repo  (Next.js, SSR, SEO)
app.yourapp.com      →  Health-bridge  (React SPA, hospital dashboard)
api.yourapp.com      →  hms  (Express REST API)
```

Cookies use `domain=.yourapp.com` so auth tokens are shared across all three subdomains without re-authentication.

---

## Design

All screen designs (landing page, pricing, features, login, register) are documented in `/DESIGN_PROMPTS.md` at the repository root — Prompts 1 through 5. Implementation follows after Google Stitch designs are approved.
