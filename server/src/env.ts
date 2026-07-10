import "dotenv/config";
import { z } from "zod";

/**
 * Centralised, validated environment configuration.
 * In production, missing critical secrets throw at boot (fail-fast).
 * In development, safe defaults keep the DX smooth.
 */
const isProd = process.env.NODE_ENV === "production";

const schema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  DATABASE_URL: z.string().min(1).optional(),
  JWT_SECRET: z.string().min(16).default("dev-access-secret-change-me-please"),
  JWT_REFRESH_SECRET: z.string().min(16).default("dev-refresh-secret-change-me-please"),
  ACCESS_TOKEN_TTL: z.string().default("15m"),
  REFRESH_TOKEN_TTL: z.string().default("7d"),
  CLIENT_ORIGIN: z.string().default("http://localhost:3000"),
  // File upload / Cloudinary (used by a later feature)
  CLOUDINARY_CLOUD_NAME: z.string().optional(),
  CLOUDINARY_API_KEY: z.string().optional(),
  CLOUDINARY_API_SECRET: z.string().optional(),
  UPLOAD_DIR: z.string().default("uploads"),
});

const parsed = schema.safeParse(process.env);
if (!parsed.success) {
  // eslint-disable-next-line no-console
  console.error("✖ Invalid environment variables:", parsed.error.flatten().fieldErrors);
  process.exit(1);
}
const e = parsed.data;

if (isProd) {
  for (const key of ["DATABASE_URL", "JWT_SECRET", "JWT_REFRESH_SECRET"] as const) {
    const v = e[key];
    if (!v || v.startsWith("dev-")) {
      // eslint-disable-next-line no-console
      console.error(`✖ ${key} must be set to a strong value in production.`);
      process.exit(1);
    }
  }
}

export const env = {
  nodeEnv: e.NODE_ENV,
  isProd,
  isDev: e.NODE_ENV === "development",
  port: e.PORT,
  databaseUrl: e.DATABASE_URL,
  jwtSecret: e.JWT_SECRET,
  jwtRefreshSecret: e.JWT_REFRESH_SECRET,
  accessTokenTtl: e.ACCESS_TOKEN_TTL,
  refreshTokenTtl: e.REFRESH_TOKEN_TTL,
  clientOrigin: e.CLIENT_ORIGIN,
  cloudinary: {
    cloudName: e.CLOUDINARY_CLOUD_NAME,
    apiKey: e.CLOUDINARY_API_KEY,
    apiSecret: e.CLOUDINARY_API_SECRET,
    enabled: Boolean(e.CLOUDINARY_CLOUD_NAME && e.CLOUDINARY_API_KEY && e.CLOUDINARY_API_SECRET),
  },
  uploadDir: e.UPLOAD_DIR,
} as const;

export type Env = typeof env;
