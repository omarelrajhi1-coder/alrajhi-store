import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { productListInclude, productDetailInclude } from "./product.mapper";

export interface ProductFilter {
  categorySlug?: string; brandId?: string; q?: string;
  inStock?: boolean; minRating?: number; maxPrice?: number; minPrice?: number;
  featured?: boolean; bestseller?: boolean; isNew?: boolean;
}

function buildWhere(f: ProductFilter): Prisma.ProductWhereInput {
  const where: Prisma.ProductWhereInput = { deletedAt: null };
  if (f.categorySlug) where.category = { slug: f.categorySlug };
  if (f.brandId) where.brandId = f.brandId;
  if (f.inStock) where.inStock = true;
  if (f.featured) where.isFeatured = true;
  if (f.bestseller) where.isBestseller = true;
  if (f.isNew) where.isNew = true;
  if (typeof f.minRating === "number") where.rating = { gte: f.minRating };
  if (typeof f.minPrice === "number" || typeof f.maxPrice === "number")
    where.price = { ...(f.minPrice ? { gte: f.minPrice } : {}), ...(f.maxPrice ? { lte: f.maxPrice } : {}) };
  if (f.q) where.OR = [
    { name: { contains: f.q, mode: "insensitive" } },
    { nameEn: { contains: f.q, mode: "insensitive" } },
    { description: { contains: f.q, mode: "insensitive" } },
  ];
  return where;
}

const sortMap: Record<string, Prisma.ProductOrderByWithRelationInput> = {
  "price-asc": { price: "asc" }, "price-desc": { price: "desc" },
  rating: { rating: "desc" }, new: { createdAt: "desc" }, featured: { isFeatured: "desc" },
};

export const productsRepository = {
  async paginate(filter: ProductFilter, opts: { skip: number; limit: number; sort: string }) {
    const where = buildWhere(filter);
    const orderBy = sortMap[opts.sort] ?? { isFeatured: "desc" };
    const [items, total] = await Promise.all([
      prisma.product.findMany({ where, orderBy, skip: opts.skip, take: opts.limit, include: productListInclude }),
      prisma.product.count({ where }),
    ]);
    return { items, total };
  },
  findBySlug: (slug: string) => prisma.product.findFirst({ where: { slug, deletedAt: null }, include: productDetailInclude }),
  findById: (id: string) => prisma.product.findFirst({ where: { id, deletedAt: null }, include: productDetailInclude }),
  related: (categoryId: string, excludeId: string, take = 4) =>
    prisma.product.findMany({ where: { categoryId, id: { not: excludeId }, deletedAt: null }, take, include: productListInclude }),
  create: (data: Prisma.ProductCreateInput) => prisma.product.create({ data, include: productDetailInclude }),
  update: (id: string, data: Prisma.ProductUpdateInput) => prisma.product.update({ where: { id }, data, include: productDetailInclude }),
  softDelete: (id: string) => prisma.product.update({ where: { id }, data: { deletedAt: new Date() } }),
};
