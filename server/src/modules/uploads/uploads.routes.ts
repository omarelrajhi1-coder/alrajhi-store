import { Router } from "express";
import multer from "multer";
import { asyncHandler } from "../../utils/asyncHandler";
import { authRequired, adminOnly } from "../../middleware/auth";
import { AppError } from "../../utils/AppError";
import { created } from "../../utils/http";
import { uploadsService } from "./uploads.service";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (_req, file, cb) => {
    if (/^image\/(png|jpe?g|webp|gif|avif)$/.test(file.mimetype)) cb(null, true);
    else cb(new Error("نوع الملف غير مدعوم"));
  },
});

const router = Router();
router.post("/image", authRequired, adminOnly, upload.single("file"), asyncHandler(async (req, res) => {
  if (!req.file) throw AppError.badRequest("لم يتم إرفاق ملف");
  const result = await uploadsService.store(req.file);
  // Local uploads are served by this API; return an absolute URL so the frontend can load them.
  const url = result.url.startsWith("/") ? `${req.protocol}://${req.get("host")}${result.url}` : result.url;
  return created(res, { url });
}));
export default router;
