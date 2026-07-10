"use client";
import Link from "next/link";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { MapPin, ChevronLeft, Trash2, Pencil, Plus, Star } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { accountApi, Address } from "@/lib/api/services";
import { cn } from "@/lib/utils";

const cities = ["طرابلس", "بنغازي", "مصراتة", "الزاوية", "زليتن", "صبراتة", "الخمس", "أخرى"];
const empty = { fullName: "", phone: "", city: cities[0], line: "", isDefault: false };

export default function AddressesPage() {
  const { user, loading: authLoading } = useAuth();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["addresses"], queryFn: accountApi.listAddresses, enabled: Boolean(user),
  });
  const addresses = data ?? [];

  const [form, setForm] = useState(empty);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const refresh = () => qc.invalidateQueries({ queryKey: ["addresses"] });
  function resetForm() { setForm(empty); setEditingId(null); setError(null); }

  function startEdit(a: Address) {
    setEditingId(a.id);
    setForm({ fullName: a.fullName, phone: a.phone, city: a.city, line: a.line, isDefault: a.isDefault });
    setError(null);
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.fullName || !form.phone || !form.line) { setError("عبّئ الاسم والهاتف والعنوان"); return; }
    setBusy(true);
    try {
      if (editingId) await accountApi.updateAddress(editingId, form);
      else await accountApi.addAddress(form);
      await refresh();
      resetForm();
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
    } finally { setBusy(false); }
  }

  async function remove(id: string) {
    if (!window.confirm("حذف هذا العنوان؟")) return;
    try { await accountApi.removeAddress(id); await refresh(); if (editingId === id) resetForm(); }
    catch (err) { window.alert("فشل الحذف: " + (err instanceof Error ? err.message : "")); }
  }

  async function makeDefault(a: Address) {
    try { await accountApi.updateAddress(a.id, { isDefault: true }); await refresh(); }
    catch (err) { window.alert("فشل: " + (err instanceof Error ? err.message : "")); }
  }

  if (authLoading) return <div className="container-x py-24 text-center text-muted">جارٍ التحميل…</div>;
  if (!user) {
    return (
      <div className="container-x grid place-items-center py-24 text-center">
        <MapPin width={48} height={48} className="text-muted" />
        <h1 className="mt-4 text-xl font-extrabold text-ink">سجّل الدخول لإدارة عناوينك</h1>
        <Link href="/account" className="btn-primary mt-5">تسجيل الدخول</Link>
      </div>
    );
  }

  return (
    <div className="container-x py-8">
      <nav className="mb-6 flex items-center gap-1.5 text-xs text-muted">
        <Link href="/account" className="hover:text-primary">حسابي</Link>
        <ChevronLeft width={13} height={13} /><span className="text-ink">عناويني</span>
      </nav>
      <h1 className="mb-6 text-2xl font-extrabold text-ink">عناويني</h1>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        {/* list */}
        <div className="space-y-3">
          {isLoading ? (
            <div className="py-16 text-center text-muted">جارٍ التحميل…</div>
          ) : addresses.length === 0 ? (
            <div className="card grid place-items-center py-16 text-center">
              <MapPin width={40} height={40} className="text-muted" />
              <p className="mt-3 text-muted">لا توجد عناوين محفوظة — أضف عنوانك الأول</p>
            </div>
          ) : addresses.map((a) => (
            <div key={a.id} className={cn("card p-4", a.isDefault && "border-primary")}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="flex items-center gap-2 font-bold text-ink">
                    {a.fullName}
                    {a.isDefault && <span className="chip bg-primary/10 text-primary"><Star width={11} height={11} /> افتراضي</span>}
                  </p>
                  <p className="mt-1 text-sm text-muted">{a.city} — {a.line}</p>
                  <p className="text-sm text-muted">{a.phone}</p>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => startEdit(a)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary"><Pencil width={15} height={15} /></button>
                  <button onClick={() => remove(a.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error"><Trash2 width={15} height={15} /></button>
                </div>
              </div>
              {!a.isDefault && (
                <button onClick={() => makeDefault(a)} className="mt-2 text-xs font-bold text-primary hover:underline">تعيين كافتراضي</button>
              )}
            </div>
          ))}
        </div>

        {/* form */}
        <aside className="card h-fit p-5 lg:sticky lg:top-32">
          <h2 className="mb-4 flex items-center gap-2 text-lg font-extrabold text-ink">
            <Plus width={18} height={18} /> {editingId ? "تعديل العنوان" : "عنوان جديد"}
          </h2>
          {error && <div className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}
          <form onSubmit={save} className="space-y-3">
            <input className="ipt" placeholder="الاسم الكامل" value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
            <input className="ipt" placeholder="رقم الهاتف" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            <select className="ipt" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })}>
              {cities.map((c) => <option key={c}>{c}</option>)}
            </select>
            <textarea rows={2} className="ipt resize-none" placeholder="العنوان بالتفصيل (الحي، الشارع...)" value={form.line} onChange={(e) => setForm({ ...form, line: e.target.value })} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" className="h-4 w-4 accent-primary" checked={form.isDefault} onChange={(e) => setForm({ ...form, isDefault: e.target.checked })} /> اجعله العنوان الافتراضي</label>
            <div className="flex gap-2">
              <button disabled={busy} className="btn-primary flex-1">{busy ? "جارٍ…" : editingId ? "حفظ" : "إضافة"}</button>
              {editingId && <button type="button" onClick={resetForm} className="btn-outline">إلغاء</button>}
            </div>
          </form>
        </aside>
      </div>

      <style jsx>{`
        .ipt { height: 2.6rem; width: 100%; border: 1px solid #E5E7EB; border-radius: 0.5rem; padding: 0 0.75rem; font-size: 0.875rem; outline: none; background: #F8F8F8; }
        .ipt:focus { border-color: #C8102E; }
        textarea.ipt { height: auto; padding: 0.5rem 0.75rem; }
      `}</style>
    </div>
  );
}
