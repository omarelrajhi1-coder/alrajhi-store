import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

export const inventoryService = {
  async list(opts: { skip: number; limit: number; lowOnly?: boolean }) {
    const where = opts.lowOnly ? { quantity: { lte: prisma.inventory.fields.lowStockAt } } : {};
    const [rows, total] = await Promise.all([
      prisma.inventory.findMany({
        where, skip: opts.skip, take: opts.limit, orderBy: { quantity: "asc" },
        include: { product: { select: { id: true, name: true, slug: true, sku: true } } },
      }),
      prisma.inventory.count({ where }),
    ]);
    return { items: rows, total };
  },
  lowStock: () =>
    prisma.inventory.findMany({
      where: { quantity: { lte: prisma.inventory.fields.lowStockAt } },
      include: { product: { select: { id: true, name: true, slug: true } } },
      orderBy: { quantity: "asc" }, take: 20,
    }),
  async setQuantity(productId: string, quantity: number, lowStockAt?: number) {
    if (quantity < 0) throw AppError.badRequest("الكمية لا يمكن أن تكون سالبة");
    const inv = await prisma.inventory.upsert({
      where: { productId },
      update: { quantity, ...(lowStockAt !== undefined ? { lowStockAt } : {}) },
      create: { productId, quantity, lowStockAt: lowStockAt ?? 5 },
    });
    await prisma.product.update({ where: { id: productId }, data: { inStock: quantity > 0 } });
    return inv;
  },
  async adjust(productId: string, delta: number) {
    const inv = await prisma.inventory.findUnique({ where: { productId } });
    if (!inv) throw AppError.notFound("لا يوجد سجل مخزون لهذا المنتج");
    const quantity = Math.max(0, inv.quantity + delta);
    return this.setQuantity(productId, quantity, inv.lowStockAt);
  },
};
