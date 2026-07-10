"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useCatalog } from "@/lib/api/hooks";
import ProductGrid from "@/components/ProductGrid";

export default function WishlistPage() {
  const { wishlist } = useStore();
  const { products, isLoading } = useCatalog();
  const items = products.filter((p) => wishlist.includes(p.id));

  return (
    <div className="container-x py-8">
      <h1 className="mb-6 flex items-center gap-2 text-2xl font-extrabold text-ink">
        <Heart className="fill-primary text-primary" /> المفضلة
        {items.length > 0 && <span className="text-base font-bold text-muted">({items.length})</span>}
      </h1>

      {isLoading && wishlist.length > 0 ? (
        <div className="py-20 text-center text-muted">جارٍ التحميل…</div>
      ) : items.length === 0 ? (
        <div className="card grid place-items-center py-20 text-center">
          <span className="grid h-16 w-16 place-items-center rounded-full bg-bg text-muted"><Heart width={30} height={30} /></span>
          <p className="mt-4 text-lg font-bold text-ink">قائمة المفضلة فارغة</p>
          <p className="mt-1 text-sm text-muted">اضغط على القلب ♡ في أي منتج لإضافته هنا</p>
          <Link href="/shop" className="btn-primary mt-6">تصفّح المنتجات</Link>
        </div>
      ) : (
        <ProductGrid products={items} />
      )}
    </div>
  );
}
