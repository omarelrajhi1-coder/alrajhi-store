"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { inventoryApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import { cn } from "@/lib/utils";

export default function AdminInventory() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "inventory"], queryFn: () => inventoryApi.list({ limit: 100 }) });
  const rows = data?.items ?? [];

  async function editQty(productId: string, current: number) {
    const val = window.prompt("الكمية الجديدة:", String(current));
    if (val === null) return;
    const q = Number(val);
    if (Number.isNaN(q) || q < 0) { window.alert("قيمة غير صالحة"); return; }
    try { await inventoryApi.set(productId, q); qc.invalidateQueries({ queryKey: ["admin", "inventory"] }); }
    catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
  }
  return (
    <div>
      <PageHeader title="المخزون" desc={`${data?.meta?.total ?? rows.length} صنف`} />
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : (
          <table className="w-full min-w-[600px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">المنتج</th>
                <th className="px-4 py-3 font-bold">SKU</th>
                <th className="px-4 py-3 font-bold">الكمية</th>
                <th className="px-4 py-3 font-bold">حد التنبيه</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => {
                const low = r.quantity <= r.lowStockAt;
                return (
                  <tr key={r.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
                    <td className="px-4 py-3 font-bold text-ink line-clamp-1">{r.product.name}</td>
                    <td className="px-4 py-3 text-muted">{r.product.sku ?? "—"}</td>
                    <td className="px-4 py-3 font-bold">{r.quantity}</td>
                    <td className="px-4 py-3 text-muted">{r.lowStockAt}</td>
                    <td className="px-4 py-3">
                      <span className={cn("chip", r.quantity === 0 ? "bg-error/10 text-error" : low ? "bg-warning/15 text-warning" : "bg-success/15 text-success")}>
                        {r.quantity === 0 ? "نفد" : low ? "منخفض" : "جيد"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button onClick={() => editQty(r.product.id, r.quantity)} className="rounded-lg border border-line px-3 py-1 text-xs font-bold hover:border-primary hover:text-primary">تعديل الكمية</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
