# MediCore HMS — Public Landing Page

The public-facing marketing site for MediCore HMS. Built with Next.js for server-side rendering and SEO. Served at `yourapp.com`, backed by the `hms/` API.

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

---

## Getting Started

### Prerequisites
- Node.js 18+
- `hms/` API running at `http://localhost:3000`

### Frontend

```bash
cd healthbridge/Client
npm install
npm run dev
# Runs at http://localhost:3001
```

---

## Environment Variables

### Frontend (`Client/.env.local`)

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
NEXT_PUBLIC_APP_URL=http://localhost:5173
```

> In production:
> ```env
> NEXT_PUBLIC_API_URL=https://api.yourapp.com
> NEXT_PUBLIC_APP_URL=https://app.yourapp.com
> ```

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
