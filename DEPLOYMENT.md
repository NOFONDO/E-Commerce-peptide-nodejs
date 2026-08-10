# Deployment Guide

This project deploys entirely on free tiers: **Vercel** (frontend), **Render** (backend), **MongoDB Atlas**
(database), and **Cloudinary** (images).

## 1. MongoDB Atlas (Database)

1. Create a free account at [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas).
2. Create a free **M0** cluster.
3. Under **Database Access**, create a database user with a strong password.
4. Under **Network Access**, add `0.0.0.0/0` (allow access from anywhere) so Render can connect. For tighter
   security later, restrict this to Render's outbound IPs once you know them.
5. Click **Connect → Drivers**, copy the connection string, and replace `<username>`, `<password>`, and add
   your database name, e.g.:
   ```
   mongodb+srv://myuser:mypassword@cluster0.mongodb.net/peptide_store?retryWrites=true&w=majority
   ```

## 2. Cloudinary (Image Storage)

1. Create a free account at [cloudinary.com](https://cloudinary.com).
2. From the dashboard, copy your **Cloud Name**, **API Key**, and **API Secret**.
3. Images uploaded through the admin panel are stored permanently on Cloudinary and referenced by secure URL
   in MongoDB — they persist across every redeploy, including Render's ephemeral filesystem resets.

## 3. Backend on Render

1. Push this repository to GitHub.
2. On [render.com](https://render.com), click **New → Web Service** and connect your repo.
3. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Instance Type:** Free
4. Add environment variables under **Environment** (mirror `backend/.env.example`):
   - `NODE_ENV=production`
   - `PORT=10000` (Render sets `PORT` automatically, but Express reads it either way)
   - `CLIENT_URL` — your Vercel frontend URL, e.g. `https://your-app.vercel.app`
   - `MONGO_URI` — your Atlas connection string
   - `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_COOKIE_EXPIRES_DAYS`
   - `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `ADMIN_NAME`
   - `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET`
   - `RATE_LIMIT_WINDOW_MINUTES`, `RATE_LIMIT_MAX_REQUESTS`
5. Deploy. Once live, open the Render **Shell** tab and run:
   ```bash
   npm run seed
   ```
   This creates your first admin account and default store settings.
6. Note your Render service URL, e.g. `https://peptide-store-api.onrender.com`.

> Render's free tier spins down after inactivity; the first request after idling may take up to a minute.

## 4. Frontend on Vercel

1. On [vercel.com](https://vercel.com), click **New Project** and import the same GitHub repo.
2. Configure:
   - **Root Directory:** `frontend`
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
3. Add environment variables (mirror `frontend/.env.example`):
   - `VITE_API_URL` — your Render backend URL + `/api`, e.g. `https://peptide-store-api.onrender.com/api`
   - `VITE_WHATSAPP_NUMBER` — e.g. `447346257943`
   - `VITE_CONTACT_EMAIL`
   - `VITE_SITE_URL` — your Vercel URL, e.g. `https://your-app.vercel.app`
4. Deploy.
5. Go back to Render and update `CLIENT_URL` to your final Vercel URL, then redeploy the backend so CORS and
   cookies work correctly between the two domains.

## 5. Post-Deployment Checklist

- [ ] Visit the live site and confirm products, categories, and images load.
- [ ] Log into `/admin/login` with your seeded admin credentials.
- [ ] Upload a test product with images and confirm it appears on the storefront.
- [ ] Submit the contact form and confirm the message appears in the admin Messages inbox.
- [ ] Click a "Buy Now" button and confirm it opens WhatsApp with the correct pre-filled message.
- [ ] Update `frontend/public/sitemap.xml` with your real domain.
- [ ] Change the seeded admin password if you used a placeholder value.

## Local Development

Both services also run fully locally without any of the above — see the main [README.md](./README.md) for
local setup with a local MongoDB instance.
