import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired } from "../../middleware/auth";
import { ok } from "../../utils/http";
import { cartService } from "./cart.service";

const addSchema = z.object({ productId: z.string().min(1), qty: z.number().int().positive().default(1) });
const qtySchema = z.object({ productId: z.string().min(1), qty: z.number().int() });
const mergeSchema = z.object({ items: z.array(z.object({ productId: z.string(), qty: z.number().int().positive() })) });

const router = Router();
router.use(authRequired);
router.get("/", asyncHandler(async (req, res) => ok(res, await cartService.get(req.user!.id))));
router.post("/items", validate(addSchema), asyncHandler(async (req, res) => ok(res, await cartService.add(req.user!.id, req.body.productId, req.body.qty))));
router.patch("/items", validate(qtySchema), asyncHandler(async (req, res) => ok(res, await cartService.setQty(req.user!.id, req.body.productId, req.body.qty))));
router.delete("/items/:productId", asyncHandler(async (req, res) => ok(res, await cartService.remove(req.user!.id, req.params.productId))));
router.delete("/", asyncHandler(async (req, res) => ok(res, await cartService.clear(req.user!.id))));
router.post("/merge", validate(mergeSchema), asyncHandler(async (req, res) => ok(res, await cartService.merge(req.user!.id, req.body.items))));
export default router;
