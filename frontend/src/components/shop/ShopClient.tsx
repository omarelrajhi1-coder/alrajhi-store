"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { SlidersHorizontal, X } from "lucide-react";
import { useCatalog } from "@/lib/api/hooks";
import ProductCard from "@/components/ProductCard";
import RatingStars from "@/components/ui/RatingStars";
import { cn, formatPrice } from "@/lib/utils";

// Normalizes Arabic text so search ignores hamza forms, diacritics and tatweel.
function normalizeAr(s: string): string {
  return (s || "")
    .toLowerCase()
    .replace(/[\u0617-\u061A\u064B-\u0652\u0670\u0640]/g, "")
    .replace(/[\u0623\u0625\u0622\u0671]/g, "\u0627")
    .replace(/\u0649/g, "\u064A")
    .replace(/\u0624/g, "\u0648")
    .replace(/\u0626/g, "\u064A")
    .replace(/\u0629/g, "\u0647")
    .trim();
}

const PAGE_SIZE = 12;
const sortOptions = [
  { v: "featured", l: "المميزة" },
  { v: "price-asc", l: "السعر: من الأقل" },
  { v: "price-desc", l: "السعر: من الأعلى" },
  { v: "rating", l: "الأعلى تقييماً" },
  { v: "new", l: "الأحدث" },
];

