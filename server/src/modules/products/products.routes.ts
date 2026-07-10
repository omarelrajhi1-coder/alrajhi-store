import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly } from "../../middleware/auth";
import { productsController } from "./products.controller";
import { productCreateSchema, productUpdateSchema } from "./products.schema";

const router = Router();
// Public
router.get("/", asyncHandler(productsController.list));
router.get("/:slug", asyncHandler(productsController.getBySlug));
// Admin
router.post("/", authRequired, adminOnly, validate(productCreateSchema), asyncHandler(productsController.create));
router.put("/:id", authRequired, adminOnly, validate(productUpdateSchema), asyncHandler(productsController.update));
router.delete("/:id", authRequired, adminOnly, asyncHandler(productsController.remove));
export default router;
