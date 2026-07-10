import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authRequired } from "../../middleware/auth";
import { ok } from "../../utils/http";
import { notificationsService } from "./notifications.service";

const router = Router();
router.use(authRequired);
router.get("/", asyncHandler(async (req, res) => ok(res, await notificationsService.listMine(req.user!.id))));
router.get("/unread-count", asyncHandler(async (req, res) => ok(res, { count: await notificationsService.unreadCount(req.user!.id) })));
router.patch("/:id/read", asyncHandler(async (req, res) => ok(res, await notificationsService.markRead(req.user!.id, req.params.id))));
router.patch("/read-all", asyncHandler(async (req, res) => ok(res, await notificationsService.markAllRead(req.user!.id))));
export default router;
