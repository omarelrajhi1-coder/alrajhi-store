import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

export interface CouponResult { code: string; type: "PERCENT" | "FIXED"; value: number; discount: number; }

export const couponsService = {
  list: () => prisma.coupon.findMany({ orderBy: { createdAt: "desc" } }),
  async validateForTotal(code: string, subtotal: number): Promise<CouponResult> {
    const c = await prisma.coupon.findUnique({ where: { code: code.toUpperCase() } });
    if (!c || !c.active) throw AppError.badRequest("كود الخصم غير صالح");
    if (c.expiresAt && c.expiresAt < new Date()) throw AppError.badRequest("انتهت صلاحية الكود");
    if (c.usageLimit !== null && c.usedCount >= c.usageLimit) throw AppError.badRequest("تم استنفاد الكود");
    if (subtotal < c.minTotal) throw AppError.badRequest(`الحد الأدنى للطلب ${c.minTotal} د.ل`);
    const discount = c.type === "PERCENT" ? Math.round(subtotal * (c.value / 100)) : Math.min(c.value, subtotal);
    return { code: c.code, type: c.type, value: c.value, discount };
  },
  create: (data: { code: string; type?: "PERCENT" | "FIXED"; value: number; minTotal?: number; usageLimit?: number; expiresAt?: string }) =>
    prisma.coupon.create({ data: { ...data, code: data.code.toUpperCase(), expiresAt: data.expiresAt ? new Date(data.expiresAt) : null } }),
  update: (id: string, data: Record<string, unknown>) => prisma.coupon.update({ where: { id }, data }),
  async remove(id: string) { await prisma.coupon.delete({ where: { id } }); },
};
