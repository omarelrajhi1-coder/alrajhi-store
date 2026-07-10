import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, requireRole } from "../../middleware/auth";
import { ok, noContent, paginated } from "../../utils/http";
import { parseQuery, pageMeta } from "../../utils/pagination";
import { usersService } from "./users.service";

const roleSchema = z.object({ role: z.enum(["CUSTOMER", "ADMIN", "STAFF"]) });
const activeSchema = z.object({ isActive: z.boolean() });

const router = Router();
router.use(authRequired, requireRole("ADMIN", "STAFF"));
router.get("/", asyncHandler(async (req, res) => {
  const { page, limit, skip } = parseQuery(req);
  const { items, total } = await usersService.list({ skip, limit, q: req.query.q as string, role: req.query.role as string });
  return paginated(res, items, pageMeta(total, page, limit));
}));
router.get("/:id", asyncHandler(async (req, res) => ok(res, await usersService.getById(req.params.id))));
router.patch("/:id/active", validate(activeSchema), asyncHandler(async (req, res) => ok(res, await usersService.setActive(req.params.id, req.body.isActive))));
router.patch("/:id/role", requireRole("ADMIN"), validate(roleSchema), asyncHandler(async (req, res) => ok(res, await usersService.setRole(req.params.id, req.body.role))));
router.delete("/:id", requireRole("ADMIN"), asyncHandler(async (req, res) => { await usersService.softDelete(req.params.id); return noContent(res); }));
export default router;
