import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly } from "../../middleware/auth";
import { ok, created, noContent } from "../../utils/http";
import { categoriesService } from "./categories.service";
import { brandsService } from "./brands.service";
import { categoryCreateSchema, categoryUpdateSchema, brandCreateSchema, brandUpdateSchema } from "./catalog.schema";

export const categoriesRouter = Router();
categoriesRouter.get("/", asyncHandler(async (_req, res) => ok(res, await categoriesService.list())));
categoriesRouter.post("/", authRequired, adminOnly, validate(categoryCreateSchema), asyncHandler(async (req, res) => created(res, await categoriesService.create(req.body))));
categoriesRouter.put("/:id", authRequired, adminOnly, validate(categoryUpdateSchema), asyncHandler(async (req, res) => ok(res, await categoriesService.update(req.params.id, req.body))));
categoriesRouter.delete("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => { await categoriesService.remove(req.params.id); return noContent(res); }));

export const brandsRouter = Router();
brandsRouter.get("/", asyncHandler(async (_req, res) => ok(res, await brandsService.list())));
brandsRouter.post("/", authRequired, adminOnly, validate(brandCreateSchema), asyncHandler(async (req, res) => created(res, await brandsService.create(req.body))));
brandsRouter.put("/:id", authRequired, adminOnly, validate(brandUpdateSchema), asyncHandler(async (req, res) => ok(res, await brandsService.update(req.params.id, req.body))));
brandsRouter.delete("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => { await brandsService.remove(req.params.id); return noContent(res); }));
