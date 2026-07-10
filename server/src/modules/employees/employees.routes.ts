import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, requireRole } from "../../middleware/auth";
import { ok, created, noContent } from "../../utils/http";
import { employeesService } from "./employees.service";

const empSchema = z.object({ name: z.string().min(2), email: z.string().email(), password: z.string().min(6), title: z.string().optional(), roleId: z.string().optional() });
const roleSchema = z.object({ name: z.string().min(2), description: z.string().optional(), permissionKeys: z.array(z.string()).default([]) });
const permsSchema = z.object({ permissionKeys: z.array(z.string()) });

const router = Router();
router.use(authRequired, requireRole("ADMIN"));
router.get("/", asyncHandler(async (_req, res) => ok(res, await employeesService.list())));
router.post("/", validate(empSchema), asyncHandler(async (req, res) => created(res, await employeesService.create(req.body))));
router.patch("/:id/active", asyncHandler(async (req, res) => ok(res, await employeesService.setActive(req.params.id, req.body.isActive))));
router.delete("/:id", asyncHandler(async (req, res) => { await employeesService.remove(req.params.id); return noContent(res); }));
// roles & permissions
router.get("/roles/list", asyncHandler(async (_req, res) => ok(res, await employeesService.listRoles())));
router.get("/permissions/list", asyncHandler(async (_req, res) => ok(res, await employeesService.listPermissions())));
router.post("/roles", validate(roleSchema), asyncHandler(async (req, res) => created(res, await employeesService.createRole(req.body.name, req.body.description, req.body.permissionKeys))));
router.put("/roles/:id/permissions", validate(permsSchema), asyncHandler(async (req, res) => ok(res, await employeesService.setRolePermissions(req.params.id, req.body.permissionKeys))));
export default router;
