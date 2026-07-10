"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { couponsAdminApi, AdminCoupon } from "@/lib/api/services";

interface Props { open: boolean; onClose: () => void; onSaved: () => void; coupon?: AdminCoupon | null }

export default function CouponFormModal({ open, onClose, onSaved, coupon }: Props) {
  const isEdit = Boolean(coupon);
  const [form, setForm] = useState({
    code: coupon?.code ?? "",
    type: (coupon?.type ?? "PERCENT") as "PERCENT" | "FIXED",
    value: coupon?.value?.toString() ?? "",
    minTotal: coupon?.minTotal?.toString() ?? "0",
    usageLimit: coupon?.usageLimit?.toString() ?? "",
    expiresAt: coupon?.expiresAt ? coupon.expiresAt.slice(0, 10) : "",
    active: coupon?.active ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.code || !form.value) { setError("الكود والقيمة مطلوبان"); return; }
    setBusy(true);
    try {
      const body = {
        code: form.code.toUpperCase(),
        type: form.type,
        value: Number(form.value),
        minTotal: Number(form.minTotal) || 0,
        usageLimit: form.usageLimit ? Number(form.usageLimit) : undefined,
        expiresAt: form.expiresAt || undefined,
      };
      if (isEdit && coupon) await couponsAdminApi.update(coupon.id, { ...body, active: form.active });
      else await couponsAdminApi.create(body);
      onSaved(); onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
    } finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">{isEdit ? "تعديل كوبون" : "كوبون جديد"}</h2>
          <button onClick={onClose} className="btn-ghost p-1"><X width={20} height={20} /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <label className="block"><span className="mb-1 block text-xs font-bold text-ink">الكود *</span>
            <input className="cin uppercase" value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value })} placeholder="SUMMER20" /></label>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-xs font-bold text-ink">النوع</span>
              <select className="cin" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value as "PERCENT" | "FIXED" })}>
                <option value="PERCENT">نسبة %</option><option value="FIXED">مبلغ ثابت</option>
              </select></label>
            <label className="block"><span className="mb-1 block text-xs font-bold text-ink">القيمة *</span>
              <input type="number" className="cin" value={form.value} onChange={(e) => setForm({ ...form, value: e.target.value })} /></label>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <label className="block"><span className="mb-1 block text-xs font-bold text-ink">الحد الأدنى للطلب</span>
              <input type="number" className="cin" value={form.minTotal} onChange={(e) => setForm({ ...form, minTotal: e.target.value })} /></label>
            <label className="block"><span className="mb-1 block text-xs font-bold text-ink">حد الاستخدام</span>
              <input type="number" className="cin" placeholder="بدون حد" value={form.usageLimit} onChange={(e) => setForm({ ...form, usageLimit: e.target.value })} /></label>
          </div>
          <label className="block"><span className="mb-1 block text-xs font-bold text-ink">تاريخ الانتهاء (اختياري)</span>
            <input type="date" className="cin" value={form.expiresAt} onChange={(e) => setForm({ ...form, expiresAt: e.target.value })} /></label>
          {isEdit && (
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-primary" checked={form.active} onChange={(e) => setForm({ ...form, active: e.target.checked })} /> فعّال</label>
          )}
          <div className="flex gap-2 pt-2">
            <button disabled={busy} className="btn-primary flex-1">{busy ? "جارٍ…" : isEdit ? "حفظ" : "إضافة"}</button>
            <button type="button" onClick={onClose} className="btn-outline">إلغاء</button>
          </div>
        </form>
        <style jsx>{`
          .cin { height: 2.6rem; width: 100%; border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 0 0.75rem; font-size: 0.875rem; outline: none; background: #F8F8F8; }
          .cin:focus { border-color: #C8102E; }
        `}</style>
      </div>
    </div>
  );
}
