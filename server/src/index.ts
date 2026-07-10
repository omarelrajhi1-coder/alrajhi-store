import path from "path";
import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import cookieParser from "cookie-parser";
import rateLimit from "express-rate-limit";
import { env } from "./env";
import { logger } from "./utils/logger";
import { ok } from "./utils/http";
import { requestLogger } from "./middleware/requestLogger";
import { notFound, errorHandler } from "./middleware/error";
import { apiRouter } from "./routes";

const app = express();
app.set("trust proxy", 1);

// security & platform
app.use(helmet({ crossOriginResourcePolicy: { policy: "cross-origin" } }));
app.use(compression());
app.use(cors({ origin: env.clientOrigin, credentials: true }));
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

// static (local uploads in development)
app.use("/uploads", express.static(path.resolve(process.cwd(), env.uploadDir)));

// rate limiting (stricter for auth)
const apiLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 300, standardHeaders: true, legacyHeaders: false });
const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 60, standardHeaders: true, legacyHeaders: false });
app.use("/api", apiLimiter);
app.use("/api/auth/login", authLimiter);
app.use("/api/auth/register", authLimiter);
app.use("/api/auth/forgot-password", authLimiter);
app.use("/api/auth/reset-password", authLimiter);

// routes
app.get("/api/health", (_req, res) => ok(res, { status: "ok", time: new Date().toISOString() }));
app.use("/api", apiRouter);

// 404 + centralized error handling
app.use(notFound);
app.use(errorHandler);

const server = app.listen(env.port, () => logger.info(`✓ ALRAJHI API on http://localhost:${env.port} [${env.nodeEnv}]`));
for (const sig of ["SIGINT", "SIGTERM"] as const) {
  process.on(sig, () => { logger.info(`${sig} received, shutting down`); server.close(() => process.exit(0)); });
}
export default app;
