import { prisma } from "../../prisma";
import { toProductDto, productListInclude } from "../products/product.mapper";

export const wishlistService = {
  async list(userId: string) {
    const rows = await prisma.wishlist.findMany({ where: { userId }, include: { product: { include: productListInclude } }, orderBy: { createdAt: "desc" } });
    return rows.map((r) => toProductDto(r.product));
  },
  async toggle(userId: string, productId: string) {
    const existing = await prisma.wishlist.findUnique({ where: { userId_productId: { userId, productId } } });
    if (existing) { await prisma.wishlist.delete({ where: { id: existing.id } }); return { wished: false }; }
    await prisma.wishlist.create({ data: { userId, productId } });
    return { wished: true };
  },
  ids: (userId: string) => prisma.wishlist.findMany({ where: { userId }, select: { productId: true } }).then((r) => r.map((x) => x.productId)),
};
