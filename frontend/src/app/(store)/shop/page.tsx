import { Suspense } from "react";
import type { Metadata } from "next";
import ShopClient from "@/components/shop/ShopClient";

export const metadata: Metadata = { title: "المنتجات" };

export default function ShopPage() {
  return (
    <Suspense fallback={<div className="container-x py-20 text-center text-muted">جارٍ التحميل…</div>}>
      <ShopClient />
    </Suspense>
  );
}
