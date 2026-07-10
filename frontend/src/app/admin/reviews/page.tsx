"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Check, X } from "lucide-react";
import { reviewsAdminApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import { cn } from "@/lib/utils";

const statusLabel: Record<string, string> = { PENDING: "قيد المراجعة", APPROVED: "مقبول", REJECTED: "مرفوض" };
const statusColor: Record<string, string> = { PENDING: "bg-warning/15 text-warning", APPROVED: "bg-success/15 text-success", REJECTED: "bg-error/10 text-error" };

export default function AdminReviews() {
  const qc = useQueryClient();
  const [busy, setBusy] = useState<string | null>(null);
  const { data, isLoading } = useQuery({ queryKey: ["admin", "reviews"], queryFn: () => reviewsAdminApi.list({ limit: 50 }) });
  const rows = data?.items ?? [];

  async function moderate(id: string, status: "APPROVED" | "REJECTED") {
    setBusy(id);
    try {
      await reviewsAdminApi.setStatus(id, status);
      await qc.invalidateQueries({ queryKey: ["admin", "reviews"] });
    } catch (e) {
      window.alert("فشل التحديث: " + (e instanceof Error ? e.message : ""));
    } finally {
      setBusy(null);
    }
  }

  return (
    <div>
      <PageHeader title="التقييمات" desc={`${data?.meta?.total ?? rows.length} تقييم`} />
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : rows.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted">لا توجد تقييمات بعد</div>
        ) : (
          <table className="w-full min-w-[720px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">المنتج</th>
                <th className="px-4 py-3 font-bold">الكاتب</th>
                <th className="px-4 py-3 font-bold">التقييم</th>
                <th className="px-4 py-3 font-bold">النص</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className={cn("border-b border-line/60 last:border-0 hover:bg-bg", busy === r.id && "opacity-50")}>
                  <td className="px-4 py-3 font-bold text-ink line-clamp-1">{r.product?.name ?? "—"}</td>
                  <td className="px-4 py-3">{r.author}</td>
                  <td className="px-4 py-3 text-warning">{"★".repeat(r.rating)}</td>
                  <td className="px-4 py-3 max-w-xs text-muted line-clamp-1">{r.text}</td>
                  <td className="px-4 py-3"><span className={cn("chip", statusColor[r.status])}>{statusLabel[r.status] ?? r.status}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button
                        onClick={() => moderate(r.id, "APPROVED")}
                        disabled={busy === r.id || r.status === "APPROVED"}
                        title="قبول"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-success hover:border-success disabled:opacity-40">
                        <Check width={15} height={15} />
                      </button>
                      <button
                        onClick={() => moderate(r.id, "REJECTED")}
                        disabled={busy === r.id || r.status === "REJECTED"}
                        title="رفض"
                        className="grid h-8 w-8 place-items-center rounded-lg border border-line text-error hover:border-error disabled:opacity-40">
                        <X width={15} height={15} />
                      </button>
                    </div>
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
