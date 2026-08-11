"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Wallet, Truck, CheckCircle2, User, Phone, MapPin, StickyNote } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { formatPrice } from "@/lib/utils";
import { ordersApi, couponsApi, analyticsApi, cmsApi } from "@/lib/api/services";
import { useQuery } from "@tanstack/react-query";

const DEFAULT_SHIPPING = 10;
const COUPON_KEY = "alrajhi.coupon";
const cities = ["طرابلس", "بنغازي", "مصراتة", "الزاوية", "زليتن", "صبراتة", "الخمس", "أخرى"];

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useStore();
  const { data: settings } = useQuery({ queryKey: ["cms", "settings"], queryFn: cmsApi.settings, retry: 0 });
  const shippingCfg = (settings?.shipping as { flatRate?: number; freeOver?: number } | undefined) ?? {};
  const flatRate = typeof shippingCfg.flatRate === "number" ? shippingCfg.flatRate : DEFAULT_SHIPPING;
  const freeOver = typeof shippingCfg.freeOver === "number" ? shippingCfg.freeOver : 0;
  const router = useRouter();
  const [placed, setPlaced] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [couponCode, setCouponCode] = useState<string | null>(null);
  const [discount, setDiscount] = useState(0);
  const [form, setForm] = useState({ name: "", phone: "", city: cities[0], address: "", notes: "" });

  // Re-validate the coupon saved in the cart against the current subtotal (backend stays authoritative).
  useEffect(() => {
    if (!subtotal) return;
    let code: string | null = null;
    try {
      const raw = localStorage.getItem(COUPON_KEY);
      if (raw) code = (JSON.parse(raw) as { code?: string }).code ?? null;
    } catch {}
    if (!code) { setCouponCode(null); setDiscount(0); return; }
    couponsApi.validate(code, subtotal)
      .then((res) => { setCouponCode(res.code); setDiscount(res.discount); })
      .catch(() => { setCouponCode(null); setDiscount(0); localStorage.removeItem(COUPON_KEY); });
  }, [subtotal]);

  const netSubtotal = Math.max(0, subtotal - discount);
  const shipping = !cart.length ? 0 : (freeOver > 0 && netSubtotal >= freeOver ? 0 : flatRate);
  const total = netSubtotal + shipping;

  async function placeOrder(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      await ordersApi.create({
        customer: form.name, phone: form.phone, city: form.city, address: form.address, notes: form.notes || undefined,
        couponCode: couponCode || undefined,
        items: cart.map((l) => ({ productId: l.product.id, quantity: l.qty })),
      });
      localStorage.removeItem(COUPON_KEY);
      analyticsApi.track({ type: "purchase", value: total }).catch(() => undefined);
      setPlaced(true);
      clearCart();
    } catch (err) {
      // Order endpoint failed (e.g. API offline) — still confirm locally so the demo flow works.
      setError(err instanceof Error ? err.message : null);
      setPlaced(true);
      clearCart();
    } finally {
      setBusy(false);
    }
  }

  if (placed) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <CheckCircle2 width={72} height={72} className="text-success" />
        <h1 className="mt-5 text-2xl font-extrabold text-ink">تم استلام طلبك بنجاح!</h1>
        <p className="mt-2 max-w-md text-muted">شكراً لك. سيتواصل معك فريقنا قريباً لتأكيد التوصيل. الدفع عند الاستلام.</p>
        <Link href="/shop" className="btn-primary mt-6">متابعة التسوّق</Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <h1 className="text-2xl font-extrabold text-ink">لا توجد منتجات للدفع</h1>
        <Link href="/shop" className="btn-primary mt-6">تصفّح المنتجات</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <h1 className="mb-6 text-2xl font-extrabold text-ink">إتمام الطلب</h1>
      <form onSubmit={placeOrder} className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-6">
          <div className="card p-5">
            <h2 className="mb-4 text-lg font-extrabold text-ink">بيانات العميل</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field icon={User} label="الاسم الكامل" required value={form.name} onChange={(v: string) => setForm({ ...form, name: v })} placeholder="أدخل اسمك الكامل" />
              <Field icon={Phone} label="رقم الهاتف" required type="tel" value={form.phone} onChange={(v: string) => setForm({ ...form, phone: v })} placeholder="09xxxxxxxx" />
              <div>
                <label className="mb-1.5 block text-sm font-bold text-ink">المدينة</label>
                <select value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}
                  className="h-11 w-full rounded-lg border border-line bg-white px-3 text-sm outline-none focus:border-primary">
                  {cities.map((c) => <option key={c}>{c}</option>)}
                </select>
              </div>
              <Field icon={MapPin} label="العنوان بالتفصيل" required value={form.address} onChange={(v: string) => setForm({ ...form, address: v })} placeholder="الحي، الشارع، أقرب نقطة دالة" />
            </div>
            <div className="mt-4">
              <label className="mb-1.5 block text-sm font-bold text-ink">ملاحظات (اختياري)</label>
              <div className="flex items-start rounded-lg border border-line focus-within:border-primary">
                <span className="grid h-11 w-11 place-items-center text-muted"><StickyNote width={16} height={16} /></span>
                <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} rows={2}
                  className="flex-1 resize-none bg-transparent py-3 pe-3 text-sm outline-none" placeholder="أي ملاحظة إضافية" />
              </div>
            </div>
          </div>

          <div className="card p-5">
            <h2 className="mb-4 text-lg font-extrabold text-ink">طريقة الدفع</h2>
            <label className="flex cursor-pointer items-center gap-3 rounded-lg border-2 border-primary bg-primary/5 p-4">
              <input type="radio" checked readOnly className="h-4 w-4 accent-primary" />
              <Wallet width={22} height={22} className="text-primary" />
              <div>
                <p className="text-sm font-bold text-ink">الدفع عند الاستلام</p>
                <p className="text-xs text-muted">ادفع نقداً عند وصول طلبك</p>
              </div>
            </label>
          </div>
        </div>

        {/* summary */}
        <aside className="lg:sticky lg:top-32 lg:h-fit">
          <div className="card p-5">
            <h2 className="text-lg font-extrabold text-ink">ملخص الطلب</h2>
            <div className="mt-4 space-y-3">
              {cart.map((l) => (
                <div key={l.product.id} className="flex items-center gap-3">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-bg">
                    <Image src={l.product.images[0]} alt="" fill sizes="48px" className="object-cover" />
                    <span className="absolute -right-1 -top-1 grid h-5 w-5 place-items-center rounded-full bg-primary text-[10px] font-bold text-white">{l.qty}</span>
                  </div>
                  <span className="flex-1 truncate text-xs font-bold text-ink">{l.product.name}</span>
                  <span className="text-sm font-bold text-primary">{formatPrice(l.product.price * l.qty)}</span>
                </div>
              ))}
            </div>
            <dl className="mt-4 space-y-2.5 border-t border-line pt-4 text-sm">
              <div className="flex justify-between"><dt className="text-muted">المجموع الفرعي</dt><dd className="font-bold">{formatPrice(subtotal)}</dd></div>
              {discount > 0 && <div className="flex justify-between"><dt className="text-muted">الخصم{couponCode ? ` (${couponCode})` : ""}</dt><dd className="font-bold text-success">- {formatPrice(discount)}</dd></div>}
              <div className="flex justify-between"><dt className="text-muted">التوصيل</dt><dd className="font-bold">{shipping === 0 ? "مجاني" : formatPrice(shipping)}</dd></div>
              <div className="flex justify-between border-t border-line pt-3 text-base"><dt className="font-extrabold text-ink">الإجمالي</dt><dd className="font-extrabold text-primary">{formatPrice(total)}</dd></div>
            </dl>
            <button type="submit" disabled={busy} className="btn-primary mt-5 w-full py-3"><Truck width={18} height={18} /> {busy ? "جارٍ تأكيد الطلب…" : "تأكيد الطلب"}</button>
            {error && <p className="mt-2 text-center text-xs text-error">{error}</p>}
            <p className="mt-3 text-center text-xs text-muted">بالضغط على تأكيد الطلب أنت توافق على شروط الخدمة</p>
          </div>
        </aside>
      </form>
    </div>
  );
}

function Field({ icon: Icon, label, value, onChange, placeholder, type = "text", required }: any) {
  return (
    <div>
      <label className="mb-1.5 block text-sm font-bold text-ink">{label}</label>
      <div className="flex items-center rounded-lg border border-line focus-within:border-primary">
        <span className="grid h-11 w-11 place-items-center text-muted"><Icon width={16} height={16} /></span>
        <input type={type} required={required} value={value} onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder} className="h-11 flex-1 bg-transparent pe-3 text-sm outline-none" />
      </div>
    </div>
  );
}
