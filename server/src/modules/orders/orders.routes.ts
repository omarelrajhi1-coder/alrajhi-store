import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly, optionalAuth } from "../../middleware/auth";
import { ok, created, paginated } from "../../utils/http";
import { parseQuery, pageMeta } from "../../utils/pagination";
import { ordersService } from "./orders.service";
import { createOrderSchema, updateStatusSchema } from "./orders.schema";

const router = Router();

// Place an order (guest allowed; links to user if logged in).
router.post("/", optionalAuth, validate(createOrderSchema), asyncHandler(async (req, res) => created(res, await ordersService.create(req.body, req.user?.id))));

// Customer's own orders
router.get("/mine", authRequired, asyncHandler(async (req, res) => ok(res, await ordersService.listMine(req.user!.id))));
router.get("/mine/:id", authRequired, asyncHandler(async (req, res) => ok(res, await ordersService.getMine(req.user!.id, req.params.id))));

// Admin
router.get("/", authRequired, adminOnly, asyncHandler(async (req, res) => {
  const { page, limit, skip } = parseQuery(req);
  const { items, total } = await ordersService.listAdmin({ skip, limit, status: req.query.status as string, q: req.query.q as string });
  return paginated(res, items, pageMeta(total, page, limit));
}));
router.get("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => ok(res, await ordersService.getById(req.params.id))));
router.patch("/:id/status", authRequired, adminOnly, validate(updateStatusSchema), asyncHandler(async (req, res) => ok(res, await ordersService.updateStatus(req.params.id, req.body.status))));
export default router;
