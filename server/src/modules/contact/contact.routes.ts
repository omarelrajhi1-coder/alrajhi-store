import { Router } from "express";
import { z } from "zod";
import { asyncHandler } from "../../utils/asyncHandler";
import { validate } from "../../middleware/validate";
import { authRequired, adminOnly } from "../../middleware/auth";
import { ok, created, noContent, paginated } from "../../utils/http";
import { parseQuery, pageMeta } from "../../utils/pagination";
import { contactService } from "./contact.service";

const createSchema = z.object({
  name: z.string().min(2), phone: z.string().min(6),
  email: z.string().email().optional().or(z.literal("")),
  message: z.string().min(3),
});

const router = Router();

// Public: submit the contact form.
router.post("/", validate(createSchema), asyncHandler(async (req, res) => {
  const { name, phone, email, message } = req.body;
  return created(res, await contactService.create({ name, phone, email: email || undefined, message }));
}));

// Admin
router.get("/", authRequired, adminOnly, asyncHandler(async (req, res) => {
  const { page, limit, skip } = parseQuery(req);
  const { items, total } = await contactService.listAll({ skip, limit, unreadOnly: req.query.unread === "1" });
  return paginated(res, items, pageMeta(total, page, limit));
}));
router.get("/unread-count", authRequired, adminOnly, asyncHandler(async (req, res) => ok(res, { count: await contactService.unreadCount() })));
router.patch("/:id/read", authRequired, adminOnly, asyncHandler(async (req, res) => ok(res, await contactService.markRead(req.params.id))));
router.delete("/:id", authRequired, adminOnly, asyncHandler(async (req, res) => { await contactService.remove(req.params.id); return noContent(res); }));

export default router;
