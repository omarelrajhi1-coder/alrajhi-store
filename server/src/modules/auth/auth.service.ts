import jwt from "jsonwebtoken";
import { prisma } from "../../prisma";
import { env } from "../../env";
import { AppError } from "../../utils/AppError";
import { hashPassword, verifyPassword } from "../../utils/password";
import { randomToken, sha256 } from "../../utils/tokens";
import { signAccessToken, AccessPayload } from "./token.service";
import type { RegisterDto, LoginDto } from "./auth.schema";

const REFRESH_TTL_MS = 7 * 24 * 60 * 60 * 1000;

export interface SessionContext { userAgent?: string; ip?: string; }
export interface PublicUser { id: string; name: string; email: string; phone: string | null; role: AccessPayload["role"]; avatar: string | null; }
export interface AuthResult { user: PublicUser; accessToken: string; refreshToken: string; }

function toPublic(u: { id: string; name: string; email: string; phone: string | null; role: string; avatar: string | null }): PublicUser {
  return { id: u.id, name: u.name, email: u.email, phone: u.phone, role: u.role as AccessPayload["role"], avatar: u.avatar };
}

async function issueRefreshToken(userId: string, ctx: SessionContext): Promise<string> {
  const raw = randomToken();
  await prisma.refreshToken.create({
    data: { userId, tokenHash: sha256(raw), userAgent: ctx.userAgent, ip: ctx.ip, expiresAt: new Date(Date.now() + REFRESH_TTL_MS) },
  });
  return raw;
}

export const authService = {
  async register(dto: RegisterDto, ctx: SessionContext): Promise<AuthResult> {
    const exists = await prisma.user.findUnique({ where: { email: dto.email } });
    if (exists) throw AppError.conflict("البريد مستخدم بالفعل");
    const user = await prisma.user.create({
      data: { name: dto.name, email: dto.email, phone: dto.phone, password: await hashPassword(dto.password) },
    });
    return this.buildResult(user, ctx);
  },

  async login(dto: LoginDto, ctx: SessionContext): Promise<AuthResult> {
    const user = await prisma.user.findUnique({ where: { email: dto.email } });
    if (!user || user.deletedAt || !user.isActive) throw AppError.unauthorized("بيانات الدخول غير صحيحة");
    if (!(await verifyPassword(dto.password, user.password))) throw AppError.unauthorized("بيانات الدخول غير صحيحة");
    await prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return this.buildResult(user, ctx);
  },

  async buildResult(user: { id: string; name: string; email: string; phone: string | null; role: string; avatar: string | null }, ctx: SessionContext): Promise<AuthResult> {
    const accessToken = signAccessToken({ id: user.id, role: user.role as AccessPayload["role"] });
    const refreshToken = await issueRefreshToken(user.id, ctx);
    return { user: toPublic(user), accessToken, refreshToken };
  },

  /** Rotates the refresh token: revoke the presented one, issue a fresh pair. */
  async refresh(rawRefresh: string | undefined, ctx: SessionContext): Promise<AuthResult> {
    if (!rawRefresh) throw AppError.unauthorized("لا توجد جلسة");
    const record = await prisma.refreshToken.findUnique({ where: { tokenHash: sha256(rawRefresh) } });
    if (!record || record.revokedAt || record.expiresAt < new Date()) throw AppError.unauthorized("جلسة منتهية");
    await prisma.refreshToken.update({ where: { id: record.id }, data: { revokedAt: new Date() } });
    const user = await prisma.user.findUnique({ where: { id: record.userId } });
    if (!user || user.deletedAt || !user.isActive) throw AppError.unauthorized();
    return this.buildResult(user, ctx);
  },

  async logout(rawRefresh: string | undefined): Promise<void> {
    if (!rawRefresh) return;
    await prisma.refreshToken.updateMany({ where: { tokenHash: sha256(rawRefresh), revokedAt: null }, data: { revokedAt: new Date() } });
  },

  async me(userId: string): Promise<PublicUser> {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) throw AppError.notFound("المستخدم غير موجود");
    return toPublic(user);
  },

  /** Returns a short-lived reset token. In production this is emailed, not returned. */
  async forgotPassword(email: string): Promise<string | null> {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null; // do not reveal account existence
    return jwt.sign({ id: user.id, purpose: "reset" }, env.jwtSecret, { expiresIn: "30m" });
  },

  async resetPassword(token: string, newPassword: string): Promise<void> {
    let payload: { id: string; purpose: string };
    try { payload = jwt.verify(token, env.jwtSecret) as { id: string; purpose: string }; }
    catch { throw AppError.badRequest("رمز غير صالح أو منتهي"); }
    if (payload.purpose !== "reset") throw AppError.badRequest("رمز غير صالح");
    await prisma.user.update({ where: { id: payload.id }, data: { password: await hashPassword(newPassword) } });
    // invalidate all sessions after a password change
    await prisma.refreshToken.updateMany({ where: { userId: payload.id, revokedAt: null }, data: { revokedAt: new Date() } });
  },
};
