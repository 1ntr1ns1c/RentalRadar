# RentalRadar Frontend (Next.js)

This project has been migrated from **Vite + React Router** to **Next.js 14 (App Router)** with TypeScript and TailwindCSS.

## Run locally

1. **Install dependencies** (first time or after pull):

   ```bash
   npm install
   ```

   If you see peer dependency conflicts, use:

   ```bash
   npm install --legacy-peer-deps
   ```

2. **Environment**

   Copy `.env.example` to `.env.local` and set your Django API URL:

   ```bash
   cp .env.example .env.local
   ```

   Then set `NEXT_PUBLIC_API_URL` (e.g. `http://localhost:8000/api`).  
   The app uses this for all API requests; no other request logic was changed.

3. **Dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

4. **Production build**

   ```bash
   npm run build
   npm start
   ```

## Structure

- **`app/`** – App Router routes (replaces React Router):
  - `app/page.tsx` → Home
  - `app/login/page.tsx`, `app/register/page.tsx`, `app/dashboard/page.tsx`
  - `app/properties/page.tsx`, `app/properties/[id]/page.tsx`
  - `app/contact/page.tsx`, `app/profile/page.tsx`, `app/inquiries/page.tsx`
- **`src/components/`** – Reusable UI (unchanged behavior; `next/link` and `"use client"` where needed).
- **`src/lib/`** – API client (`api.ts`) and Cloudinary (`cloudinary.ts`); same request logic, `NEXT_PUBLIC_API_URL` instead of `VITE_API_URL`.
- **`src/context/`** – `AuthContext` (client-only).
- **`public/`** – Static assets (unchanged).

All business logic, API integrations, and component behavior are preserved; only the framework was switched from Vite to Next.js.
