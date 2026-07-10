import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired } from "../../middleware/auth";
import { authController } from "./auth.controller";
import { registerSchema, loginSchema, forgotSchema, resetSchema } from "./auth.schema";

const router = Router();
router.post("/register", validate(registerSchema), asyncHandler(authController.register));
router.post("/login", validate(loginSchema), asyncHandler(authController.login));
router.post("/refresh", asyncHandler(authController.refresh));
router.post("/logout", asyncHandler(authController.logout));
router.get("/me", authRequired, asyncHandler(authController.me));
router.post("/forgot-password", validate(forgotSchema), asyncHandler(authController.forgot));
router.post("/reset-password", validate(resetSchema), asyncHandler(authController.reset));
export default router;
