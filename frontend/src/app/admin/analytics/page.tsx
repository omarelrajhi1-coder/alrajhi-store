"use client";
import { useQuery } from "@tanstack/react-query";
import { Wallet, ShoppingBag, Activity } from "lucide-react";
import { analyticsApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import { formatPrice } from "@/lib/utils";

const eventLabel: Record<string, string> = {
  page_view: "مشاهدات الصفحات", add_to_cart: "إضافة للسلة", purchase: "عمليات شراء", search: "عمليات بحث",
};

export default function AdminAnalytics() {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "analytics"], queryFn: analyticsApi.summary });
  const s = data?.last30Days;

  return (
    <div>
      <PageHeader title="التحليلات" desc="ملخّص آخر ٣٠ يوم" />
      {isLoading ? (
        <div className="card py-16 text-center text-sm text-muted">جارٍ التحميل…</div>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-success/15 text-success"><Wallet width={22} height={22} /></span>
              <p className="mt-4 text-2xl font-extrabold text-ink">{formatPrice(s?.revenue ?? 0)}</p>
              <p className="text-sm text-muted">الإيرادات (٣٠ يوم)</p>
            </div>
            <div className="card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary"><ShoppingBag width={22} height={22} /></span>
              <p className="mt-4 text-2xl font-extrabold text-ink">{s?.orders ?? 0}</p>
              <p className="text-sm text-muted">الطلبات (٣٠ يوم)</p>
            </div>
            <div className="card p-5">
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-warning/15 text-warning"><Activity width={22} height={22} /></span>
              <p className="mt-4 text-2xl font-extrabold text-ink">{(s?.events ?? []).reduce((a, e) => a + e._count, 0)}</p>
              <p className="text-sm text-muted">إجمالي الأحداث</p>
            </div>
          </div>

          <div className="card p-5">
            <h3 className="mb-4 font-extrabold text-ink">الأحداث حسب النوع</h3>
            {(s?.events ?? []).length === 0 ? (
              <p className="py-6 text-center text-sm text-muted">لا توجد أحداث مسجّلة بعد</p>
            ) : (
              <div className="space-y-2">
                {(s?.events ?? []).map((e) => (
                  <div key={e.type} className="flex items-center justify-between border-b border-line/60 py-2 text-sm last:border-0">
                    <span className="font-bold text-ink">{eventLabel[e.type] ?? e.type}</span>
                    <span className="text-muted">{e._count}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
