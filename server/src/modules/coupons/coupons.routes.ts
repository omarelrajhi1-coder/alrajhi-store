import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly } from "../../middleware/auth";
import { ok, created, noContent } from "../../utils/http";
import { couponsService } from "./coupons.service";

const validateSchema = z.object({ code: z.string().min(1), subtotal: z.number().nonnegative() });
const createSchema = z.object({
  code: z.string().min(1), type: z.enum(["PERCENT", "FIXED"]).optional(), value: z.number().positive(),
  minTotal: z.number().nonnegative().optional(), usageLimit: z.number().int().positive().optional(), expiresAt: z.string().optional(),
});

const router = Router();
router.post("/validate", validate(validateSchema), asyncHandler(async (req, res) => ok(res, await couponsService.validateForTotal(req.body.code, req.body.subtotal))));
router.get("/", authRequired, adminOnly, asyncHandler(async (_req, res) => ok(res, await couponsService.list())));
router.post("/", authRequired, adminOnly, validate(createSchema), asyncHandler(async (req, res) => created(res, await couponsService.create(req.body))));
router.put("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => ok(res, await couponsService.update(req.params.id, req.body))));
router.delete("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => { await couponsService.remove(req.params.id); return noContent(res); }));
export default router;
