import { Request, Response } from "express";
import { authService, SessionContext } from "./auth.service";
import { setAuthCookies, clearAuthCookies, REFRESH_COOKIE } from "./token.service";
import { ok, created } from "../../utils/http";
import { env } from "../../env";

const ctxOf = (req: Request): SessionContext => ({ userAgent: req.headers["user-agent"], ip: req.ip });

export const authController = {
  async register(req: Request, res: Response) {
    const r = await authService.register(req.body, ctxOf(req));
    setAuthCookies(res, r.accessToken, r.refreshToken);
    return created(res, { user: r.user });
  },
  async login(req: Request, res: Response) {
    const r = await authService.login(req.body, ctxOf(req));
    setAuthCookies(res, r.accessToken, r.refreshToken);
    return ok(res, { user: r.user });
  },
  async refresh(req: Request, res: Response) {
    const r = await authService.refresh(req.cookies?.[REFRESH_COOKIE], ctxOf(req));
    setAuthCookies(res, r.accessToken, r.refreshToken);
    return ok(res, { user: r.user });
  },
  async logout(req: Request, res: Response) {
    await authService.logout(req.cookies?.[REFRESH_COOKIE]);
    clearAuthCookies(res);
    return ok(res, { loggedOut: true });
  },
  async me(req: Request, res: Response) {
    return ok(res, { user: await authService.me(req.user!.id) });
  },
  async forgot(req: Request, res: Response) {
    const token = await authService.forgotPassword(req.body.email);
    // Always 200 to avoid account enumeration; expose token only in dev.
    return ok(res, { sent: true, ...(env.isDev && token ? { devResetToken: token } : {}) });
  },
  async reset(req: Request, res: Response) {
    await authService.resetPassword(req.body.token, req.body.password);
    return ok(res, { reset: true });
  },
};
