# ALRAJHI API — Endpoint Reference

Base URL: `http://localhost:4000/api` · Standard envelope: `{ success, data, meta? }` (errors: `{ success:false, error:{ code, message, details? } }`).
Auth via HTTP-only cookies (`access_token` 15m + `refresh_token` 7d, rotated).

## Auth  `/auth`
| Method | Path | Access | Body |
|---|---|---|---|
| POST | /register | public | name,email,password,phone? |
| POST | /login | public | email,password |
| POST | /refresh | cookie | — |
| POST | /logout | public | — |
| GET | /me | user | — |
| POST | /forgot-password | public | email |
| POST | /reset-password | public | token,password |

## Products  `/products`
`GET /` (public) — filters: category, brand, q, sort, page, limit, inStock, minRating, minPrice, maxPrice → paginated.
`GET /:slug` (public) → { product, related }. `POST / · PUT /:id · DELETE /:id` (admin).

## Categories `/categories` · Brands `/brands`
`GET /` public; `POST/PUT/DELETE` admin.

## Inventory `/inventory` (admin)
`GET /`, `GET /low-stock`, `POST /set`, `POST /adjust`.

## Cart `/cart` (user)
`GET /`, `POST /items`, `PATCH /items`, `DELETE /items/:productId`, `DELETE /`, `POST /merge`.

## Wishlist `/wishlist` (user)
`GET /`, `GET /ids`, `POST /toggle`.

## Orders `/orders`
`POST /` (guest/user checkout), `GET /mine`, `GET /mine/:id` (user); `GET /`, `GET /:id`, `PATCH /:id/status` (admin).

## Reviews `/reviews`
`GET /product/:id` public, `POST /product/:id` (creates PENDING); `GET /`, `PATCH /:id/status`, `DELETE /:id` (admin).

## Coupons `/coupons`
`POST /validate` public; CRUD admin.

## Account `/account` (user)
`PATCH /profile`, `POST /change-password`, addresses CRUD `/addresses`.

## Users `/users` (admin) · Employees `/employees` (admin) — RBAC roles & permissions
## Dashboard `/dashboard` (admin): /overview /recent-orders /top-products /sales-by-month
## CMS `/cms`: /banners /sections /settings (public read; admin write)
## Notifications `/notifications` (user) · Analytics `/analytics` (/track public, /summary admin)
## Uploads `/uploads/image` (admin, multipart `file`) — local in dev, Cloudinary in prod.

## Seed credentials
- Admin: `admin@alrajhi.ly` / `admin123`
- Staff: `staff@alrajhi.ly` / `staff123`
- Customer: `customer@alrajhi.ly` / `customer123`
- Coupons: `ALRAJHI10` (10%), `WELCOME20` (20 د.ل over 150)