export default function ShopClient() {
  const params = useSearchParams();
  const { products, categories, brands } = useCatalog();
  const initialCat = params.get("category") ?? "";
  const query = (params.get("q") ?? "").trim();

  const [cats, setCats] = useState<string[]>(initialCat ? [initialCat] : []);
  const [brandIds, setBrandIds] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [drawer, setDrawer] = useState(false);

  // Slider max adapts to the priciest product so expensive items are never hidden by default.
  const ceilPrice = useMemo(() => {
    const top = products.reduce((m, p) => Math.max(m, p.price), 0);
    return Math.max(300, Math.ceil(top / 100) * 100);
  }, [products]);
  const effMax = maxPrice ?? ceilPrice;

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (cats.length && !cats.includes(p.categorySlug)) return false;
      if (brandIds.length && !brandIds.includes(p.brandId)) return false;
      if (p.price > effMax) return false;
      if (inStockOnly && !p.inStock) return false;
      if (minRating && p.rating < minRating) return false;
      if (query) {
        const hay = normalizeAr(`${p.name} ${p.nameEn} ${p.categoryName ?? ""} ${p.brandName ?? ""}`);
        if (!hay.includes(normalizeAr(query))) return false;
      }
      return true;
    });
    switch (sort) {
      case "price-asc": list = [...list].sort((a, b) => a.price - b.price); break;
      case "price-desc": list = [...list].sort((a, b) => b.price - a.price); break;
      case "rating": list = [...list].sort((a, b) => b.rating - a.rating); break;
      case "new": list = [...list].sort((a, b) => Number(b.isNew) - Number(a.isNew)); break;
      default: list = [...list].sort((a, b) => Number(b.isFeatured) - Number(a.isFeatured));
    }
    return list;
  }, [cats, brandIds, effMax, inStockOnly, minRating, sort, query]);

  const pages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const shown = filtered.slice((current - 1) * PAGE_SIZE, current * PAGE_SIZE);

  function toggle<T>(arr: T[], v: T, set: (x: T[]) => void) {
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);
    setPage(1);
  }

  const Filters = (
    <div className="space-y-6">
      <FilterBlock title="الأقسام">
        {categories.map((c) => (
          <label key={c.id} className="flex cursor-pointer items-center justify-between py-1 text-sm">
            <span className="flex items-center gap-2">
              <input type="checkbox" checked={cats.includes(c.slug)} onChange={() => toggle(cats, c.slug, setCats)}
                className="h-4 w-4 accent-primary" />
              {c.name}
            </span>
            <span className="text-xs text-muted">{c.count}</span>
          </label>
        ))}
      </FilterBlock>

      <FilterBlock title="العلامة التجارية">
        {brands.map((b) => (
          <label key={b.id} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
            <input type="checkbox" checked={brandIds.includes(b.id)} onChange={() => toggle(brandIds, b.id, setBrandIds)}
              className="h-4 w-4 accent-primary" />
            {b.name}
          </label>
        ))}
      </FilterBlock>

      <FilterBlock title="السعر">
        <input type="range" min={40} max={ceilPrice} step={10} value={effMax}
          onChange={(e) => { setMaxPrice(Number(e.target.value)); setPage(1); }}
          className="w-full accent-primary" />
        <div className="mt-1 flex justify-between text-xs text-muted">
          <span>40 د.ل</span><span className="font-bold text-ink">حتى {formatPrice(effMax)}</span>
        </div>
      </FilterBlock>

      <FilterBlock title="التوفر">
        <label className="flex cursor-pointer items-center gap-2 py-1 text-sm">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => { setInStockOnly(e.target.checked); setPage(1); }}
            className="h-4 w-4 accent-primary" />
          المتوفر فقط
        </label>
      </FilterBlock>

      <FilterBlock title="التقييم">
        {[4, 3, 0].map((r) => (
          <label key={r} className="flex cursor-pointer items-center gap-2 py-1 text-sm">
            <input type="radio" name="rating" checked={minRating === r} onChange={() => { setMinRating(r); setPage(1); }}
              className="h-4 w-4 accent-primary" />
            {r === 0 ? "الكل" : <span className="flex items-center gap-1"><RatingStars value={r} /> فأعلى</span>}
          </label>
        ))}
      </FilterBlock>
    </div>
  );

  return (
    <div className="container-x py-8">
      <div className="mb-6 flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-ink">المنتجات</h1>
          <p className="text-sm text-muted">{filtered.length} منتج{query && ` لـ "${query}"`}</p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDrawer(true)} className="btn-outline lg:hidden">
            <SlidersHorizontal width={16} height={16} /> تصفية
          </button>
          <select value={sort} onChange={(e) => setSort(e.target.value)}
            className="h-10 rounded-lg border border-line bg-white px-3 text-sm font-bold outline-none focus:border-primary">
            {sortOptions.map((o) => <option key={o.v} value={o.v}>{o.l}</option>)}
          </select>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
        <aside className="hidden lg:block">
          <div className="card sticky top-32 p-5">{Filters}</div>
        </aside>

        <div>
          {shown.length === 0 ? (
            <div className="card grid place-items-center py-24 text-center">
              <p className="text-lg font-bold text-ink">لا توجد منتجات مطابقة</p>
              <p className="text-sm text-muted">جرّب تعديل خيارات التصفية</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-4">
              {shown.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
            </div>
          )}

          {pages > 1 && (
            <div className="mt-8 flex justify-center gap-1">
              {Array.from({ length: pages }).map((_, i) => (
                <button key={i} onClick={() => setPage(i + 1)}
                  className={cn("grid h-9 w-9 place-items-center rounded-lg border text-sm font-bold",
                    current === i + 1 ? "border-primary bg-primary text-white" : "border-line bg-white text-ink hover:border-primary")}>
                  {i + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {drawer && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setDrawer(false)} />
          <div className="absolute inset-y-0 right-0 w-80 max-w-[85%] overflow-y-auto bg-white p-5 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-extrabold">التصفية</h3>
              <button onClick={() => setDrawer(false)} className="btn-ghost p-2"><X width={20} height={20} /></button>
            </div>
            {Filters}
            <button onClick={() => setDrawer(false)} className="btn-primary mt-6 w-full">عرض النتائج ({filtered.length})</button>
          </div>
        </div>
      )}
    </div>
  );
}

function FilterBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h4 className="mb-2 text-sm font-extrabold text-ink">{title}</h4>
      <div className="border-t border-line pt-2">{children}</div>
    </div>
  );
}
