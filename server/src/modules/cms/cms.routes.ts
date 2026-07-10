import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly } from "../../middleware/auth";
import { ok, created, noContent } from "../../utils/http";
import { cmsService } from "./cms.service";

const bannerSchema = z.object({ title: z.string().min(1), subtitle: z.string().optional(), image: z.string().min(1), href: z.string().optional(), order: z.number().int().optional() });
const sectionSchema = z.object({ key: z.string().min(1), title: z.string().optional(), subtitle: z.string().optional(), order: z.number().int().optional(), isActive: z.boolean().optional(), config: z.unknown().optional() });
const settingSchema = z.object({ key: z.string().min(1), value: z.unknown() });

const router = Router();
// Public reads
router.get("/banners", asyncHandler(async (_req, res) => ok(res, await cmsService.listBanners(true))));
router.get("/sections", asyncHandler(async (_req, res) => ok(res, await cmsService.listSections())));
router.get("/settings", asyncHandler(async (_req, res) => ok(res, await cmsService.getSettings())));
// Admin writes
router.use(authRequired, adminOnly);
router.get("/banners/all", asyncHandler(async (_req, res) => ok(res, await cmsService.listBanners(false))));
router.post("/banners", validate(bannerSchema), asyncHandler(async (req, res) => created(res, await cmsService.createBanner(req.body))));
router.put("/banners/:id", asyncHandler(async (req, res) => ok(res, await cmsService.updateBanner(req.params.id, req.body))));
router.delete("/banners/:id", asyncHandler(async (req, res) => { await cmsService.removeBanner(req.params.id); return noContent(res); }));
router.put("/sections", validate(sectionSchema), asyncHandler(async (req, res) => ok(res, await cmsService.upsertSection(req.body.key, req.body))));
router.put("/settings", validate(settingSchema), asyncHandler(async (req, res) => ok(res, await cmsService.setSetting(req.body.key, req.body.value))));
export default router;
