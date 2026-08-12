import { prisma } from "../../prisma";

export const analyticsService = {
  track: (data: { type: string; path?: string; userId?: string; value?: number; meta?: unknown }) =>
    prisma.analyticsEvent.create({ data: { type: data.type, path: data.path, userId: data.userId, value: data.value, meta: data.meta as object } }),

  async summary() {
    const since = new Date(); since.setDate(since.getDate() - 30);
    const [byType, totalRevenue, orders] = await Promise.all([
      prisma.analyticsEvent.groupBy({ by: ["type"], _count: true, where: { createdAt: { gte: since } } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: "DELIVERED", createdAt: { gte: since } } }),
      prisma.order.count({ where: { createdAt: { gte: since } } }),
    ]);
    return { last30Days: { events: byType, revenue: totalRevenue._sum.total ?? 0, orders } };
  },
};
