# MediCare Pro

A B2B healthcare dashboard built with Next.js 14 and micro-frontend architecture.

---

### 🌐 Live Demo

<a href="https://medicare.amithshankar.in" target="_blank" rel="noopener noreferrer"><img src="https://img.shields.io/badge/MediCare_Pro-Live_Demo-blue?style=for-the-badge&logo=nextdotjs" alt="Live Demo"></a>
---

## Tech Stack
- **Framework**: Next.js 14 (App Router)
- **State**: Zustand + Persistence
- **Auth**: Firebase
- **Architecture**: Micro-frontends (Turborepo)
- **Styling**: Tailwind CSS + Framer Motion
- **Tooling**: pnpm + TypeScript

## Project Structure
```
├── apps/
│   ├── shell (Host application)
│   ├── auth (Authentication service)
│   ├── patients (Patient records & management)
│   └── analytics (Data visualizations)
└── packages/
    ├── types (Shared TS definitions)
    ├── store (Centralized Zustand stores)
    ├── hooks (Shared React hooks)
    ├── ui (Shared component library)
    └── utils (Common helpers & services)
```

## Local Development

### 1. Install Dependencies
```bash
pnpm install
```

### 2. Environment Setup
Create a `.env.local` file based on `.env.example` and fill in your Firebase credentials.

### 3. Run Applications

Run all applications in parallel:
```bash
pnpm dev
```

Or run a specific application (e.g., shell):
```bash
pnpm --filter shell dev
```

## Available Scripts
- `pnpm dev`: Start all apps in development mode
- `pnpm build`: Build all apps for production
- `pnpm type-check`: Run TypeScript validation across the workspace
- `pnpm lint`: Run ESLint across the workspace

## Deployment
Each app in `apps/` can be deployed independently to Vercel. Ensure `NEXT_PUBLIC_*_URL` environment variables are configured in each project to point to the respective remote URLs.

---