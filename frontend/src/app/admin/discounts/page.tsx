"use client";
import Image from "next/image";
import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Search, Percent, X } from "lucide-react";
import { useCatalog } from "@/lib/api/hooks";
import { productsApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import { cn, formatPrice, discountPercent, isImageSrc } from "@/lib/utils";

export default function AdminDiscounts() {
  const { products } = useCatalog();
  const qc = useQueryClient();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState<string | null>(null);
  const [onlyDiscounted, setOnlyDiscounted] = useState(false);

  const refresh = () => qc.invalidateQueries({ queryKey: ["catalog"] });

  const rows = [...products].reverse().filter((p) => {
    if (onlyDiscounted && !(p.oldPrice && p.oldPrice > p.price)) return false;
    return p.name.includes(q);
  }).slice(0, 200);

  async function addDiscount(id: string, currentPrice: number, currentOld: number | undefined) {
    const val = window.prompt("نسبة الخصم % (مثلاً 20):", "20");
    if (val === null) return;
    const pct = Number(val);
    if (Number.isNaN(pct) || pct <= 0 || pct >= 100) { window.alert("أدخل نسبة بين 1 و 99"); return; }
    const original = currentOld && currentOld > currentPrice ? currentOld : currentPrice;
    const newPrice = Math.round(original * (1 - pct / 100));
    setBusy(id);
    try { await productsApi.update(id, { price: newPrice, oldPrice: original }); await refresh(); }
    catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
    finally { setBusy(null); }
  }

  async function removeDiscount(id: string, oldPrice: number) {
    setBusy(id);
    try { await productsApi.update(id, { price: oldPrice, oldPrice: null } as unknown as Record<string, unknown>); await refresh(); }
    catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
    finally { setBusy(null); }
  }

  return (
    <div>
      <PageHeader title="العروض والتخفيضات" desc="أضِف خصمًا على أي منتج أو ألغِه" />

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="flex items-center rounded-lg border border-line bg-white">
          <span className="grid h-10 w-10 place-items-center text-muted"><Search width={16} height={16} /></span>
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="بحث بالاسم…" className="h-10 w-56 bg-transparent pe-3 text-sm outline-none" />
        </div>
        <label className="flex items-center gap-2 text-sm font-bold text-ink">
          <input type="checkbox" className="h-4 w-4 accent-primary" checked={onlyDiscounted} onChange={(e) => setOnlyDiscounted(e.target.checked)} />
          المخفّضة فقط
        </label>
      </div>

      <div className="card overflow-x-auto">
        <table className="w-full min-w-[720px] text-sm">
          <thead>
            <tr className="border-b border-line text-right text-xs text-muted">
              <th className="px-4 py-3 font-bold">المنتج</th>
              <th className="px-4 py-3 font-bold">السعر الحالي</th>
              <th className="px-4 py-3 font-bold">قبل الخصم</th>
              <th className="px-4 py-3 font-bold">الخصم</th>
              <th className="px-4 py-3 font-bold">إجراء</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((p) => {
              const disc = discountPercent(p.price, p.oldPrice);
              return (
                <tr key={p.id} className={cn("border-b border-line/60 last:border-0 hover:bg-bg", busy === p.id && "opacity-50")}>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-bg">
                        {isImageSrc(p.images[0]) && <Image src={p.images[0]} alt="" fill sizes="40px" className="object-cover" />}
                      </div>
                      <span className="font-bold text-ink line-clamp-1">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-primary">{formatPrice(p.price)}</td>
                  <td className="px-4 py-3 text-muted">{p.oldPrice && p.oldPrice > p.price ? <span className="line-through">{formatPrice(p.oldPrice)}</span> : "—"}</td>
                  <td className="px-4 py-3">{disc ? <span className="chip bg-primary/10 text-primary">-{disc}%</span> : "—"}</td>
                  <td className="px-4 py-3">
                    {disc ? (
                      <button onClick={() => removeDiscount(p.id, p.oldPrice!)} disabled={busy === p.id}
                        className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1 text-xs font-bold hover:border-error hover:text-error">
                        <X width={13} height={13} /> إلغاء الخصم
                      </button>
                    ) : (
                      <button onClick={() => addDiscount(p.id, p.price, p.oldPrice)} disabled={busy === p.id}
                        className="inline-flex items-center gap-1 rounded-lg border border-line px-3 py-1 text-xs font-bold hover:border-primary hover:text-primary">
                        <Percent width={13} height={13} /> أضف خصم
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
