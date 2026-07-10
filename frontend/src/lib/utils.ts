import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/** Conditional + conflict-free class names. */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Format a price in Libyan Dinar (د.ل). */
export function formatPrice(value: number): string {
  return `${value.toLocaleString("ar-LY", { maximumFractionDigits: 0 })} د.ل`;
}

export function discountPercent(price: number, oldPrice?: number): number | null {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}


/** True when a string is a usable next/image src (root-relative or absolute). */
export function isImageSrc(src?: string | null): src is string {
  return !!src && (src.startsWith("/") || src.startsWith("http://") || src.startsWith("https://"));
}

/** Returns a safe image src, falling back to a placeholder for bad/empty values. */
export const PLACEHOLDER_IMG = "/assets/products/p01.jpg";
export function safeImg(src?: string | null): string {
  return isImageSrc(src) ? src : PLACEHOLDER_IMG;
}
