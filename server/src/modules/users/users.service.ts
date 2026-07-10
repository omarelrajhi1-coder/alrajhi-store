import { Prisma } from "@prisma/client";
import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

const publicSelect = { id: true, name: true, email: true, phone: true, role: true, isActive: true, lastLoginAt: true, createdAt: true } satisfies Prisma.UserSelect;

export const usersService = {
  async list(opts: { skip: number; limit: number; q?: string; role?: string }) {
    const where: Prisma.UserWhereInput = { deletedAt: null };
    if (opts.role) where.role = opts.role as Prisma.EnumRoleFilter;
    if (opts.q) where.OR = [{ name: { contains: opts.q, mode: "insensitive" } }, { email: { contains: opts.q, mode: "insensitive" } }, { phone: { contains: opts.q } }];
    const [items, total] = await Promise.all([
      prisma.user.findMany({ where, select: { ...publicSelect, _count: { select: { orders: true } } }, orderBy: { createdAt: "desc" }, skip: opts.skip, take: opts.limit }),
      prisma.user.count({ where }),
    ]);
    return { items, total };
  },
  async getById(id: string) {
    const u = await prisma.user.findFirst({ where: { id, deletedAt: null }, select: { ...publicSelect, orders: { orderBy: { createdAt: "desc" }, take: 10 }, addresses: true } });
    if (!u) throw AppError.notFound("العميل غير موجود");
    return u;
  },
  async setActive(id: string, isActive: boolean) {
    return prisma.user.update({ where: { id }, data: { isActive }, select: publicSelect });
  },
  async setRole(id: string, role: "CUSTOMER" | "ADMIN" | "STAFF") {
    return prisma.user.update({ where: { id }, data: { role }, select: publicSelect });
  },
  async softDelete(id: string) {
    await prisma.user.update({ where: { id }, data: { deletedAt: new Date(), isActive: false } });
  },
};
