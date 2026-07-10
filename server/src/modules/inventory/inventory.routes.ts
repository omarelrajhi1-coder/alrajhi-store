import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly } from "../../middleware/auth";
import { ok, paginated } from "../../utils/http";
import { parseQuery, pageMeta } from "../../utils/pagination";
import { inventoryService } from "./inventory.service";

const setSchema = z.object({ productId: z.string().min(1), quantity: z.number().int().nonnegative(), lowStockAt: z.number().int().nonnegative().optional() });
const adjustSchema = z.object({ productId: z.string().min(1), delta: z.number().int() });

const router = Router();
router.use(authRequired, adminOnly);
router.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip } = parseQuery(req);
  const { items, total } = await inventoryService.list({ skip, limit, lowOnly: req.query.low === "true" });
  return paginated(res, items, pageMeta(total, page, limit));
}));
router.get("/low-stock", asyncHandler(async (_req, res) => ok(res, await inventoryService.lowStock())));
router.post("/set", validate(setSchema), asyncHandler(async (req, res) => ok(res, await inventoryService.setQuantity(req.body.productId, req.body.quantity, req.body.lowStockAt))));
router.post("/adjust", validate(adjustSchema), asyncHandler(async (req, res) => ok(res, await inventoryService.adjust(req.body.productId, req.body.delta))));
export default router;
