"use client";
import { useQuery } from "@tanstack/react-query";
import { productsApi, categoriesApi, brandsApi } from "./services";
import { products as mockProducts, categories as mockCategories, brands as mockBrands } from "@/data/catalogue";
import type { Product, Category, Brand } from "@/types";

/** Fetches the full catalogue for client-side filtering; falls back to bundled mock data if the API is unreachable. */
export function useCatalog() {
  const productsQ = useQuery({
    queryKey: ["catalog", "products"],
    queryFn: async () => (await productsApi.list({ limit: 200, sort: "featured" })).items,
  });
  const categoriesQ = useQuery({ queryKey: ["catalog", "categories"], queryFn: categoriesApi.list });
  const brandsQ = useQuery({ queryKey: ["catalog", "brands"], queryFn: brandsApi.list });

  const products: Product[] = productsQ.data?.length ? productsQ.data : mockProducts;
  const categories: Category[] = categoriesQ.data?.length ? categoriesQ.data : mockCategories;
  const brands: Brand[] = brandsQ.data?.length ? brandsQ.data : mockBrands;
  return { products, categories, brands, isLoading: productsQ.isLoading, isError: productsQ.isError };
}
