import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly, optionalAuth } from "../../middleware/auth";
import { ok, created, noContent, paginated } from "../../utils/http";
import { parseQuery, pageMeta } from "../../utils/pagination";
import { reviewsService } from "./reviews.service";

const createSchema = z.object({ author: z.string().min(2), rating: z.number().int().min(1).max(5), text: z.string().min(2) });
const statusSchema = z.object({ status: z.enum(["APPROVED", "REJECTED", "PENDING"]) });

const router = Router();
router.get("/product/:productId", asyncHandler(async (req, res) => ok(res, await reviewsService.listForProduct(req.params.productId))));
router.post("/product/:productId", optionalAuth, validate(createSchema), asyncHandler(async (req, res) => created(res, await reviewsService.create(req.params.productId, req.body, req.user?.id))));
// Admin moderation
router.get("/", authRequired, adminOnly, asyncHandler(async (req, res) => {
  const { page, limit, skip } = parseQuery(req);
  const { items, total } = await reviewsService.listAll({ skip, limit, status: req.query.status as string });
  return paginated(res, items, pageMeta(total, page, limit));
}));
router.patch("/:id/status", authRequired, adminOnly, validate(statusSchema), asyncHandler(async (req, res) => ok(res, await reviewsService.setStatus(req.params.id, req.body.status))));
router.delete("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => { await reviewsService.remove(req.params.id); return noContent(res); }));
export default router;
