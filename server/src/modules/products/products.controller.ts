import { Request, Response } from "express";
import { productsService } from "./products.service";
import { ProductFilter } from "./products.repository";
import { ok, created, noContent, paginated } from "../../utils/http";
import { parseQuery, pageMeta } from "../../utils/pagination";

function filterFromQuery(req: Request): ProductFilter {
  const q = req.query;
  return {
    categorySlug: q.category as string | undefined,
    brandId: q.brand as string | undefined,
    q: (q.q as string)?.trim() || undefined,
    inStock: q.inStock === "true",
    minRating: q.minRating ? Number(q.minRating) : undefined,
    minPrice: q.minPrice ? Number(q.minPrice) : undefined,
    maxPrice: q.maxPrice ? Number(q.maxPrice) : undefined,
    featured: q.featured === "true",
    bestseller: q.bestseller === "true",
    isNew: q.isNew === "true",
  };
}

export const productsController = {
  async list(req: Request, res: Response) {
    const { page, limit, skip, sort } = parseQuery(req, { defaultSort: "featured" });
    const { items, total } = await productsService.list(filterFromQuery(req), { skip, limit, sort, page });
    return paginated(res, items, pageMeta(total, page, limit));
  },
  async getBySlug(req: Request, res: Response) {
    return ok(res, await productsService.getBySlug(req.params.slug));
  },
  async create(req: Request, res: Response) {
    return created(res, await productsService.create(req.body));
  },
  async update(req: Request, res: Response) {
    return ok(res, await productsService.update(req.params.id, req.body));
  },
  async remove(req: Request, res: Response) {
    await productsService.remove(req.params.id);
    return noContent(res);
  },
};
