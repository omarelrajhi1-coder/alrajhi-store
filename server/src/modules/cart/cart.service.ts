import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";
import { toProductDto, productListInclude } from "../products/product.mapper";

async function getOrCreateCart(userId: string) {
  return prisma.cart.upsert({ where: { userId }, update: {}, create: { userId } });
}

async function serialize(userId: string) {
  const cart = await prisma.cart.findUnique({
    where: { userId },
    include: { items: { include: { product: { include: productListInclude } } } },
  });
  const lines = (cart?.items ?? []).map((it) => ({ product: toProductDto(it.product), qty: it.quantity }));
  const subtotal = lines.reduce((s, l) => s + l.product.price * l.qty, 0);
  return { items: lines, count: lines.reduce((s, l) => s + l.qty, 0), subtotal };
}

export const cartService = {
  get: (userId: string) => serialize(userId),
  async add(userId: string, productId: string, qty: number) {
    const product = await prisma.product.findFirst({ where: { id: productId, deletedAt: null } });
    if (!product) throw AppError.notFound("المنتج غير موجود");
    const cart = await getOrCreateCart(userId);
    await prisma.cartItem.upsert({
      where: { cartId_productId: { cartId: cart.id, productId } },
      update: { quantity: { increment: qty } },
      create: { cartId: cart.id, productId, quantity: qty },
    });
    return serialize(userId);
  },
  async setQty(userId: string, productId: string, qty: number) {
    const cart = await getOrCreateCart(userId);
    if (qty <= 0) {
      await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
    } else {
      await prisma.cartItem.upsert({
        where: { cartId_productId: { cartId: cart.id, productId } },
        update: { quantity: qty }, create: { cartId: cart.id, productId, quantity: qty },
      });
    }
    return serialize(userId);
  },
  async remove(userId: string, productId: string) {
    const cart = await getOrCreateCart(userId);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id, productId } });
    return serialize(userId);
  },
  async clear(userId: string) {
    const cart = await getOrCreateCart(userId);
    await prisma.cartItem.deleteMany({ where: { cartId: cart.id } });
    return serialize(userId);
  },
  /** Merge a guest cart (from localStorage) into the server cart on login. */
  async merge(userId: string, items: { productId: string; qty: number }[]) {
    for (const it of items) {
      if (it.qty > 0) await this.add(userId, it.productId, it.qty).catch(() => undefined);
    }
    return serialize(userId);
  },
};
