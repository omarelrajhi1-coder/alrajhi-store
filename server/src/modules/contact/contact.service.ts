import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

export const contactService = {
  create: (data: { name: string; phone: string; email?: string; message: string }) =>
    prisma.contactMessage.create({ data }),

  async listAll(opts: { skip: number; limit: number; unreadOnly?: boolean }) {
    const where = opts.unreadOnly ? { isRead: false } : {};
    const [items, total] = await Promise.all([
      prisma.contactMessage.findMany({ where, orderBy: { createdAt: "desc" }, skip: opts.skip, take: opts.limit }),
      prisma.contactMessage.count({ where }),
    ]);
    return { items, total };
  },

  unreadCount: () => prisma.contactMessage.count({ where: { isRead: false } }),

  async markRead(id: string) {
    const msg = await prisma.contactMessage.findUnique({ where: { id } });
    if (!msg) throw AppError.notFound("الرسالة غير موجودة");
    return prisma.contactMessage.update({ where: { id }, data: { isRead: true } });
  },

  async remove(id: string) {
    const msg = await prisma.contactMessage.findUnique({ where: { id } });
    if (!msg) throw AppError.notFound("الرسالة غير موجودة");
    await prisma.contactMessage.delete({ where: { id } });
  },
};
