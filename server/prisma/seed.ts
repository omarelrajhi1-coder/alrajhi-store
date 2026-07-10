import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

const categoriesData = [
  { slug: "dinnerware", name: "أطقم الصحون", nameEn: "Dinnerware Sets", image: "/assets/products/p18.jpg" },
  { slug: "serving", name: "أدوات التقديم", nameEn: "Serving Ware", image: "/assets/products/p06.jpg" },
  { slug: "cutlery", name: "أدوات المائدة", nameEn: "Cutlery & Flatware", image: "/assets/products/p60.jpg" },
  { slug: "linens", name: "مفارش وتشاريف", nameEn: "Table Linens", image: "/assets/products/p33.jpg" },
  { slug: "accessories", name: "إكسسوارات المطبخ", nameEn: "Kitchen Accessories", image: "/assets/products/p10.jpg" },
  { slug: "home", name: "مستلزمات منزلية", nameEn: "Home Essentials", image: "/assets/products/p64.jpg" },
];
const brandsData = [
  { slug: "rtc", name: "RTC", logo: "/assets/brands/rtc.png" },
  { slug: "al-sharif", name: "Al-Sharif", logo: "/assets/brands/alsharif.png" },
];
const permissionKeys = [
  "products.read","products.write","orders.read","orders.write","inventory.write",
  "customers.read","coupons.write","cms.write","employees.write","analytics.read",
];
function catForIndex(i: number) {
  if (i <= 8) return "serving";
  if (i <= 15) return "accessories";
  if (i <= 32) return "dinnerware";
  if (i <= 55) return "linens";
  if (i <= 63) return "cutlery";
  return "home";
}

