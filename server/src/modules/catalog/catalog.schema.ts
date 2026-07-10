import { z } from "zod";
export const categoryCreateSchema = z.object({
  slug: z.string().min(1), name: z.string().min(1), nameEn: z.string().min(1),
  image: z.string().optional(), parentId: z.string().optional(), order: z.number().int().optional(),
});
export const categoryUpdateSchema = categoryCreateSchema.partial();
export const brandCreateSchema = z.object({ slug: z.string().min(1), name: z.string().min(1), logo: z.string().optional() });
export const brandUpdateSchema = brandCreateSchema.partial().extend({ isActive: z.boolean().optional() });
