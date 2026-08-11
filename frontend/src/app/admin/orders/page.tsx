"use client";
import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp, Search, Wallet, ShoppingBag, Clock, Truck } from "lucide-react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ordersAdminApi, dashboardApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import StatCard from "@/components/admin/StatCard";
import { cn, formatPrice } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  NEW: "جديد", PROCESSING: "قيد التجهيز", SHIPPING: "قيد التوصيل",
  DELIVERED: "تم التسليم", CANCELLED: "ملغي", RETURNED: "مرتجع",
};
const statusColor: Record<string, string> = {
  NEW: "bg-primary/10 text-primary", PROCESSING: "bg-warning/15 text-warning",
  SHIPPING: "bg-blue-100 text-blue-600", DELIVERED: "bg-success/15 text-success",
  CANCELLED: "bg-error/10 text-error", RETURNED: "bg-muted/15 text-muted",
};
const allStatuses = ["NEW", "PROCESSING", "SHIPPING", "DELIVERED", "CANCELLED", "RETURNED"];
const filters = ["ALL", ...allStatuses];

export default function AdminOrders() {
  const qc = useQueryClient();
  const [status, setStatus] = useState("ALL");
  const [q, setQ] = useState("");
  const [updating, setUpdating] = useState<string | null>(null);
  const [openId, setOpenId] = useState<string | null>(null);

  const { data: overview } = useQuery({
    queryKey: ["admin", "overview"],
    queryFn: dashboardApi.overview as () => Promise<{ totalOrders: number; newOrders: number; shipping: number }>,
    retry: 0,
  });
  const { data, isLoading } = useQuery({
    queryKey: ["admin", "orders", status, q],
    queryFn: () => ordersAdminApi.list({ status, q: q || undefined, limit: 100 }),
  });
  const rows = data?.items ?? [];

  const revenue = useMemo(() => rows.reduce((s, o) => (o.status !== "CANCELLED" ? s + o.total : s), 0), [rows]);

  async function changeStatus(id: string, newStatus: string) {
    setUpdating(id);
    try {
      await ordersAdminApi.updateStatus(id, newStatus);
      await Promise.all([
        qc.invalidateQueries({ queryKey: ["admin", "orders"] }),
        qc.invalidateQueries({ queryKey: ["admin", "overview"] }),
      ]);
    } catch (e) {
      window.alert("فشل تحديث الحالة: " + (e instanceof Error ? e.message : ""));
    } finally {
      setUpdating(null);
    }
  }

  return (
    <div>
      <PageHeader title="الطلبات" desc={`${data?.meta?.total ?? rows.length} طلب`} />

      {/* summary */}
      <div className="mb-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard icon={ShoppingBag} tone="primary" label="إجمالي الطلبات" value={String(overview?.totalOrders ?? rows.length)} index={0} />
        <StatCard icon={Clock} tone="warning" label="طلبات جديدة" value={String(overview?.newOrders ?? 0)} index={1} />
        <StatCard icon={Truck} tone="ink" label="قيد التوصيل" value={String(overview?.shipping ?? 0)} index={2} />
        <StatCard icon={Wallet} tone="success" label="إجمالي هذه القائمة" value={formatPrice(revenue)} index={3} />
      </div>

      {/* search */}
      <div className="mb-4 flex items-center overflow-hidden rounded-lg border border-line bg-white">
        <span className="grid h-11 w-11 shrink-0 place-items-center text-muted"><Search width={17} height={17} /></span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="ابحث برقم الطلب أو اسم العميل أو رقم الهاتف"
          className="h-11 flex-1 bg-transparent pe-4 text-sm outline-none" />
      </div>

      {/* status filter chips */}
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
          <div className="py-16 text-center text-sm text-muted">لا توجد طلبات مطابقة</div>
        ) : (
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold"></th>
                <th className="px-4 py-3 font-bold">رقم الطلب</th>
                <th className="px-4 py-3 font-bold">العميل</th>
                <th className="px-4 py-3 font-bold">التاريخ</th>
                <th className="px-4 py-3 font-bold">الإجمالي</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((o) => {
                const open = openId === o.id;
                return (
                  <>
                    <tr key={o.id} className={cn("cursor-pointer border-b border-line/60 last:border-0 hover:bg-bg", updating === o.id && "opacity-50")}
                      onClick={() => setOpenId(open ? null : o.id)}>
                      <td className="px-4 py-3 text-muted">{open ? <ChevronUp width={16} height={16} /> : <ChevronDown width={16} height={16} />}</td>
                      <td className="px-4 py-3 font-bold text-ink">{o.number}</td>
                      <td className="px-4 py-3">{o.customer}</td>
                      <td className="px-4 py-3 text-muted">{o.createdAt?.slice(0, 10)}</td>
                      <td className="px-4 py-3 font-bold text-primary">{formatPrice(o.total)}</td>
                      <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={o.status}
                          disabled={updating === o.id}
                          onChange={(e) => changeStatus(o.id, e.target.value)}
                          className={cn("chip cursor-pointer border-0 outline-none", statusColor[o.status])}>
                          {allStatuses.map((s) => <option key={s} value={s}>{statusLabel[s]}</option>)}
                        </select>
                      </td>
                    </tr>
                    {open && (
                      <tr className="border-b border-line/60 bg-bg">
                        <td colSpan={6} className="px-4 py-4">
                          <div className="grid gap-4 rounded-lg border border-line bg-white p-4 sm:grid-cols-[1.4fr_1fr]">
                            <div>
                              <p className="mb-3 text-xs font-bold text-muted">المنتجات المطلوبة:</p>
                              <ul className="space-y-2">
                                {o.items?.length ? o.items.map((it, i) => (
                                  <li key={i} className="flex items-center justify-between border-b border-line/50 pb-2 text-sm last:border-0 last:pb-0">
                                    <span className="font-bold text-ink">{it.name}</span>
                                    <span className="text-muted">الكمية: <span className="font-bold text-ink">{it.quantity}</span></span>
                                  </li>
                                )) : <li className="text-sm text-muted">لا توجد تفاصيل منتجات لهذا الطلب</li>}
                              </ul>
                            </div>
                            <div className="space-y-1.5 border-t border-line pt-3 text-xs text-muted sm:border-t-0 sm:border-r sm:pe-4 sm:pt-0">
                              <p><span className="font-bold text-ink">الهاتف: </span><span dir="ltr">{o.phone}</span></p>
                              <p><span className="font-bold text-ink">المدينة: </span>{o.city}</p>
                              <p><span className="font-bold text-ink">العنوان: </span>{o.address}</p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
