import { env } from "../env";

type Level = "debug" | "info" | "warn" | "error";
const order: Record<Level, number> = { debug: 10, info: 20, warn: 30, error: 40 };
const threshold = env.isProd ? order.info : order.debug;

function emit(level: Level, msg: string, meta?: unknown) {
  if (order[level] < threshold) return;
  const entry = { t: new Date().toISOString(), level, msg, ...(meta ? { meta } : {}) };
  const line = env.isProd ? JSON.stringify(entry) : `[${entry.t}] ${level.toUpperCase()} ${msg}${meta ? " " + safe(meta) : ""}`;
  // eslint-disable-next-line no-console
  (level === "error" ? console.error : level === "warn" ? console.warn : console.log)(line);
}
function safe(v: unknown) { try { return JSON.stringify(v); } catch { return String(v); } }

export const logger = {
  debug: (m: string, meta?: unknown) => emit("debug", m, meta),
  info: (m: string, meta?: unknown) => emit("info", m, meta),
  warn: (m: string, meta?: unknown) => emit("warn", m, meta),
  error: (m: string, meta?: unknown) => emit("error", m, meta),
};
