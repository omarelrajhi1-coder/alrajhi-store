"use client";
import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { Package, ChevronLeft } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { ordersApi } from "@/lib/api/services";
import { formatPrice, cn } from "@/lib/utils";

interface MyOrderItem { name: string; price: number; quantity: number }
interface MyOrder {
  id: string; number: string; status: string; total: number;
  subtotal: number; shipping: number; discount: number;
  city: string; address: string; createdAt: string; items: MyOrderItem[];
}

const statusLabel: Record<string, string> = {
  NEW: "جديد", PROCESSING: "قيد التجهيز", SHIPPING: "قيد التوصيل",
  DELIVERED: "تم التسليم", CANCELLED: "ملغي", RETURNED: "مرتجع",
};
const statusColor: Record<string, string> = {
  NEW: "bg-warning/15 text-warning", PROCESSING: "bg-blue-100 text-blue-600",
  SHIPPING: "bg-primary/10 text-primary", DELIVERED: "bg-success/15 text-success",
  CANCELLED: "bg-error/10 text-error", RETURNED: "bg-muted/15 text-muted",
};

export default function MyOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const { data, isLoading } = useQuery({
    queryKey: ["my-orders"],
    queryFn: ordersApi.mine as () => Promise<MyOrder[]>,
    enabled: Boolean(user),
  });
  const orders = data ?? [];

  if (authLoading) return <div className="container-x py-24 text-center text-muted">جارٍ التحميل…</div>;

  if (!user) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <Package width={48} height={48} className="text-muted" />
        <h1 className="mt-4 text-xl font-extrabold text-ink">سجّل الدخول لعرض طلباتك</h1>
        <Link href="/account" className="btn-primary mt-5">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/account" className="hover:text-primary">حسابي</Link>
        <ChevronLeft width={13} height={13} />
        <span className="text-ink">طلباتي</span>
      </nav>

      <h1 className="mb-6 text-2xl font-extrabold text-ink">طلباتي</h1>

      {isLoading ? (
        <div className="py-16 text-center text-muted">جارٍ تحميل الطلبات…</div>
      ) : orders.length === 0 ? (
        <div className="card grid place-items-center py-20 text-center">
          <Package width={44} height={44} className="text-muted" />
          <p className="mt-4 text-lg font-bold text-ink">لا توجد طلبات بعد</p>
          <Link href="/shop" className="btn-primary mt-5">ابدأ التسوّق</Link>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((o) => (
            <div key={o.id} className="card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
                <div>
                  <p className="font-extrabold text-ink">طلب {o.number}</p>
                  <p className="text-xs text-muted">{o.createdAt?.slice(0, 10)} · {o.city}</p>
                </div>
                <span className={cn("chip", statusColor[o.status])}>{statusLabel[o.status] ?? o.status}</span>
              </div>

              <div className="mt-3 space-y-1.5">
                {o.items.map((it, i) => (
                  <div key={i} className="flex items-center justify-between text-sm">
                    <span className="text-ink">{it.name} <span className="text-muted">× {it.quantity}</span></span>
                    <span className="font-bold text-muted">{formatPrice(it.price * it.quantity)}</span>
                  </div>
                ))}
              </div>

              <div className="mt-3 flex items-center justify-between border-t border-line pt-3">
                <span className="text-sm text-muted">الإجمالي (شامل التوصيل)</span>
                <span className="text-lg font-extrabold text-primary">{formatPrice(o.total)}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
