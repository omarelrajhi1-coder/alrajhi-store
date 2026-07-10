"use client";
import { useState } from "react";
import { X } from "lucide-react";
import type { Product, Category, Brand } from "@/types";
import { productsApi } from "@/lib/api/services";

interface Props {
  open: boolean;
  onClose: () => void;
  onSaved: () => void;
  product?: Product | null;       // present = edit mode
  categories: Category[];
  brands: Brand[];
}

// Normalizes an image path typed by the admin: adds a leading "/" if missing,
// strips trailing slashes/spaces. Leaves full http(s) URLs untouched.
function normalizeImg(v: string): string {
  let s = v.trim().replace(/\/+$/, "");
  if (!s) return "";
  if (s.startsWith("http://") || s.startsWith("https://")) return s;
  if (!s.startsWith("/")) s = "/" + s;
  return s;
}

export default function ProductFormModal({ open, onClose, onSaved, product, categories, brands }: Props) {
  const isEdit = Boolean(product);
  const initialCatId = product ? categories.find((c) => c.slug === product.categorySlug)?.id ?? "" : "";

  const [form, setForm] = useState({
    name: product?.name ?? "",
    nameEn: product?.nameEn ?? "",
    description: product?.description ?? "",
    price: product?.price?.toString() ?? "",
    oldPrice: product?.oldPrice?.toString() ?? "",
    categoryId: initialCatId,
    brandId: product?.brandId ?? "",
    quantity: product?.stockQuantity?.toString() ?? "0",
    imageUrl: product?.images?.[0] ?? "",
    isFeatured: product?.isFeatured ?? false,
    isBestseller: product?.isBestseller ?? false,
    isNew: product?.isNew ?? false,
  });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!open) return null;

  function set<K extends keyof typeof form>(key: K, value: (typeof form)[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.name || !form.price || !form.categoryId || !form.brandId) {
      setError("الاسم، السعر، القسم، والعلامة حقول مطلوبة");
      return;
    }
    setBusy(true);
    try {
      const base = {
        name: form.name,
        nameEn: form.nameEn || form.name,
        description: form.description || "—",
        price: Number(form.price),
        oldPrice: form.oldPrice ? Number(form.oldPrice) : undefined,
        categoryId: form.categoryId,
        brandId: form.brandId,
        quantity: Number(form.quantity) || 0,
        images: normalizeImg(form.imageUrl) ? [normalizeImg(form.imageUrl)] : undefined,
        isFeatured: form.isFeatured,
        isBestseller: form.isBestseller,
        isNew: form.isNew,
      };
      if (isEdit && product) {
        await productsApi.update(product.id, base);
      } else {
        await productsApi.create({ ...base, slug: `p-${Date.now()}` });
      }
      onSaved();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ، حاول مجدداً");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">{isEdit ? "تعديل منتج" : "إضافة منتج"}</h2>
          <button onClick={onClose} className="btn-ghost p-1"><X width={20} height={20} /></button>
        </div>

        {error && <div className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}

        <form onSubmit={submit} className="space-y-3">
          <Field label="اسم المنتج *"><input className="inp" value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="الاسم بالإنجليزي"><input className="inp" value={form.nameEn} onChange={(e) => set("nameEn", e.target.value)} /></Field>
          <Field label="الوصف"><textarea rows={2} className="inp resize-none" value={form.description} onChange={(e) => set("description", e.target.value)} /></Field>

          <div className="grid grid-cols-2 gap-3">
            <Field label="السعر (د.ل) *"><input type="number" className="inp" value={form.price} onChange={(e) => set("price", e.target.value)} /></Field>
            <Field label="السعر قبل الخصم"><input type="number" className="inp" value={form.oldPrice} onChange={(e) => set("oldPrice", e.target.value)} /></Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="القسم *">
              <select className="inp" value={form.categoryId} onChange={(e) => set("categoryId", e.target.value)}>
                <option value="">اختر القسم</option>
                {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </Field>
            <Field label="العلامة التجارية *">
              <select className="inp" value={form.brandId} onChange={(e) => set("brandId", e.target.value)}>
                <option value="">اختر العلامة</option>
                {brands.map((b) => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </Field>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Field label="الكمية في المخزون"><input type="number" className="inp" value={form.quantity} onChange={(e) => set("quantity", e.target.value)} /></Field>
            <Field label="رابط الصورة"><input className="inp" placeholder="/assets/products/p01.jpg" value={form.imageUrl} onChange={(e) => set("imageUrl", e.target.value)} /></Field>
          </div>

          <div className="flex flex-wrap gap-4 pt-1 text-sm">
            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-primary" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} /> مميّز</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-primary" checked={form.isBestseller} onChange={(e) => set("isBestseller", e.target.checked)} /> الأكثر مبيعاً</label>
            <label className="flex items-center gap-2"><input type="checkbox" className="h-4 w-4 accent-primary" checked={form.isNew} onChange={(e) => set("isNew", e.target.checked)} /> جديد</label>
          </div>

          <div className="flex gap-2 pt-3">
            <button type="submit" disabled={busy} className="btn-primary flex-1">{busy ? "جارٍ الحفظ…" : isEdit ? "حفظ التعديلات" : "إضافة المنتج"}</button>
            <button type="button" onClick={onClose} className="btn-outline">إلغاء</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .inp {
          height: 2.6rem; width: 100%; border: 1px solid #E5E7EB; border-radius: 0.5rem;
          padding: 0 0.75rem; font-size: 0.875rem; outline: none; background: #F8F8F8;
        }
        .inp:focus { border-color: #C8102E; }
        textarea.inp { height: auto; padding: 0.5rem 0.75rem; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-bold text-ink">{label}</span>
      {children}
    </label>
  );
}
