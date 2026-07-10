import { prisma } from "../../prisma";
import { AppError } from "../../utils/AppError";

async function recomputeProductRating(productId: string) {
  const agg = await prisma.review.aggregate({
    where: { productId, status: "APPROVED" }, _avg: { rating: true }, _count: true,
  });
  await prisma.product.update({
    where: { id: productId },
    data: { rating: Math.round((agg._avg.rating ?? 0) * 10) / 10, reviewsCount: agg._count },
  });
}

export const reviewsService = {
  listForProduct: (productId: string) =>
    prisma.review.findMany({ where: { productId, status: "APPROVED" }, orderBy: { createdAt: "desc" } }),

  async create(productId: string, data: { author: string; rating: number; text: string }, userId?: string) {
    const product = await prisma.product.findFirst({ where: { id: productId, deletedAt: null } });
    if (!product) throw AppError.notFound("المنتج غير موجود");
    const review = await prisma.review.create({ data: { productId, userId, author: data.author, rating: data.rating, text: data.text } });
    return review; // PENDING until moderated
  },

  // Admin
  async listAll(opts: { skip: number; limit: number; status?: string }) {
    const where = opts.status && opts.status !== "ALL" ? { status: opts.status as "PENDING" | "APPROVED" | "REJECTED" } : {};
    const [items, total] = await Promise.all([
      prisma.review.findMany({ where, orderBy: { createdAt: "desc" }, skip: opts.skip, take: opts.limit, include: { product: { select: { name: true, slug: true } } } }),
      prisma.review.count({ where }),
    ]);
    return { items, total };
  },
  async setStatus(id: string, status: "APPROVED" | "REJECTED" | "PENDING") {
    const review = await prisma.review.update({ where: { id }, data: { status } });
    await recomputeProductRating(review.productId);
    return review;
  },
  async remove(id: string) {
    const review = await prisma.review.delete({ where: { id } });
    await recomputeProductRating(review.productId);
  },
};
