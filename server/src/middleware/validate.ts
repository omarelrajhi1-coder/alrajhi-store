import { Request, Response, NextFunction } from "express";
import { ZodSchema } from "zod";
import { AppError } from "../utils/AppError";

type Source = "body" | "query" | "params";

/**
 * Validates and (in the case of body) replaces req[source] with the parsed,
 * type-safe value. Throws AppError(400) with field details on failure.
 */
export const validate =
  (schema: ZodSchema, source: Source = "body") =>
  (req: Request, _res: Response, next: NextFunction) => {
    const value = req[source] as unknown;
    const result = schema.safeParse(value);
    if (!result.success) {
      return next(AppError.badRequest("بيانات غير صالحة", result.error.flatten().fieldErrors));
    }
    if (source === "body") req.body = result.data;
    else (req as unknown as Record<string, unknown>)[`valid_${source}`] = result.data;
    next();
  };
