# ZE Peptide Biotechnology — E-Commerce Platform

A production-ready peptide research products storefront with an admin dashboard, built on the MERN stack
(MongoDB, Express, React, Node.js). Customers browse and inquire via WhatsApp — no payment gateway required.

## Tech Stack

**Frontend:** React 19, Vite, React Router 7, Axios, Tailwind CSS, React Hook Form, Framer Motion, React Icons
**Backend:** Node.js, Express, MongoDB (Mongoose), JWT auth, bcrypt, Multer + Cloudinary, Helmet, express-rate-limit
**Database:** MongoDB (local via MongoDB Compass in development, MongoDB Atlas in production)

## Project Structure

```
peptide-mern/
├── backend/
│   ├── src/
│   │   ├── config/        # Database and Cloudinary configuration
│   │   ├── models/        # Mongoose schemas (Product, Category, Message, Admin, Settings)
│   │   ├── controllers/   # Business logic per resource
│   │   ├── routes/        # Express route definitions
│   │   ├── middleware/    # Auth, validation, error handling, rate limiting, upload
│   │   ├── utils/         # Logger, async handler, token helpers, Cloudinary upload
│   │   ├── validators/    # express-validator rule sets
│   │   ├── app.js         # Express app configuration
│   │   ├── server.js      # Server entrypoint
│   │   └── seed.js        # Creates the first admin account and default settings
│   ├── .env.example
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/           # Axios request functions per resource
│   │   ├── components/    # layout/, common/, admin/
│   │   ├── context/       # AuthContext
│   │   ├── pages/         # Public pages + pages/admin/
│   │   └── utils/         # WhatsApp message builder, formatters
│   ├── public/            # robots.txt, sitemap.xml
│   ├── .env.example
│   └── package.json
├── README.md
├── DEPLOYMENT.md
└── API_DOCS.md
```

## Getting Started (Local Development)

### Prerequisites
- Node.js 18+
- MongoDB running locally (e.g. via MongoDB Compass / `mongod`), or a MongoDB Atlas connection string
- A free [Cloudinary](https://cloudinary.com) account for image storage

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Edit `.env` and fill in:
- `MONGO_URI` — your local or Atlas connection string
- `JWT_SECRET` — any long random string
- `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` — from your Cloudinary dashboard
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — credentials for your first admin account

Create the first admin account and default store settings:

```bash
npm run seed
```

Start the API:

```bash
npm run dev
```

The API runs at `http://localhost:5000/api` by default. Visit `http://localhost:5000/api/health` to confirm it's running.

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

The default `.env.example` values already point at `http://localhost:5000/api`. Start the dev server:

```bash
npm run dev
```

The site runs at `http://localhost:5173`. Log into the admin panel at `http://localhost:5173/admin/login`
with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set in the backend `.env`.

## Core Features

- **Public storefront:** Home, Shop (search, filter by category/stock, sort, pagination), Product Details
  (image gallery, specifications, dosage info, related products), Categories, About, Contact, FAQ, Privacy
  Policy, Terms, 404.
- **WhatsApp-first checkout:** every "Buy Now" button opens WhatsApp with a pre-filled message containing the
  product name, quantity, and any note the customer adds — no payment gateway needed.
- **Contact form:** stored in MongoDB and visible in the admin Messages inbox.
- **Admin dashboard:** live stats (products, categories, messages, stock), full CRUD on products and
  categories (with multi-image Cloudinary uploads), a messages inbox (read / mark replied / delete), and a
  settings page for WhatsApp number, contact email, store description, and social links.
- **Security:** JWT in httpOnly cookies, bcrypt password hashing, Helmet security headers, rate limiting on
  auth/contact endpoints, MongoDB sanitization, XSS protection, input validation on every write endpoint.
- **SEO:** dynamic meta tags, Open Graph + Twitter Card tags, structured data (Organization, Product, FAQPage),
  `robots.txt`, `sitemap.xml`, lazy-loaded images, code-split admin bundle.

## Environment Variables

See `backend/.env.example` and `frontend/.env.example` for the full list. Never commit real `.env` files —
only the `.env.example` templates are checked into version control.

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for the full guide to deploying on Vercel (frontend), Render (backend),
and MongoDB Atlas (database) — all on free tiers.

## API Reference

See [API_DOCS.md](./API_DOCS.md) for the full endpoint reference.
