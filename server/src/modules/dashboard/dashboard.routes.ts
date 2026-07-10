import { Router } from "express";
import { asyncHandler } from "../../utils/asyncHandler";
import { authRequired, adminOnly } from "../../middleware/auth";
import { ok } from "../../utils/http";
import { dashboardService } from "./dashboard.service";

const router = Router();
router.use(authRequired, adminOnly);
router.get("/overview", asyncHandler(async (_req, res) => ok(res, await dashboardService.overview())));
router.get("/recent-orders", asyncHandler(async (_req, res) => ok(res, await dashboardService.recentOrders())));
router.get("/top-products", asyncHandler(async (_req, res) => ok(res, await dashboardService.topProducts())));
router.get("/sales-by-month", asyncHandler(async (_req, res) => ok(res, await dashboardService.salesByMonth())));
export default router;
