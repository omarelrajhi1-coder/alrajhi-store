import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired } from "../../middleware/auth";
import { ok, created, noContent } from "../../utils/http";
import { accountService } from "./account.service";

const profileSchema = z.object({ name: z.string().min(2).optional(), phone: z.string().min(6).optional(), avatar: z.string().optional() });
const passwordSchema = z.object({ current: z.string().min(1), next: z.string().min(6) });
const addressSchema = z.object({ fullName: z.string().min(2), phone: z.string().min(6), city: z.string().min(1), line: z.string().min(3), isDefault: z.boolean().optional() });

const router = Router();
router.use(authRequired);
router.patch("/profile", validate(profileSchema), asyncHandler(async (req, res) => ok(res, await accountService.updateProfile(req.user!.id, req.body))));
router.post("/change-password", validate(passwordSchema), asyncHandler(async (req, res) => { await accountService.changePassword(req.user!.id, req.body.current, req.body.next); return ok(res, { changed: true }); }));
router.get("/addresses", asyncHandler(async (req, res) => ok(res, await accountService.listAddresses(req.user!.id))));
router.post("/addresses", validate(addressSchema), asyncHandler(async (req, res) => created(res, await accountService.addAddress(req.user!.id, req.body))));
router.put("/addresses/:id", validate(addressSchema.partial()), asyncHandler(async (req, res) => ok(res, await accountService.updateAddress(req.user!.id, req.params.id, req.body))));
router.delete("/addresses/:id", asyncHandler(async (req, res) => { await accountService.removeAddress(req.user!.id, req.params.id); return noContent(res); }));
export default router;
