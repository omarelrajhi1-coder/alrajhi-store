import type { Prisma } from "@prisma/client";

const productInclude = {
  category: true,
  brand: true,
  images: { orderBy: { order: "asc" } },
  inventory: true,
} satisfies Prisma.ProductInclude;


export const productListInclude = productInclude;
export const productDetailInclude = {
  ...productInclude,
  reviews: { where: { status: "APPROVED" }, orderBy: { createdAt: "desc" }, take: 20 },
} satisfies Prisma.ProductInclude;

type ProductWithRelations = Prisma.ProductGetPayload<{ include: typeof productDetailInclude }>;

export interface ProductDto {
  id: string; slug: string; name: string; nameEn: string;
  brandId: string; brandName: string; categorySlug: string; categoryName: string;
  price: number; oldPrice: number | null;
  rating: number; reviewsCount: number;
  images: string[]; inStock: boolean;
  isFeatured: boolean; isBestseller: boolean; isNew: boolean; badge: string | null;
  description: string;
  specs: { label: string; value: string }[];
  reviews?: { id: string; author: string; rating: number; date: string; text: string }[];
  stockQuantity?: number;
}

export function toProductDto(p: ProductWithRelations | (Omit<ProductWithRelations, "reviews"> & { reviews?: ProductWithRelations["reviews"] })): ProductDto {
  const badge = p.oldPrice && p.oldPrice > p.price ? "خصم" : p.isNew ? "جديد" : null;
  const dto: ProductDto = {
    id: p.id, slug: p.slug, name: p.name, nameEn: p.nameEn,
    brandId: p.brandId, brandName: p.brand?.name ?? "",
    categorySlug: p.category?.slug ?? "", categoryName: p.category?.name ?? "",
    price: p.price, oldPrice: p.oldPrice ?? null,
    rating: p.rating, reviewsCount: p.reviewsCount,
    images: (p.images ?? []).map((i) => i.url),
    inStock: p.inStock,
    isFeatured: p.isFeatured, isBestseller: p.isBestseller, isNew: p.isNew, badge,
    description: p.description,
    specs: Array.isArray(p.specs) ? (p.specs as { label: string; value: string }[]) : [],
    stockQuantity: p.inventory?.quantity,
  };
  if ("reviews" in p && Array.isArray(p.reviews)) {
    dto.reviews = p.reviews.map((r) => ({ id: r.id, author: r.author, rating: r.rating, date: r.createdAt.toISOString().slice(0, 10), text: r.text }));
  }
  return dto;
}
