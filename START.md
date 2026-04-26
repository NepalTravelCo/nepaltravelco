# Project Setup & Run Guide

This project is organized into a `frontend` (Next.js) and `backend` (Node.js/Express) structure.

## Quick Start (from Root)

To start both environments, you can run these commands from the root directory:

### Frontend (Next.js)

```bash
npm run frontend:dev
```

Runs the development server on `http://localhost:3000`.

### Backend (Node.js/Express)

```bash
npm run backend:dev
```

Runs the development server on `http://localhost:5000`.

---

## Detailed Directory Commands

### Frontend

- **Path**: `/frontend`
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build`

### Backend

- **Path**: `/backend`
- **Install**: `npm install`
- **Dev**: `npm run dev`
- **Build**: `npm run build`

## Initial Setup

If you just cloned the repository, run:

```bash
npm run install:all
```

This will install dependencies for both the `frontend` and `backend` automatically.

## Vercel Deployment

Deploy the Next.js app from the `frontend/` folder, not the repository root.

1. Create a Vercel project from the repo.
2. Set the Root Directory to `frontend`.
3. Use `npm run build` as the build command.
4. Add `DATABASE_URL`, `AUTH_SECRET`, `BACKEND_URL`, and `NEXT_PUBLIC_BACKEND_URL` in Vercel.
5. Deploy the backend on Vercel as a separate project and point both backend URL env vars to the backend Vercel URL.

The frontend build script now runs Prisma against `backend/prisma/schema.prisma`, which is the shared schema source used by both apps.

## Vercel Backend Deployment

Use the `backend/` folder as a separate Vercel project.

1. Create a new Vercel project from the same repository.
2. Set the Root Directory to `backend`.
3. Use these project settings:
   - Framework Preset: `Other`
   - Install Command: `npm install`
   - Build Command: `npm run prisma:generate`
   - Output Directory: leave empty
4. Add these environment variables in the backend Vercel project:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `ADMIN_EMAIL`
   - `ADMIN_PASSWORD`
   - `FRONTEND_URL` with your frontend Vercel URL
   - `CORS_ORIGIN` (optional, comma-separated extra origins)
   - `ALLOW_VERCEL_PREVIEWS=true`
   - `NODE_ENV=production`
5. Deploy backend and copy the backend Vercel URL.
6. In the frontend Vercel project, set `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` to that backend Vercel URL.

The backend Vercel project uses `backend/vercel.json` and `backend/api/index.ts` to run the Express app as a serverless function. The backend allows CORS from `FRONTEND_URL` or `CORS_ORIGIN`, and can allow Vercel preview domains when `ALLOW_VERCEL_PREVIEWS=true`.
