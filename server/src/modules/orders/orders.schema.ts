import { z } from "zod";
export const createOrderSchema = z.object({
  customer: z.string().min(2), phone: z.string().min(6), city: z.string().min(1), address: z.string().min(3),
  notes: z.string().optional(), couponCode: z.string().optional(),
  items: z.array(z.object({ productId: z.string().min(1), quantity: z.number().int().positive() })).min(1),
});
export const updateStatusSchema = z.object({ status: z.enum(["NEW", "PROCESSING", "SHIPPING", "DELIVERED", "CANCELLED", "RETURNED"]) });
