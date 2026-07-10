import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired } from "../../middleware/auth";
import { ok } from "../../utils/http";
import { wishlistService } from "./wishlist.service";

const toggleSchema = z.object({ productId: z.string().min(1) });
const router = Router();
router.use(authRequired);
router.get("/", asyncHandler(async (req, res) => ok(res, await wishlistService.list(req.user!.id))));
router.get("/ids", asyncHandler(async (req, res) => ok(res, await wishlistService.ids(req.user!.id))));
router.post("/toggle", validate(toggleSchema), asyncHandler(async (req, res) => ok(res, await wishlistService.toggle(req.user!.id, req.body.productId))));
export default router;
