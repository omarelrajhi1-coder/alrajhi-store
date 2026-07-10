import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/AppError";
import { logger } from "../utils/logger";
import { env } from "../env";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(AppError.notFound(`المسار غير موجود: ${req.method} ${req.originalUrl}`));
}

/* eslint-disable @typescript-eslint/no-unused-vars */
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction) {
  // Zod errors -> 400 with field details
  if (err instanceof ZodError) {
    return res.status(400).json({
      success: false,
      error: { code: "VALIDATION", message: "بيانات غير صالحة", details: err.flatten().fieldErrors },
    });
  }

  // Prisma unique-constraint -> 409 (duck-typed to avoid importing Prisma here)
  const anyErr = err as { code?: string; meta?: unknown };
  if (anyErr?.code === "P2002") {
    return res.status(409).json({ success: false, error: { code: "CONFLICT", message: "القيمة مستخدمة بالفعل", details: anyErr.meta } });
  }
  if (anyErr?.code === "P2025") {
    return res.status(404).json({ success: false, error: { code: "NOT_FOUND", message: "العنصر غير موجود" } });
  }

  if (err instanceof AppError) {
    return res.status(err.status).json({ success: false, error: { code: err.code, message: err.message, details: err.details } });
  }

  // Unexpected error: log full detail, return generic message
  logger.error("Unhandled error", { message: (err as Error)?.message, stack: env.isDev ? (err as Error)?.stack : undefined });
  return res.status(500).json({ success: false, error: { code: "INTERNAL", message: "خطأ في الخادم" } });
}
