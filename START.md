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
5. Deploy the backend on Render and point both backend URL env vars to the Render service URL.

The frontend build script now runs Prisma against `backend/prisma/schema.prisma`, which is the shared schema source used by both apps.

## Render Backend Deployment
Use the `backend/` folder as a separate Render Web Service.

1. Create a new Web Service from the backend folder.
2. Set the Root Directory to `backend`.
3. Set the build command to `npm ci --include=dev && npm run build`.
4. Set the start command to `npm start`.
5. Add these environment variables on Render:
	- `DATABASE_URL`
	- `JWT_SECRET`
	- `ADMIN_EMAIL`
	- `ADMIN_PASSWORD`
	- `FRONTEND_URL` with your Vercel site URL
6. Use the Render service URL as `BACKEND_URL` and `NEXT_PUBLIC_BACKEND_URL` in Vercel.

If Root Directory is not set to `backend`, use these commands instead:
- Build: `npm ci --include=dev --prefix backend && npm run build --prefix backend`
- Start: `npm run start --prefix backend`

You can also deploy with the repository `render.yaml` blueprint to avoid manual misconfiguration.

The backend now allows CORS from `FRONTEND_URL` or `CORS_ORIGIN`, which makes the Vercel frontend work against the Render API.
