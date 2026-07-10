import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "الاسم قصير جداً"),
  email: z.string().email("بريد غير صالح"),
  phone: z.string().min(6).optional(),
  password: z.string().min(6, "كلمة المرور 6 أحرف على الأقل"),
});
export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});
export const forgotSchema = z.object({ email: z.string().email() });
export const resetSchema = z.object({
  token: z.string().min(10),
  password: z.string().min(6),
});

export type RegisterDto = z.infer<typeof registerSchema>;
export type LoginDto = z.infer<typeof loginSchema>;
