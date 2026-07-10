import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

export const brandsService = {
  list: () => prisma.brand.findMany({ where: { deletedAt: null }, orderBy: { name: "asc" } }),
  async create(data: { slug: string; name: string; logo?: string }) {
    return prisma.brand.create({ data });
  },
  async update(id: string, data: Partial<{ slug: string; name: string; logo: string; isActive: boolean }>) {
    const exists = await prisma.brand.findUnique({ where: { id } });
    if (!exists) throw AppError.notFound("العلامة غير موجودة");
    return prisma.brand.update({ where: { id }, data });
  },
  async remove(id: string) {
    const count = await prisma.product.count({ where: { brandId: id, deletedAt: null } });
    if (count > 0) throw AppError.conflict("لا يمكن حذف علامة مرتبطة بمنتجات");
    await prisma.brand.update({ where: { id }, data: { deletedAt: new Date() } });
  },
};
