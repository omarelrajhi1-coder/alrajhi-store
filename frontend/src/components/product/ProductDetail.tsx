"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { Minus, Plus, ShoppingCart, Heart, Truck, ShieldCheck, RotateCcw, Check, ChevronLeft } from "lucide-react";
import type { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { getBrand, getCategory } from "@/data/catalogue";
import { cn, discountPercent, safeImg } from "@/lib/utils";
import RatingStars from "@/components/ui/RatingStars";
import Price from "@/components/ui/Price";
import ProductCard from "@/components/ProductCard";
import ReviewForm from "./ReviewForm";

const tabs = [
  { id: "desc", label: "الوصف" },
  { id: "specs", label: "المواصفات" },
  { id: "reviews", label: "التقييمات" },
];

const trustBadges = [
  { icon: Truck, label: "توصيل سريع" },
  { icon: ShieldCheck, label: "ضمان سنة" },
  { icon: RotateCcw, label: "إرجاع سهل" },
];

export default function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const [active, setActive] = useState(product.images[0]);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState("desc");
  const [added, setAdded] = useState(false);
  const disc = discountPercent(product.price, product.oldPrice);
  // Prefer API-provided names; fall back to local lookups for mock data.
  const brandName = product.brandName ?? getBrand(product.brandId)?.name;
  const categoryName = product.categoryName ?? getCategory(product.categorySlug)?.name;
  const categorySlug = product.categorySlug;

  function handleAdd() {
    addToCart(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="container-x py-8">
      {/* breadcrumb */}
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/" className="hover:text-primary">الرئيسية</Link><ChevronLeft width={13} height={13} />
        <Link href="/shop" className="hover:text-primary">المنتجات</Link><ChevronLeft width={13} height={13} />
        {categoryName && <><Link href={`/shop?category=${categorySlug}`} className="hover:text-primary">{categoryName}</Link><ChevronLeft width={13} height={13} /></>}
        <span className="text-ink">{product.name}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* gallery */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex gap-3 sm:flex-col">
            {product.images.map((img) => (
              <button key={img} onClick={() => setActive(img)}
                className={cn("relative h-20 w-20 overflow-hidden rounded-lg border-2 bg-bg",
                  active === img ? "border-primary" : "border-line hover:border-muted")}>
                <Image src={safeImg(img)} alt="" fill sizes="80px" className="object-cover" />
              </button>
            ))}
          </div>
          <div className="group relative aspect-square flex-1 overflow-hidden rounded-2xl border border-line bg-bg">
            <Image src={safeImg(active)} alt={product.name} fill priority sizes="50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-110" />
            {disc && <span className="chip absolute right-4 top-4 bg-primary text-white">-{disc}%</span>}
          </div>
        </div>

        {/* info */}
        <div>
          {brandName && <span className="text-sm font-bold text-muted">{brandName}</span>}
          <h1 className="mt-1 text-2xl font-extrabold text-ink sm:text-3xl">{product.name}</h1>
          <div className="mt-3 flex items-center gap-3">
            <RatingStars value={product.rating} showValue count={product.reviewsCount} />
            <span className={cn("text-sm font-bold", product.inStock ? "text-success" : "text-error")}>
              {product.inStock ? "متوفر في المخزون" : "غير متوفر حالياً"}
            </span>
          </div>

          <div className="mt-5">
            <Price price={product.price} oldPrice={product.oldPrice} className="text-2xl" />
          </div>

          <p className="mt-5 text-sm leading-relaxed text-muted">{product.description}</p>

          {/* qty + actions */}
          <div className="mt-7 flex flex-wrap items-center gap-3">
            <div className="flex items-center rounded-lg border border-line">
              <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center text-ink hover:text-primary"><Minus width={16} height={16} /></button>
              <span className="w-10 text-center font-bold">{qty}</span>
              <button onClick={() => setQty((q) => q + 1)} className="grid h-11 w-11 place-items-center text-ink hover:text-primary"><Plus width={16} height={16} /></button>
            </div>
            <button onClick={handleAdd} disabled={!product.inStock} className="btn-primary h-11 flex-1 px-6 sm:flex-none sm:px-8">
              {added ? <><Check width={18} height={18} /> أُضيف للسلة</> : <><ShoppingCart width={18} height={18} /> أضف إلى السلة</>}
            </button>
            <button onClick={() => toggleWishlist(product.id)} aria-label="المفضلة"
              className={cn("grid h-11 w-11 place-items-center rounded-lg border border-line", isWished(product.id) ? "text-primary" : "text-ink hover:text-primary")}>
              <Heart width={20} height={20} className={cn(isWished(product.id) && "fill-primary")} />
            </button>
          </div>

          {/* trust badges */}
          <div className="mt-7 grid grid-cols-3 gap-3 border-t border-line pt-6 text-center">
            {trustBadges.map(({ icon: Icon, label }, i) => (
              <div key={i} className="flex flex-col items-center gap-1.5 text-xs font-bold text-muted">
                <Icon width={22} height={22} className="text-primary" />
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* tabs */}
      <div className="mt-12">
        <div className="flex gap-6 border-b border-line">
          {tabs.map((t) => (
            <button key={t.id} onClick={() => setTab(t.id)}
              className={cn("relative pb-3 text-sm font-bold transition-colors",
                tab === t.id ? "text-primary" : "text-muted hover:text-ink")}>
              {t.label}{t.id === "reviews" && ` (${product.reviewsCount})`}
              {tab === t.id && <motion.span layoutId="tab" className="absolute inset-x-0 -bottom-px h-0.5 bg-primary" />}
            </button>
          ))}
        </div>

        <div className="py-6">
          {tab === "desc" && <p className="max-w-3xl text-sm leading-loose text-muted">{product.description} {product.description}</p>}
          {tab === "specs" && (
            <div className="max-w-2xl overflow-hidden rounded-xl border border-line">
              {product.specs.map((s, i) => (
                <div key={i} className={cn("grid grid-cols-2 gap-4 px-4 py-3 text-sm", i % 2 ? "bg-white" : "bg-bg")}>
                  <span className="font-bold text-ink">{s.label}</span>
                  <span className="text-muted">{s.value}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "reviews" && (
            <div className="max-w-2xl space-y-4">
              <ReviewForm productId={product.id} />
              {(product.reviews ?? []).map((r) => (
                <div key={r.id} className="card p-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-ink">{r.author}</span>
                    <span className="text-xs text-muted">{r.date}</span>
                  </div>
                  <div className="mt-1"><RatingStars value={r.rating} /></div>
                  <p className="mt-2 text-sm text-muted">{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* related */}
      {related.length > 0 && (
        <div className="mt-12">
          <h2 className="section-title mb-6">منتجات ذات صلة</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {related.map((p, i) => <ProductCard key={p.id} product={p} index={i} />)}
          </div>
          </div>
      )}
    </div>
  );
}
