import { prisma } from "../../prisma";

export const dashboardService = {
  async overview() {
    const [totalOrders, newOrders, shipping, delivered, customers, products, revenueAgg, lowStock] = await Promise.all([
      prisma.order.count(),
      prisma.order.count({ where: { status: "NEW" } }),
      prisma.order.count({ where: { status: "SHIPPING" } }),
      prisma.order.count({ where: { status: "DELIVERED" } }),
      prisma.user.count({ where: { role: "CUSTOMER", deletedAt: null } }),
      prisma.product.count({ where: { deletedAt: null } }),
      prisma.order.aggregate({ _sum: { total: true }, where: { status: "DELIVERED" } }),
      prisma.inventory.count({ where: { quantity: { lte: prisma.inventory.fields.lowStockAt } } }),
    ]);
    return { revenue: revenueAgg._sum.total ?? 0, totalOrders, newOrders, shipping, delivered, customers, products, lowStock };
  },

  recentOrders: () => prisma.order.findMany({ orderBy: { createdAt: "desc" }, take: 8, include: { items: true } }),

  topProducts: async () => {
    const grouped = await prisma.orderItem.groupBy({ by: ["productId"], _sum: { quantity: true }, orderBy: { _sum: { quantity: "desc" } }, take: 5 });
    const products = await prisma.product.findMany({ where: { id: { in: grouped.map((g) => g.productId) } }, include: { images: { take: 1, orderBy: { order: "asc" } } } });
    return grouped.map((g) => {
      const p = products.find((x) => x.id === g.productId);
      return { id: g.productId, name: p?.name ?? "", price: p?.price ?? 0, image: p?.images[0]?.url ?? null, sold: g._sum.quantity ?? 0 };
    });
  },

  // last 6 months revenue
  salesByMonth: async () => {
    const since = new Date(); since.setMonth(since.getMonth() - 5); since.setDate(1);
    const orders = await prisma.order.findMany({ where: { createdAt: { gte: since }, status: "DELIVERED" }, select: { total: true, createdAt: true } });
    const months: { m: string; v: number }[] = [];
    for (let i = 5; i >= 0; i--) {
      const d = new Date(); d.setMonth(d.getMonth() - i);
      const label = d.toLocaleDateString("ar-LY", { month: "long" });
      const v = orders.filter((o) => o.createdAt.getMonth() === d.getMonth() && o.createdAt.getFullYear() === d.getFullYear()).reduce((s, o) => s + o.total, 0);
      months.push({ m: label, v: Math.round(v) });
    }
    return months;
  },
};
