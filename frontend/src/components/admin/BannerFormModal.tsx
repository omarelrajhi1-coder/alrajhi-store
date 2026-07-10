"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { bannersApi, Banner } from "@/lib/api/services";

interface Props { open: boolean; onClose: () => void; onSaved: () => void; banner?: Banner | null }

export default function BannerFormModal({ open, onClose, onSaved, banner }: Props) {
  const isEdit = Boolean(banner);
  const [form, setForm] = useState({
    title: banner?.title ?? "", subtitle: banner?.subtitle ?? "",
    image: banner?.image ?? "", href: banner?.href ?? "", order: banner?.order?.toString() ?? "0",
    isActive: banner?.isActive ?? true,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    if (!form.title || !form.image) { setError("العنوان والصورة مطلوبان"); return; }
    setBusy(true);
    try {
      const body = { title: form.title, subtitle: form.subtitle || undefined, image: form.image, href: form.href || undefined, order: Number(form.order) || 0 };
      if (isEdit && banner) await bannersApi.update(banner.id, { ...body, isActive: form.isActive });
      else await bannersApi.create(body);
      onSaved(); onClose();
    } catch (err) { setError(err instanceof Error ? err.message : "فشل الحفظ"); }
    finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">{isEdit ? "تعديل بانر" : "بانر جديد"}</h2>
          <button onClick={onClose} className="btn-ghost p-1"><X width={20} height={20} /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <F l="العنوان *"><input className="bnr" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} /></F>
          <F l="العنوان الفرعي"><input className="bnr" value={form.subtitle} onChange={(e) => setForm({ ...form, subtitle: e.target.value })} /></F>
          <F l="رابط الصورة *"><input className="bnr" placeholder="/assets/products/p18.jpg" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} /></F>
          <div className="grid grid-cols-2 gap-3">
            <F l="الرابط عند الضغط"><input className="bnr" placeholder="/shop" value={form.href} onChange={(e) => setForm({ ...form, href: e.target.value })} /></F>
            <F l="الترتيب"><input type="number" className="bnr" value={form.order} onChange={(e) => setForm({ ...form, order: e.target.value })} /></F>
          </div>
          {isEdit && <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-primary" checked={form.isActive} onChange={(e) => setForm({ ...form, isActive: e.target.checked })} /> ظاهر</label>}
          <div className="flex gap-2 pt-2">
            <button disabled={busy} className="btn-primary flex-1">{busy ? "جارٍ…" : isEdit ? "حفظ" : "إضافة"}</button>
            <button type="button" onClick={onClose} className="btn-outline">إلغاء</button>
          </div>
        </form>
        <style jsx>{`.bnr{height:2.6rem;width:100%;border:1px solid #E5E7EB;border-radius:.5rem;padding:0 .75rem;font-size:.875rem;outline:none;background:#F8F8F8}.bnr:focus{border-color:#C8102E}`}</style>
      </div>
    </div>
  );
}
function F({ l, children }: { l: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold text-ink">{l}</span>{children}</label>;
}
