"use client";
import { useState } from "react";
import { X } from "lucide-react";
import type { Category, Brand } from "@/types";
import { categoriesApi, brandsApi } from "@/lib/api/services";

type Kind = "category" | "brand";
interface Props { open: boolean; onClose: () => void; onSaved: () => void; kind: Kind; entity?: Category | Brand | null }

export default function CatalogEntityModal({ open, onClose, onSaved, kind, entity }: Props) {
  const isEdit = Boolean(entity);
  const isCat = kind === "category";
  const cat = entity as Category | undefined;
  const brand = entity as Brand | undefined;

  const [form, setForm] = useState({
    name: entity?.name ?? "",
    nameEn: (isCat ? cat?.nameEn : "") ?? "",
    slug: (isCat ? cat?.slug : brand?.slug) ?? "",
    media: (isCat ? cat?.image : brand?.logo) ?? "", // image for category, logo for brand
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.slug) { setError("الاسم والمعرّف (slug) مطلوبان"); return; }
    setBusy(true);
    try {
      if (isCat) {
        const body = { slug: form.slug, name: form.name, nameEn: form.nameEn || form.name, image: form.media || undefined };
        if (isEdit && cat) await categoriesApi.update(cat.id, body);
        else await categoriesApi.create(body);
      } else {
        const body = { slug: form.slug, name: form.name, logo: form.media || undefined };
        if (isEdit && brand) await brandsApi.update(brand.id, body);
        else await brandsApi.create(body);
      }
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
          <h2 className="text-lg font-extrabold text-ink">
            {isEdit ? "تعديل" : "إضافة"} {isCat ? "قسم" : "علامة تجارية"}
          </h2>
          <button onClick={onClose} className="btn-ghost p-1"><X width={20} height={20} /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <label className="block"><span className="mb-1 block text-xs font-bold text-ink">الاسم *</span>
            <input className="ein" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
          {isCat && (
            <label className="block"><span className="mb-1 block text-xs font-bold text-ink">الاسم بالإنجليزي</span>
              <input className="ein" value={form.nameEn} onChange={(e) => setForm({ ...form, nameEn: e.target.value })} /></label>
          )}
          <label className="block"><span className="mb-1 block text-xs font-bold text-ink">المعرّف slug * (إنجليزي)</span>
            <input className="ein" placeholder="kitchen-tools" value={form.slug} onChange={(e) => setForm({ ...form, slug: e.target.value })} /></label>
          <label className="block"><span className="mb-1 block text-xs font-bold text-ink">{isCat ? "رابط الصورة" : "رابط الشعار"}</span>
            <input className="ein" placeholder="/assets/products/p01.jpg" value={form.media} onChange={(e) => setForm({ ...form, media: e.target.value })} /></label>
          <div className="flex gap-2 pt-2">
            <button disabled={busy} className="btn-primary flex-1">{busy ? "جارٍ…" : isEdit ? "حفظ" : "إضافة"}</button>
            <button type="button" onClick={onClose} className="btn-outline">إلغاء</button>
          </div>
        </form>
        <style jsx>{`
          .ein { height: 2.6rem; width: 100%; border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 0 0.75rem; font-size: 0.875rem; outline: none; background: #F8F8F8; }
          .ein:focus { border-color: #C8102E; }
        `}</style>
      </div>
    </div>
  );
}
