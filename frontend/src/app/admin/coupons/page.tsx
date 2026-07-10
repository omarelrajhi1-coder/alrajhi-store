"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { couponsAdminApi, AdminCoupon } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import CouponFormModal from "@/components/admin/CouponFormModal";
import { cn, formatPrice } from "@/lib/utils";

export default function AdminCoupons() {
  const qc = useQueryClient();
  const { data: coupons = [], isLoading } = useQuery({ queryKey: ["admin", "coupons"], queryFn: couponsAdminApi.list });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<AdminCoupon | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "coupons"] });
  function openAdd() { setEditing(null); setModalOpen(true); }
  function openEdit(c: AdminCoupon) { setEditing(c); setModalOpen(true); }

  async function remove(id: string, code: string) {
    if (!window.confirm(`حذف الكوبون "${code}"؟`)) return;
    try { await couponsAdminApi.remove(id); await refresh(); }
    catch (e) { window.alert("فشل الحذف: " + (e instanceof Error ? e.message : "")); }
  }

  return (
    <div>
      <PageHeader title="كوبونات الخصم" desc={`${coupons.length} كوبون`}
        action={<button onClick={openAdd} className="btn-primary"><Plus width={16} height={16} /> إضافة كوبون</button>} />

      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : (
          <table className="w-full min-w-[680px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">الكود</th>
                <th className="px-4 py-3 font-bold">النوع</th>
                <th className="px-4 py-3 font-bold">القيمة</th>
                <th className="px-4 py-3 font-bold">الحد الأدنى</th>
                <th className="px-4 py-3 font-bold">الاستخدام</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
                  <td className="px-4 py-3 font-bold text-ink">{c.code}</td>
                  <td className="px-4 py-3 text-muted">{c.type === "PERCENT" ? "نسبة %" : "مبلغ ثابت"}</td>
                  <td className="px-4 py-3 font-bold text-primary">{c.type === "PERCENT" ? `${c.value}%` : formatPrice(c.value)}</td>
                  <td className="px-4 py-3 text-muted">{c.minTotal ? formatPrice(c.minTotal) : "—"}</td>
                  <td className="px-4 py-3">{c.usedCount}{c.usageLimit ? ` / ${c.usageLimit}` : ""}</td>
                  <td className="px-4 py-3"><span className={cn("chip", c.active ? "bg-success/15 text-success" : "bg-muted/15 text-muted")}>{c.active ? "فعّال" : "متوقف"}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => openEdit(c)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary"><Pencil width={15} height={15} /></button>
                      <button onClick={() => remove(c.id, c.code)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error"><Trash2 width={15} height={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <CouponFormModal key={editing?.id ?? "new"} open={modalOpen} onClose={() => setModalOpen(false)} onSaved={refresh} coupon={editing} />
    </div>
  );
}
