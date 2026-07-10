"use client";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2, Search } from "lucide-react";
import type { Product } from "@/types";
import { useCatalog } from "@/lib/api/hooks";
import { productsApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import ProductFormModal from "@/components/admin/ProductFormModal";
import { cn, formatPrice, isImageSrc } from "@/lib/utils";

export default function AdminProducts() {
  const { products, categories, brands, isLoading } = useCatalog();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [deleting, setDeleting] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);

  // Newest additions first so freshly-added products are visible immediately.
  const rows = [...products]
    .reverse()
    .filter((p) => (!cat || p.categorySlug === cat) && p.name.includes(q))
    .slice(0, 200);

  const refresh = () => qc.invalidateQueries({ queryKey: ["catalog"] });

  function openAdd() { setEditing(null); setModalOpen(true); }
  function openEdit(p: Product) { setEditing(p); setModalOpen(true); }

  async function handleDelete(id: string, name: string) {
    if (!window.confirm(`هل تريد حذف "${name}"؟`)) return;
    setDeleting(id);
    try {
      await productsApi.remove(id);
      await refresh();
    } catch (e) {
      window.alert("فشل الحذف: " + (e instanceof Error ? e.message : "حاول مجدداً"));
    } finally {
      setDeleting(null);
    }
  }

  return (
    <div>
      <PageHeader title="المنتجات" desc={`${products.length} منتج في المتجر`}
        action={<button onClick={openAdd} className="btn-primary"><Plus width={16} height={16} /> إضافة منتج</button>} />

      <div className="mb-4 flex flex-wrap gap-3">
        <div className="flex items-center rounded-lg border border-line bg-white">
          <span className="grid h-10 w-10 place-items-center text-muted"><Search width={16} height={16} /></span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم…" className="h-10 w-56 bg-transparent pe-3 text-sm outline-none" />
        </div>
        <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-10 rounded-lg border border-line bg-white px-3 text-sm font-bold outline-none">
          <option value="">كل الأقسام</option>
          {categories.map((c) => <option key={c.id} value={c.slug}>{c.name}</option>)}
        </select>
      </div>

      <div className="card overflow-x-auto">
        {isLoading ? (
          <div className="py-16 text-center text-sm text-muted">جارٍ تحميل المنتجات…</div>
        ) : (
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-right text-xs text-muted">
              <th className="px-4 py-3 font-bold">المنتج</th>
              <th className="px-4 py-3 font-bold">القسم</th>
              <th className="px-4 py-3 font-bold">السعر</th>
              <th className="px-4 py-3 font-bold">المخزون</th>
              <th className="px-4 py-3 font-bold">التقييم</th>
              <th className="px-4 py-3 font-bold">إجراءات</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => (
              <tr key={p.id} className={cn("border-b border-line/60 last:border-0 hover:bg-bg", deleting === p.id && "opacity-50")}>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bg">
                      {isImageSrc(p.images[0]) && <Image src={p.images[0]} alt="" fill sizes="44px" className="object-cover" />}
                    </div>
                    <span className="font-bold text-ink line-clamp-1">{p.name}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-muted">{categories.find((c) => c.slug === p.categorySlug)?.name}</td>
                <td className="px-4 py-3 font-bold text-primary">{formatPrice(p.price)}</td>
                <td className="px-4 py-3">
                  <span className={cn("chip", p.inStock ? "bg-success/15 text-success" : "bg-error/10 text-error")}>
                    {p.inStock ? "متوفر" : "نفد"}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted">{p.rating} ★</td>
                <td className="px-4 py-3">
                  <div className="flex gap-1">
                    <button onClick={() => openEdit(p)} className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink hover:border-primary hover:text-primary"><Pencil width={15} height={15} /></button>
                    <button
                      onClick={() => handleDelete(p.id, p.name)}
                      disabled={deleting === p.id}
                      className="grid h-8 w-8 place-items-center rounded-lg border border-line text-ink hover:border-error hover:text-error disabled:opacity-50">
                      <Trash2 width={15} height={15} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        )}
      </div>

      <ProductFormModal
        key={editing?.id ?? "new"}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        onSaved={refresh}
        product={editing}
        categories={categories}
        brands={brands}
      />
    </div>
  );
}
