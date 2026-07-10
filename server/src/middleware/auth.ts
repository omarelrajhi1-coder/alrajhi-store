import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/AppError";
import { verifyAccessToken, AccessPayload, ACCESS_COOKIE } from "../modules/auth/token.service";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express { interface Request { user?: AccessPayload } }
}

function extractToken(req: Request): string | undefined {
  return req.cookies?.[ACCESS_COOKIE] || req.headers.authorization?.replace("Bearer ", "");
}

/** Attaches req.user if a valid token exists; never throws. */
export function optionalAuth(req: Request, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (token) { try { req.user = verifyAccessToken(token); } catch { /* ignore */ } }
  next();
}

/** Requires a valid token. */
export function authRequired(req: Request, _res: Response, next: NextFunction) {
  const token = extractToken(req);
  if (!token) return next(AppError.unauthorized());
  try { req.user = verifyAccessToken(token); next(); }
  catch { next(AppError.unauthorized("جلسة غير صالحة")); }
}

/** Requires one of the given roles (defaults to ADMIN/STAFF for admin areas). */
export function requireRole(...roles: Array<AccessPayload["role"]>) {
  const allowed = roles.length ? roles : (["ADMIN", "STAFF"] as AccessPayload["role"][]);
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(AppError.unauthorized());
    if (!allowed.includes(req.user.role)) return next(AppError.forbidden());
    next();
  };
}

export const adminOnly = requireRole("ADMIN", "STAFF");
