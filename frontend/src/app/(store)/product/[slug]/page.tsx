import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { products as mockProducts } from "@/data/catalogue";
import { getProductData } from "@/lib/api/server";
import ProductDetail from "@/components/product/ProductDetail";

// Pre-render known slugs; render any other slug on demand (ISR).
export const dynamicParams = true;
export const revalidate = 120;

export function generateStaticParams() {
  return mockProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProductData(slug);
  if (!data) return { title: "منتج غير موجود" };
  const p = data.product;
  return {
    title: p.name,
    description: p.description.slice(0, 150),
    openGraph: { title: p.name, images: p.images.length ? [p.images[0]] : [] },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProductData(slug);
  if (!data) notFound();
  return <ProductDetail product={data.product} related={data.related} />;
}
