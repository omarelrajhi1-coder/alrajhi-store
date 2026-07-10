import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly, optionalAuth } from "../../middleware/auth";
import { ok, created } from "../../utils/http";
import { analyticsService } from "./analytics.service";

const trackSchema = z.object({ type: z.string().min(1), path: z.string().optional(), value: z.number().optional(), meta: z.unknown().optional() });
const router = Router();
router.post("/track", optionalAuth, validate(trackSchema), asyncHandler(async (req, res) => created(res, await analyticsService.track({ ...req.body, userId: req.user?.id }))));
router.get("/summary", authRequired, adminOnly, asyncHandler(async (_req, res) => ok(res, await analyticsService.summary())));
export default router;
