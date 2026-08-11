"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Trash2, Minus, Plus, ShoppingBag, Tag, ArrowLeft, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { couponsApi, cmsApi } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_SHIPPING = 10;
const COUPON_KEY = "alrajhi.coupon";

export default function CartPage() {
  const { cart, setQty, removeFromCart, subtotal } = useStore();
  const { data: settings } = useQuery({ queryKey: ["cms", "settings"], queryFn: cmsApi.settings, retry: 0 });
  const shippingCfg = (settings?.shipping as { flatRate?: number; freeOver?: number } | undefined) ?? {};
  const flatRate = typeof shippingCfg.flatRate === "number" ? shippingCfg.flatRate : DEFAULT_SHIPPING;
  const freeOver = typeof shippingCfg.freeOver === "number" ? shippingCfg.freeOver : 0;
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(0);
  const [couponMsg, setCouponMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const [couponBusy, setCouponBusy] = useState(false);

  // Restore a previously applied coupon (persisted so checkout can use it too).
  useEffect(() => {
    try {
      const raw = localStorage.getItem(COUPON_KEY);
      if (raw) {
        const saved = JSON.parse(raw) as { code: string; discount: number };
        if (saved?.code) {
          setCoupon(saved.code);
          setApplied(saved.discount || 0);
          setCouponMsg({ ok: true, text: `تم تطبيق الخصم: -${formatPrice(saved.discount || 0)}` });
        }
      }
    } catch {}
  }, []);

  async function applyCoupon() {
    if (!coupon.trim()) return;
    setCouponBusy(true);
    setCouponMsg(null);
    try {
      const res = await couponsApi.validate(coupon.trim(), subtotal);
      setApplied(res.discount);
      setCouponMsg({ ok: true, text: `تم تطبيق الخصم: -${formatPrice(res.discount)}` });
      localStorage.setItem(COUPON_KEY, JSON.stringify({ code: coupon.trim().toUpperCase(), discount: res.discount }));
    } catch (e) {
      setApplied(0);
      localStorage.removeItem(COUPON_KEY);
      setCouponMsg({ ok: false, text: e instanceof Error ? e.message : "كود غير صالح" });
    } finally {
      setCouponBusy(false);
    }
  }

  function removeCoupon() {
    setCoupon("");
    setApplied(0);
    setCouponMsg(null);
    localStorage.removeItem(COUPON_KEY);
  }

  const netSubtotal = Math.max(0, subtotal - applied);
  const shipping = !cart.length ? 0 : (freeOver > 0 && netSubtotal >= freeOver ? 0 : flatRate);
  const total = Math.max(0, subtotal - applied) + shipping;

  if (cart.length === 0) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <span className="grid h-20 w-20 place-items-center rounded-full bg-bg text-muted"><ShoppingBag width={36} height={36} /></span>
        <h1 className="mt-5 text-2xl font-extrabold text-ink">سلتك فارغة</h1>
        <p className="mt-1 text-muted">ابدأ التسوّق وأضف منتجاتك المفضلة</p>
        <Link href="/shop" className="btn-primary mt-6">متابعة التسوّق</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-ink">سلة التسوّق ({cart.length})</h1>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-3">
          {cart.map((l) => (
            <div key={l.product.id} className="card flex gap-4 p-3">
              <Link href={`/product/${l.product.slug}`} className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-bg">
                <Image src={l.product.images[0]} alt={l.product.name} fill sizes="96px" className="object-cover" />
              </Link>
              <div className="flex flex-1 flex-col justify-between">
                <div className="flex items-start justify-between gap-2">
                  <Link href={`/product/${l.product.slug}`} className="text-sm font-bold text-ink hover:text-primary">{l.product.name}</Link>
                  <button onClick={() => removeFromCart(l.product.id)} className="text-muted hover:text-error" aria-label="حذف"><Trash2 width={18} height={18} /></button>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center rounded-lg border border-line">
                    <button onClick={() => setQty(l.product.id, l.qty - 1)} className="grid h-8 w-8 place-items-center hover:text-primary"><Minus width={14} height={14} /></button>
                    <span className="w-8 text-center text-sm font-bold">{l.qty}</span>
                    <button onClick={() => setQty(l.product.id, l.qty + 1)} className="grid h-8 w-8 place-items-center hover:text-primary"><Plus width={14} height={14} /></button>
                  </div>
                  <span className="font-extrabold text-primary">{formatPrice(l.product.price * l.qty)}</span>
                </div>
              </div>
            </div>
          ))}
          <Link href="/shop" className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:gap-2">
            <ArrowLeft width={16} height={16} /> متابعة التسوّق
          </Link>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">ملخص الطلب</h2>
            <div className="mt-4 flex overflow-hidden rounded-lg border border-line">
              <span className="grid w-10 place-items-center text-muted"><Tag width={16} height={16} /></span>
              <input value={coupon} onChange={(e) => setCoupon(e.target.value)} placeholder="كود الخصم"
                className="h-10 flex-1 bg-transparent text-sm outline-none" />
              {applied > 0
                ? <button onClick={removeCoupon} className="grid w-10 place-items-center text-muted hover:text-error" aria-label="إزالة الكوبون"><X width={16} height={16} /></button>
                : <button onClick={applyCoupon} disabled={couponBusy} className="px-3 text-sm font-bold text-primary disabled:opacity-50">{couponBusy ? "…" : "تطبيق"}</button>}
            </div>
            {couponMsg && <p className={couponMsg.ok ? "mt-2 text-xs font-bold text-success" : "mt-2 text-xs font-bold text-error"}>{couponMsg.text}</p>}
            <dl className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm">
              <Row label="المجموع الفرعي" value={formatPrice(subtotal)} />
              {applied > 0 && <Row label="الخصم" value={`- ${formatPrice(applied)}`} accent="success" />}
              <Row label="التوصيل" value={formatPrice(shipping)} />
              <div className="flex items-center justify-between border-t border-line pt-3 text-base">
                <dt className="font-extrabold text-ink">الإجمالي</dt>
                <dd className="font-extrabold text-primary">{formatPrice(total)}</dd>
              </div>
            </dl>
            <Link href="/checkout" className="btn-primary mt-5 w-full py-3">إتمام الطلب</Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: string; accent?: "success" }) {
  return (
    <div className="flex items-center justify-between">
      <dt className="text-muted">{label}</dt>
      <dd className={accent === "success" ? "font-bold text-success" : "font-bold text-ink"}>{value}</dd>
    </div>
  );
}
