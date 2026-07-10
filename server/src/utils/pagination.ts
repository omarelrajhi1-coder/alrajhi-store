import { Request } from "express";

export interface QueryOptions {
  page: number; limit: number; skip: number;
  sort: string; order: "asc" | "desc"; q?: string;
}

/** Parses ?page=&limit=&sort=&order=&q= with safe bounds. */
export function parseQuery(req: Request, opts?: { defaultSort?: string; maxLimit?: number }): QueryOptions {
  const maxLimit = opts?.maxLimit ?? 100;
  const page = Math.max(1, Number(req.query.page) || 1);
  const limit = Math.min(maxLimit, Math.max(1, Number(req.query.limit) || 12));
  const order = (String(req.query.order).toLowerCase() === "asc" ? "asc" : "desc") as "asc" | "desc";
  const sort = (req.query.sort as string) || opts?.defaultSort || "createdAt";
  const q = (req.query.q as string)?.trim() || undefined;
  return { page, limit, skip: (page - 1) * limit, sort, order, q };
}

export function pageMeta(total: number, page: number, limit: number) {
  return { page, limit, total, pages: Math.max(1, Math.ceil(total / limit)) };
}
