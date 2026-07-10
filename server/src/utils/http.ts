import { Response } from "express";

/** Consistent success envelope: { success, data, meta? }. */
export interface PageMeta { page: number; limit: number; total: number; pages: number; }

export function ok<T>(res: Response, data: T, status = 200) {
  return res.status(status).json({ success: true, data });
}
export function created<T>(res: Response, data: T) {
  return res.status(201).json({ success: true, data });
}
export function noContent(res: Response) {
  return res.status(204).send();
}
export function paginated<T>(res: Response, items: T[], meta: PageMeta) {
  return res.status(200).json({ success: true, data: items, meta });
}
