import type { MetadataRoute } from "next";
import { products, categories } from "@/data/catalogue";
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
  const staticPaths = ["", "/shop", "/offers", "/about", "/contact"].map((p) => ({
    url: `${base}${p}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: p === "" ? 1 : 0.7,
  }));
  const cat = categories.map((c) => ({ url: `${base}/shop?category=${c.slug}`, lastModified: new Date(), priority: 0.6 }));
  const prod = products.map((p) => ({ url: `${base}/product/${p.slug}`, lastModified: new Date(), priority: 0.5 }));
  return [...staticPaths, ...cat, ...prod];
}
