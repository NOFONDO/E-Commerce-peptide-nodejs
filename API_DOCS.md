# API Documentation

Base URL (local): `http://localhost:5000/api`

All responses follow the shape `{ success: boolean, message?: string, data?: any, errors?: string[] }`.
Authenticated endpoints require the `token` httpOnly cookie set on login, or an `Authorization: Bearer <token>`
header.

## Auth

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/auth/login` | Public | Log in with `{ email, password }`. Sets an httpOnly `token` cookie. |
| POST | `/auth/logout` | Admin | Clears the auth cookie. |
| GET | `/auth/me` | Admin | Returns the currently authenticated admin. |

## Products

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/products` | Public | List products. Query params: `search`, `category`, `featured`, `bestSeller`, `inStock`, `minPrice`, `maxPrice`, `sort` (`newest`\|`oldest`\|`price-asc`\|`price-desc`\|`name-asc`\|`name-desc`), `page`, `limit`. |
| GET | `/products/slug/:slug` | Public | Get a single product by slug, plus up to 4 related products from the same category. |
| GET | `/products/:id` | Public | Get a single product by ID. |
| POST | `/products` | Admin | Create a product. `multipart/form-data` with fields: `name`, `category` (ObjectId), `price`, `description`, `stockQuantity`, `benefits` (comma-separated), `specifications` (JSON string array of `{label, value}`), `dosageInformation`, `warnings`, `isFeatured`, `isBestSeller`, `isAvailable`, and `images` (1–8 files). |
| PUT | `/products/:id` | Admin | Update a product. Same fields as create, all optional. `removeImagePublicIds` (JSON string array) removes existing images; new `images` files are appended. |
| DELETE | `/products/:id` | Admin | Delete a product and its Cloudinary images. |

## Categories

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/categories` | Public | List all categories with `productCount`. |
| GET | `/categories/:slug` | Public | Get a category by slug. |
| POST | `/categories` | Admin | Create `{ name, description }`. |
| PUT | `/categories/:id` | Admin | Update a category. |
| DELETE | `/categories/:id` | Admin | Delete a category (blocked if it still has products assigned). |

## Messages

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| POST | `/messages` | Public (rate-limited) | Submit `{ name, email, phone?, subject, message }` from the contact form. |
| GET | `/messages` | Admin | List messages. Query params: `isRead`, `isReplied`, `page`, `limit`. |
| GET | `/messages/:id` | Admin | Get a message and mark it as read. |
| PATCH | `/messages/:id/replied` | Admin | Mark a message as replied. |
| DELETE | `/messages/:id` | Admin | Delete a message. |

## Dashboard

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/dashboard/stats` | Admin | Returns total products/categories/messages, unread messages, featured/best-seller/out-of-stock counts, and the 5 most recent products and messages. |

## Settings

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/settings` | Public | Get store settings (WhatsApp number, contact email, description, social links). Creates defaults on first call. |
| PUT | `/settings` | Admin | Update settings. |

## Health

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| GET | `/health` | Public | Returns `{ success: true, message: "API is healthy", timestamp }`. |

## Error Responses

Validation errors return `400` with an `errors` array of messages. Auth failures return `401`. Not-found
resources return `404`. Duplicate keys (e.g. a category name that already exists) return `409`. Rate-limited
requests return `429`. Unhandled errors return `500`.
