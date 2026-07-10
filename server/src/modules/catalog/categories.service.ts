import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

export interface CategoryDto {
  id: string; slug: string; name: string; nameEn: string;
  image: string | null; count: number; order: number; isActive: boolean;
}

function toDto(c: Prisma.CategoryGetPayload<{ include: { _count: { select: { products: true } } } }>): CategoryDto {
  return { id: c.id, slug: c.slug, name: c.name, nameEn: c.nameEn, image: c.image, count: c._count.products, order: c.order, isActive: c.isActive };
}

export const categoriesService = {
  async list() {
    const cats = await prisma.category.findMany({
      where: { deletedAt: null }, orderBy: { order: "asc" },
      include: { _count: { select: { products: { where: { deletedAt: null } } } } },
    });
    return cats.map(toDto);
  },
  async create(data: { slug: string; name: string; nameEn: string; image?: string; parentId?: string; order?: number }) {
    const c = await prisma.category.create({ data, include: { _count: { select: { products: true } } } });
    return toDto(c);
  },
  async update(id: string, data: Partial<{ slug: string; name: string; nameEn: string; image: string; order: number; isActive: boolean }>) {
    const exists = await prisma.category.findUnique({ where: { id } });
    if (!exists) throw AppError.notFound("القسم غير موجود");
    const c = await prisma.category.update({ where: { id }, data, include: { _count: { select: { products: true } } } });
    return toDto(c);
  },
  async remove(id: string) {
    const count = await prisma.product.count({ where: { categoryId: id, deletedAt: null } });
    if (count > 0) throw AppError.conflict("لا يمكن حذف قسم يحتوي على منتجات");
    await prisma.category.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
