import { z } from "zod";

export const productCreateSchema = z.object({
  slug: z.string().min(1), sku: z.string().optional(),
  name: z.string().min(1), nameEn: z.string().min(1), description: z.string().min(1),
  price: z.number().nonnegative(), oldPrice: z.number().nonnegative().optional(),
  categoryId: z.string().min(1), brandId: z.string().min(1),
  images: z.array(z.string()).optional(),
  inStock: z.boolean().optional(), isFeatured: z.boolean().optional(),
  isBestseller: z.boolean().optional(), isNew: z.boolean().optional(),
  specs: z.array(z.object({ label: z.string(), value: z.string() })).optional(),
  quantity: z.number().int().nonnegative().optional(),
});
export const productUpdateSchema = productCreateSchema.partial().extend({
  oldPrice: z.number().nonnegative().nullable().optional(),
});
