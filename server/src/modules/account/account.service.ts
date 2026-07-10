import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";
import { hashPassword, verifyPassword } from "../../utils/password";

export const accountService = {
  async updateProfile(userId: string, data: { name?: string; phone?: string; avatar?: string }) {
    const u = await prisma.user.update({ where: { id: userId }, data });
    return { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role, avatar: u.avatar };
  },
  async changePassword(userId: string, current: string, next: string) {
    const u = await prisma.user.findUnique({ where: { id: userId } });
    if (!u || !(await verifyPassword(current, u.password))) throw AppError.badRequest("كلمة المرور الحالية غير صحيحة");
    await prisma.user.update({ where: { id: userId }, data: { password: await hashPassword(next) } });
    await prisma.refreshToken.updateMany({ where: { userId, revokedAt: null }, data: { revokedAt: new Date() } });
  },

  // Addresses
  listAddresses: (userId: string) => prisma.address.findMany({ where: { userId }, orderBy: { isDefault: "desc" } }),
  async addAddress(userId: string, data: { fullName: string; phone: string; city: string; line: string; isDefault?: boolean }) {
    if (data.isDefault) await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    return prisma.address.create({ data: { ...data, userId } });
  },
  async updateAddress(userId: string, id: string, data: Partial<{ fullName: string; phone: string; city: string; line: string; isDefault: boolean }>) {
    const addr = await prisma.address.findUnique({ where: { id } });
    if (!addr || addr.userId !== userId) throw AppError.notFound("العنوان غير موجود");
    if (data.isDefault) await prisma.address.updateMany({ where: { userId }, data: { isDefault: false } });
    return prisma.address.update({ where: { id }, data });
  },
  async removeAddress(userId: string, id: string) {
    const addr = await prisma.address.findUnique({ where: { id } });
    if (!addr || addr.userId !== userId) throw AppError.notFound("العنوان غير موجود");
    await prisma.address.delete({ where: { id } });
  },
};
