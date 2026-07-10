# هيكل المشروع (محدّث)

```
alrajhi_Web/
├─ frontend/   ← تطبيق Next.js (الواجهة) — src, public, package.json, إعداداته
├─ server/     ← واجهة Express الخلفية + Prisma + قاعدة البيانات
├─ docker-compose.yml   ← يشغّل db + api + web معاً
└─ README.md
```

**تشغيل الواجهة:** `cd frontend` ثم `npm install` ثم `npm run dev`.
**تشغيل الخادم:** `cd server` ثم `npm install` ثم `npx prisma generate` ثم `npx prisma migrate dev` ثم `npm run db:seed` ثم `npm run dev`.

---

# الراجحي للمواد المنزلية — ALRAJHI Store

متجر إلكتروني متكامل (Full-Stack E-Commerce) لشركة ليبية للمواد المنزلية، بواجهة عربية افتراضية واتجاه RTL، مبني على Next.js 15 و Express و PostgreSQL.

A production-oriented e-commerce platform for a Libyan home-goods company. Arabic-first, RTL, with English/LTR switching.

---

## ✨ المميزات
- **واجهة المتجر**: رئيسية بسلايدر متحرك، أقسام، منتجات مميزة، الأكثر مبيعاً، أحدث المنتجات، علامات تجارية، ونشرة بريدية.
- **صفحة المنتجات** مع تصفية كاملة (الأقسام، العلامات، السعر، التوفر، التقييم)، فرز، وترقيم صفحات.
- **صفحة المنتج**: معرض صور، اختيار الكمية، إضافة للسلة/المفضلة، مواصفات، وصف، تقييمات، ومنتجات ذات صلة.
- **السلة والدفع** مع كود خصم، حساب التوصيل، والدفع عند الاستلام.
- **لوحة تحكم الأدمن** كاملة: نظرة عامة بإحصائيات ورسم بياني للمبيعات، إدارة المنتجات والطلبات.
- **RTL/LTR** وتبديل لغة، خط Cairo، ولوحة ألوان احترافية.
- **SEO**: ميتا، Open Graph، robots.txt، و sitemap.xml. حركات سلسة عبر Framer Motion.

## 🧱 التقنيات
| الطبقة | التقنيات |
|--------|----------|
| الواجهة الأمامية | Next.js 15 (App Router), React 19, TypeScript, TailwindCSS, Framer Motion, Lucide |
| الواجهة الخلفية | Node.js, Express, TypeScript, Zod, JWT (HTTP-only cookies), bcrypt, Helmet, Rate-limit |
| قاعدة البيانات | PostgreSQL + Prisma ORM |
| النشر | Docker / docker-compose |

---

## 🚀 التشغيل السريع (Docker)
```bash
docker compose up --build
```
- المتجر: http://localhost:3000
- لوحة التحكم: http://localhost:3000/admin
- الـ API: http://localhost:4000/api/health

حساب الأدمن التجريبي: `admin@alrajhi.ly` / `admin123`

---

## 🛠️ التشغيل اليدوي (للتطوير)

### 1) الواجهة الأمامية
```bash
cd frontend
cp .env.example .env.local
npm install
npm run dev          # http://localhost:3000
```
> الواجهة تعمل مباشرة ببيانات تجريبية من `src/data/catalogue.ts` دون حاجة للخادم لمعاينة التصميم.

### 2) الواجهة الخلفية + قاعدة البيانات
```bash
cd server
cp .env.example .env
npm install
npx prisma migrate dev --name init
npm run db:seed               # يزرع 67 منتجاً + أدمن + كوبون
npm run dev                   # http://localhost:4000
```

---

## 📁 هيكل المشروع
```
alrajhi_Web/
├─ public/assets/            # الصور والشعارات (منتجات + علامات تجارية)
│  ├─ products/p01..p67.jpg
│  └─ brands/{rtc,alsharif}.png
├─ src/
│  ├─ app/
│  │  ├─ (store)/            # مجموعة مسارات المتجر (Header/Footer)
│  │  │  ├─ page.tsx  shop/ product/ cart/ checkout/ offers/ about/ contact/ account/
│  │  ├─ admin/              # لوحة التحكم
│  │  ├─ layout.tsx  robots.ts  sitemap.ts
│  ├─ components/  (ui/ admin/ shop/ product/)
│  ├─ context/   # StoreContext (سلة/مفضلة) + LocaleContext (i18n)
│  ├─ data/  lib/  types/
├─ server/
│  ├─ src/        # Express API (auth, products, orders, dashboard …)
│  ├─ prisma/     # schema.prisma + seed.ts
│  └─ Dockerfile
├─ docker-compose.yml
└─ README.md
```

---

## 🎨 الهوية البصرية
| العنصر | القيمة |
|--------|--------|
| الأحمر الأساسي | `#C8102E` |
| الأحمر الداكن | `#A30822` |
| الخلفية | `#F8F8F8` |
| النص الأساسي | `#1E1E1E` |
| الخط | Cairo (احتياطي: Tajawal) |

---

## 🔌 أهم مسارات الـ API
| الطريقة | المسار | الوصف |
|---------|--------|-------|
| `POST` | `/api/auth/register · /login · /logout`, `GET /me` | المصادقة |
| `GET` | `/api/products` | قائمة المنتجات (تصفية/فرز/ترقيم) |
| `GET` | `/api/products/:slug` | تفاصيل منتج |
| `POST/PUT/DELETE` | `/api/products` | إدارة المنتجات (أدمن) |
| `GET` | `/api/categories · /api/brands` | الأقسام والعلامات |
| `POST` | `/api/orders` | إنشاء طلب (دفع عند الاستلام) |
| `GET` | `/api/orders`, `PATCH /:id/status` | إدارة الطلبات (أدمن) |
| `GET` | `/api/dashboard/overview` | إحصائيات لوحة التحكم |

---

## 📝 ملاحظات
- هذه النسخة تركّز على **واجهة متجر متكاملة وعالية الجودة** تعمل ببيانات تجريبية، مع **هيكل خلفي كامل** (Express + Prisma + مخطط قاعدة بيانات + Seed + Docker) جاهز للربط.
- لربط الواجهة بالـ API الحقيقي، استبدل استيرادات `@/data/catalogue` باستدعاءات fetch/React Query إلى `NEXT_PUBLIC_API_URL`.
- جميع الصور حقيقية من مجلد `public/assets` ولا توجد صور بديلة.

© الراجحي للمواد المنزلية — جميع الحقوق محفوظة.
