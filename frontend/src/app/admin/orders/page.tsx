"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersAdminApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import { cn, formatPrice } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  NEW: "جديد", PROCESSING: "قيد التجهيز", SHIPPING: "قيد التوصيل",
  DELIVERED: "تم التسليم", CANCELLED: "ملغي", RETURNED: "مرتجع",
};
const statusColor: Record<string, string> = {
  NEW: "bg-warning/15 text-warning", PROCESSING: "bg-blue-100 text-blue-600",
  SHIPPING: "bg-primary/10 text-primary", DELIVERED: "bg-success/15 text-success",
  CANCELLED: "bg-error/10 text-error", RETURNED: "bg-muted/15 text-muted",
};
const allStatuses = ["NEW", "PROCESSING", "SHIPPING", "DELIVERED", "CANCELLED", "RETURNED"];
const filters = ["ALL", ...allStatuses.slice(0, 5)];

export default function AdminOrders() {
  const qc = useQueryClient();
  const [status, setStatus] = useState("ALL");
  const [updating, setUpdating] = useState<string | null>(null);
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders", status],
    queryFn: () => ordersAdminApi.list({ status, limit: 50 }),
  });
  const rows = data?.items ?? [];

  async function changeStatus(id: string, newStatus: string) {
    setUpdating(id);
    try {
      await ordersAdminApi.updateStatus(id, newStatus);
      await qc.invalidateQueries({ queryKey: ["admin", "orders"] });
    } catch (e) {
      window.alert("فشل تحديث الحالة: " + (e instanceof Error ? e.message : ""));
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <PageHeader title="الطلبات" desc={`${data?.meta?.total ?? rows.length} طلب`} />
      <div className="mb-4 flex flex-wrap gap-2">
        {filters.map((s) => (
          <button key={s} onClick={() => setStatus(s)}
            className={cn("chip border", status === s ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-primary")}>
            {s === "ALL" ? "الكل" : statusLabel[s]}
          </button>
        ))}
      </div>
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted">لا توجد طلبات بعد</div>
        ) : (
          <table className="w-full min-w-[780px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">رقم الطلب</th>
                <th className="px-4 py-3 font-bold">العميل</th>
                <th className="px-4 py-3 font-bold">الهاتف</th>
                <th className="px-4 py-3 font-bold">المدينة</th>
                <th className="px-4 py-3 font-bold">الإجمالي</th>
                <th className="px-4 py-3 font-bold">التاريخ</th>
                <th className="px-4 py-3 font-bold">الحالة (اضغط للتغيير)</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => (
                <tr key={o.id} className={cn("border-b border-line/60 last:border-0 hover:bg-bg", updating === o.id && "opacity-50")}>
                  <td className="px-4 py-3 font-bold text-ink">{o.number}</td>
                  <td className="px-4 py-3">{o.customer}</td>
                  <td className="px-4 py-3 text-muted">{o.phone}</td>
                  <td className="px-4 py-3 text-muted">{o.city}</td>
                  <td className="px-4 py-3 font-bold text-primary">{formatPrice(o.total)}</td>
                  <td className="px-4 py-3 text-muted">{o.createdAt?.slice(0, 10)}</td>
                  <td className="px-4 py-3">
                    <select
                      value={o.status}
                      disabled={updating === o.id}
                      onChange={(e) => changeStatus(o.id, e.target.value)}
                      className={cn("chip cursor-pointer border-0 outline-none", statusColor[o.status])}>
                      {allStatuses.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
