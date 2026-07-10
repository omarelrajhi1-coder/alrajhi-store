"use client";
import { useCatalog } from "@/lib/api/hooks";
import ProductGrid from "@/components/ProductGrid";

export default function OffersClient() {
  const { products, isLoading } = useCatalog();
  const onSale = products.filter((p) => p.oldPrice && p.oldPrice > p.price);
  return (
    <section className="container-x py-10">
      <h2 className="section-title mb-6">منتجات بأسعار مخفّضة ({onSale.length})</h2>
      {isLoading ? (
        <div className="py-16 text-center text-muted">جارٍ التحميل…</div>
      ) : onSale.length === 0 ? (
        <div className="py-16 text-center text-muted">لا توجد عروض حاليًا</div>
      ) : (
        <ProductGrid products={onSale} />
      )}
    </section>
  );
}
