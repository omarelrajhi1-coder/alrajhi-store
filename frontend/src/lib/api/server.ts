import { productsApi } from "./services";
import {
  products as mockProducts, categories as mockCategories,
  featuredProducts as mockFeatured, bestsellers as mockBest, newArrivals as mockNew,
  getProduct as mockGetProduct, relatedProducts as mockRelated,
} from "@/data/catalogue";
import type { Product } from "@/types";

/** Server-side homepage data; falls back to mock when the API is unavailable (e.g. during static build). */
export async function getHomeData() {
  try {
    const [featured, best, latest] = await Promise.all([
      productsApi.list({ featured: true, limit: 10 } as Record<string, unknown>),
      productsApi.list({ bestseller: true, limit: 10 } as Record<string, unknown>),
      productsApi.list({ isNew: true, limit: 5 } as Record<string, unknown>),
    ]);
    if (featured.items.length) return { featured: featured.items, best: best.items, latest: latest.items };
  } catch { /* fall through to mock */ }
  return { featured: mockFeatured, best: mockBest, latest: mockNew };
}

export async function getProductData(slug: string): Promise<{ product: Product; related: Product[] } | null> {
  try {
    return await productsApi.getBySlug(slug);
  } catch {
    const product = mockGetProduct(slug);
    if (!product) return null;
    return { product, related: mockRelated(product) };
  }
}

export { mockProducts, mockCategories };
