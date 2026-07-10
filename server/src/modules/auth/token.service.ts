import jwt, { SignOptions } from "jsonwebtoken";
import { Response } from "express";
import { env } from "../../env";

export interface AccessPayload { id: string; role: "CUSTOMER" | "ADMIN" | "STAFF"; }

const ACCESS_COOKIE = "access_token";
const REFRESH_COOKIE = "refresh_token";

export function signAccessToken(payload: AccessPayload): string {
  return jwt.sign(payload, env.jwtSecret, { expiresIn: env.accessTokenTtl } as SignOptions);
}
export function verifyAccessToken(token: string): AccessPayload {
  return jwt.verify(token, env.jwtSecret) as AccessPayload;
}

function baseCookie() {
  return { httpOnly: true, secure: env.isProd, sameSite: "lax" as const, path: "/" };
}

export function setAuthCookies(res: Response, accessToken: string, refreshToken: string) {
  res.cookie(ACCESS_COOKIE, accessToken, { ...baseCookie(), maxAge: 15 * 60 * 1000 });
  res.cookie(REFRESH_COOKIE, refreshToken, { ...baseCookie(), maxAge: 7 * 24 * 60 * 60 * 1000 });
}
export function clearAuthCookies(res: Response) {
  res.clearCookie(ACCESS_COOKIE, baseCookie());
  res.clearCookie(REFRESH_COOKIE, baseCookie());
}
export { ACCESS_COOKIE, REFRESH_COOKIE };