async function main() {
  console.log("→ Seeding…");
  // order matters for FKs
  await prisma.$transaction([
    prisma.analyticsEvent.deleteMany(), prisma.activityLog.deleteMany(), prisma.notification.deleteMany(),
    prisma.orderItem.deleteMany(), prisma.order.deleteMany(),
    prisma.review.deleteMany(), prisma.wishlist.deleteMany(), prisma.cartItem.deleteMany(), prisma.cart.deleteMany(),
    prisma.inventory.deleteMany(), prisma.productImage.deleteMany(), prisma.product.deleteMany(),
    prisma.category.deleteMany(), prisma.brand.deleteMany(), prisma.coupon.deleteMany(),
    prisma.rolePermission.deleteMany(), prisma.permission.deleteMany(), prisma.employee.deleteMany(), prisma.staffRole.deleteMany(),
    prisma.refreshToken.deleteMany(), prisma.address.deleteMany(), prisma.user.deleteMany(),
    prisma.homepageBanner.deleteMany(), prisma.homepageSection.deleteMany(), prisma.setting.deleteMany(),
  ]);

  const cats = await Promise.all(categoriesData.map((c) => prisma.category.create({ data: c })));
  const brands = await Promise.all(brandsData.map((b) => prisma.brand.create({ data: b })));
  const catBySlug = Object.fromEntries(cats.map((c) => [c.slug, c]));

  // RBAC
  await prisma.permission.createMany({ data: permissionKeys.map((key) => ({ key })) });
  const allPerms = await prisma.permission.findMany();
  const managerRole = await prisma.staffRole.create({
    data: { name: "Catalog Manager", description: "إدارة المنتجات والمخزون", permissions: { create: allPerms.filter((p) => p.key.startsWith("products") || p.key.startsWith("inventory")).map((p) => ({ permissionId: p.id })) } },
  });

  // Users
  await prisma.user.create({ data: { name: "عمر الراجحي", email: "admin@alrajhi.ly", phone: "0921234567", role: "ADMIN", password: await bcrypt.hash("admin123", 10) } });
  const staff = await prisma.user.create({ data: { name: "موظف الكتالوج", email: "staff@alrajhi.ly", role: "STAFF", password: await bcrypt.hash("staff123", 10) } });
  await prisma.employee.create({ data: { userId: staff.id, title: "مدير الكتالوج", roleId: managerRole.id } });
  const customer = await prisma.user.create({ data: { name: "عميل تجريبي", email: "customer@alrajhi.ly", phone: "0913456789", role: "CUSTOMER", password: await bcrypt.hash("customer123", 10) } });
  await prisma.address.create({ data: { userId: customer.id, fullName: "عميل تجريبي", phone: "0913456789", city: "طرابلس", line: "حي الأندلس، شارع 10", isDefault: true } });

  // Coupons
  await prisma.coupon.create({ data: { code: "ALRAJHI10", type: "PERCENT", value: 10, minTotal: 0, active: true } });
  await prisma.coupon.create({ data: { code: "WELCOME20", type: "FIXED", value: 20, minTotal: 150, active: true } });

  // Products (+ images + inventory)
  for (let i = 1; i <= 67; i++) {
    const slug = `${catForIndex(i)}-${i}`;
    const cat = catBySlug[catForIndex(i)];
    const base = 60 + ((i * 37) % 19) * 10;
    const price = base + ((i * 13) % 5) * 5;
    const hasDisc = i % 3 === 0;
    const qty = i % 11 === 0 ? 0 : 5 + (i % 40);
    const img = `/assets/products/p${String(i).padStart(2, "0")}.jpg`;
    const img2 = `/assets/products/p${String((i % 67) + 1).padStart(2, "0")}.jpg`;
    const p = await prisma.product.create({
      data: {
        slug, sku: `SKU-${1000 + i}`, name: `${cat.name} رقم ${i}`, nameEn: `${cat.slug} item ${i}`,
        description: "قطعة فاخرة بتصميم عصري أنيق تضيف لمسة من الرقي إلى مائدتك، مصنوعة من خامات عالية الجودة مقاومة للاستخدام اليومي.",
        price, oldPrice: hasDisc ? Math.round((price * 1.25) / 5) * 5 : null,
        rating: Math.round(35 + ((i * 7) % 16)) / 10, reviewsCount: 0,
        inStock: qty > 0, isFeatured: i % 5 === 0, isBestseller: i % 4 === 0, isNew: i > 57,
        categoryId: cat.id, brandId: brands[i % 2].id,
        specs: [{ label: "الخامة", value: "سيراميك عالي الجودة" }, { label: "الضمان", value: "سنة واحدة" }],
        images: { create: [{ url: img, order: 0 }, { url: img2, order: 1 }] },
        inventory: { create: { quantity: qty, lowStockAt: 5 } },
      },
    });
    if (i % 6 === 0) {
      await prisma.review.create({ data: { productId: p.id, userId: customer.id, author: "سارة أحمد", rating: 5, text: "جودة ممتازة وتغليف رائع.", status: "APPROVED" } });
      await prisma.product.update({ where: { id: p.id }, data: { rating: 5, reviewsCount: 1 } });
    }
  }

  // Homepage CMS
  await prisma.homepageBanner.createMany({ data: [
    { title: "الراجحي للمواد المنزلية", subtitle: "جودة عالية .. أسعار مناسبة", image: "/assets/products/p18.jpg", href: "/shop", order: 0 },
    { title: "أطقم الصحون الفاخرة", subtitle: "تشكيلة جديدة بالكامل", image: "/assets/products/p24.jpg", href: "/shop?category=dinnerware", order: 1 },
  ]});
  await prisma.homepageSection.createMany({ data: [
    { key: "featured", title: "منتجات مميزة", order: 1, isActive: true },
    { key: "bestsellers", title: "الأكثر مبيعاً", order: 2, isActive: true },
    { key: "latest", title: "أحدث المنتجات", order: 3, isActive: true },
  ]});
  await prisma.setting.createMany({ data: [
    { key: "store", value: { name: "الراجحي للمواد المنزلية", phone: "092 123 4567", email: "info@alrajhi.ly", city: "طرابلس" } },
    { key: "shipping", value: { flatRate: 10, freeOver: 500 } },
  ]});

  console.log("✓ Seed complete: 6 categories, 2 brands, 67 products, RBAC, 2 coupons, CMS, admin/staff/customer.");
}

main().catch((e) => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
