import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

export const notificationsService = {
  listMine: (userId: string) => prisma.notification.findMany({ where: { userId }, orderBy: { createdAt: "desc" }, take: 50 }),
  unreadCount: (userId: string) => prisma.notification.count({ where: { userId, isRead: false } }),
  async markRead(userId: string, id: string) {
    const n = await prisma.notification.findUnique({ where: { id } });
    if (!n || n.userId !== userId) throw AppError.notFound("الإشعار غير موجود");
    return prisma.notification.update({ where: { id }, data: { isRead: true } });
  },
  markAllRead: (userId: string) => prisma.notification.updateMany({ where: { userId, isRead: false }, data: { isRead: true } }),
};
