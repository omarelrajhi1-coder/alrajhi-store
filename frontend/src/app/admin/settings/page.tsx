"use client";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Save } from "lucide-react";
import { cmsApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";

interface StoreSettings { name?: string; phone?: string; email?: string; city?: string }
interface ShippingSettings { flatRate?: number; freeOver?: number }

export default function AdminSettings() {
  const { data, isLoading } = useQuery({ queryKey: ["admin", "settings"], queryFn: cmsApi.settings });
  const [store, setStore] = useState<StoreSettings>({});
  const [shipping, setShipping] = useState<ShippingSettings>({});
  const [saved, setSaved] = useState(false);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (data) {
      setStore((data.store as StoreSettings) ?? {});
      setShipping((data.shipping as ShippingSettings) ?? {});
    }
  }, [data]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setSaved(false);
    try {
      await cmsApi.setSetting("store", store);
      await cmsApi.setSetting("shipping", { flatRate: Number(shipping.flatRate) || 0, freeOver: Number(shipping.freeOver) || 0 });
      setSaved(true);
    } catch (err) {
      window.alert("فشل الحفظ: " + (err instanceof Error ? err.message : ""));
    } finally { setBusy(false); }
  }

  if (isLoading) return <div className="card py-16 text-center text-sm text-muted">جارٍ التحميل…</div>;

  return (
    <div>
      <PageHeader title="إعدادات المتجر" desc="معلومات المتجر والتوصيل" />
      <form onSubmit={save} className="max-w-xl space-y-6">
        <div className="card p-5">
          <h3 className="mb-4 font-extrabold text-ink">معلومات المتجر</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="اسم المتجر"><input className="sin" value={store.name ?? ""} onChange={(e) => setStore({ ...store, name: e.target.value })} /></Field>
            <Field label="الهاتف"><input className="sin" value={store.phone ?? ""} onChange={(e) => setStore({ ...store, phone: e.target.value })} /></Field>
            <Field label="البريد الإلكتروني"><input className="sin" value={store.email ?? ""} onChange={(e) => setStore({ ...store, email: e.target.value })} /></Field>
            <Field label="المدينة"><input className="sin" value={store.city ?? ""} onChange={(e) => setStore({ ...store, city: e.target.value })} /></Field>
          </div>
        </div>

        <div className="card p-5">
          <h3 className="mb-4 font-extrabold text-ink">التوصيل</h3>
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="سعر التوصيل الثابت (د.ل)"><input type="number" className="sin" value={shipping.flatRate ?? ""} onChange={(e) => setShipping({ ...shipping, flatRate: Number(e.target.value) })} /></Field>
            <Field label="توصيل مجاني فوق (د.ل)"><input type="number" className="sin" value={shipping.freeOver ?? ""} onChange={(e) => setShipping({ ...shipping, freeOver: Number(e.target.value) })} /></Field>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button disabled={busy} className="btn-primary"><Save width={16} height={16} /> {busy ? "جارٍ الحفظ…" : "حفظ الإعدادات"}</button>
          {saved && <span className="text-sm font-bold text-success">تم الحفظ ✓</span>}
        </div>
      </form>

      <style jsx>{`
        .sin { height: 2.6rem; width: 100%; border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 0 0.75rem; font-size: 0.875rem; outline: none; background: #F8F8F8; }
        .sin:focus { border-color: #C8102E; }
      `}</style>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-bold text-ink">{label}</span>{children}</label>;
}
