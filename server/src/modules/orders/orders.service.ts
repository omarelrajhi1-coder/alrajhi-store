import { Prisma, OrderStatus } from "@prisma/client";
import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

const SHIPPING = 10;

export interface CreateOrderInput {
  customer: string; phone: string; city: string; address: string; notes?: string;
  couponCode?: string;
  items: { productId: string; quantity: number }[];
}

export const ordersService = {
  async create(input: CreateOrderInput, userId?: string) {
    if (!input.items.length) throw AppError.badRequest("السلة فارغة");

    return prisma.$transaction(async (tx) => {
      const ids = input.items.map((i: { productId: string; quantity: number }) => i.productId);
      const products = await tx.product.findMany({ where: { id: { in: ids }, deletedAt: null }, include: { inventory: true } });
      if (products.length !== ids.length) throw AppError.badRequest("بعض المنتجات لم تعد متوفرة");

      let subtotal = 0;
      const orderItems = input.items.map((i: { productId: string; quantity: number }) => {
        const p = products.find((x: { id: string; name: string; price: number; inventory: { quantity: number } | null }) => x.id === i.productId)!;
        if (p.inventory && p.inventory.quantity < i.quantity) throw AppError.conflict(`الكمية المتوفرة من ${p.name} غير كافية`);
        subtotal += p.price * i.quantity;
        return { productId: p.id, name: p.name, price: p.price, quantity: i.quantity };
      });

      let discount = 0; let couponCode: string | undefined;
      if (input.couponCode) {
        const c = await tx.coupon.findUnique({ where: { code: input.couponCode.toUpperCase() } });
        if (c && c.active && (!c.expiresAt || c.expiresAt > new Date()) && subtotal >= c.minTotal &&
            (c.usageLimit === null || c.usedCount < c.usageLimit)) {
          discount = c.type === "PERCENT" ? Math.round(subtotal * (c.value / 100)) : Math.min(c.value, subtotal);
          couponCode = c.code;
          await tx.coupon.update({ where: { id: c.id }, data: { usedCount: { increment: 1 } } });
        }
      }

      const total = subtotal - discount + SHIPPING;
      const order = await tx.order.create({
        data: {
          number: `#${Date.now().toString().slice(-7)}`,
          userId, customer: input.customer, phone: input.phone, city: input.city,
          address: input.address, notes: input.notes, couponCode,
          subtotal, shipping: SHIPPING, discount, total,
          items: { create: orderItems },
        },
        include: { items: true },
      });

      // decrement inventory + flag out-of-stock
      for (const it of orderItems) {
        const p = products.find((x: { id: string; inventory: { quantity: number } | null }) => x.id === it.productId)!;
        if (p.inventory) {
          const q = Math.max(0, p.inventory.quantity - it.quantity);
          await tx.inventory.update({ where: { productId: p.id }, data: { quantity: q } });
          if (q === 0) await tx.product.update({ where: { id: p.id }, data: { inStock: false } });
        }
      }

      if (userId) {
        await tx.cart.update({ where: { userId }, data: { items: { deleteMany: {} } } }).catch(() => undefined);
        await tx.notification.create({ data: { userId, type: "ORDER", title: "تم استلام طلبك", body: `رقم الطلب ${order.number}` } });
      }
      return order;
    });
  },

  async listAdmin(opts: { skip: number; limit: number; status?: string; q?: string }) {
    const where: Prisma.OrderWhereInput = {};
    if (opts.status && opts.status !== "ALL") where.status = opts.status as OrderStatus;
    if (opts.q) where.OR = [{ number: { contains: opts.q, mode: "insensitive" } }, { customer: { contains: opts.q, mode: "insensitive" } }, { phone: { contains: opts.q } }];
    const [items, total] = await Promise.all([
      prisma.order.findMany({ where, orderBy: { createdAt: "desc" }, skip: opts.skip, take: opts.limit, include: { items: true } }),
      prisma.order.count({ where }),
    ]);
    return { items, total };
  },

  getById: (id: string) => prisma.order.findUnique({ where: { id }, include: { items: true } }),

  async listMine(userId: string) {
    return prisma.order.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, include: { items: true } });
  },
  async getMine(userId: string, id: string) {
    const order = await prisma.order.findUnique({ where: { id }, include: { items: true } });
    if (!order || order.userId !== userId) throw AppError.notFound("الطلب غير موجود");
    return order;
  },
  async updateStatus(id: string, status: string) {
    const exists = await prisma.order.findUnique({ where: { id } });
    if (!exists) throw AppError.notFound("الطلب غير موجود");
    const order = await prisma.order.update({ where: { id }, data: { status: status as Prisma.EnumOrderStatusFieldUpdateOperationsInput["set"] }, include: { items: true } });
    if (order.userId) await prisma.notification.create({ data: { userId: order.userId, type: "ORDER", title: "تحديث حالة الطلب", body: `${order.number}: ${status}` } });
    return order;
  },
};
