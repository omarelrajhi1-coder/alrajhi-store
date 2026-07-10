"use client";
import { useState } from "react";
import { X } from "lucide-react";
import { employeesApi, StaffRole } from "@/lib/api/services";

interface Props { open: boolean; onClose: () => void; onSaved: () => void; roles: StaffRole[] }

export default function EmployeeFormModal({ open, onClose, onSaved, roles }: Props) {
  const [form, setForm] = useState({ name: "", email: "", password: "", title: "", roleId: "" });
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  if (!open) return null;

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setError(null);
    if (!form.name || !form.email || form.password.length < 6) { setError("الاسم، البريد، وكلمة مرور (٦ أحرف+) مطلوبة"); return; }
    setBusy(true);
    try {
      await employeesApi.create({ name: form.name, email: form.email, password: form.password, title: form.title || undefined, roleId: form.roleId || undefined });
      onSaved(); onClose();
    } catch (err) { setError(err instanceof Error ? err.message : "فشل الحفظ"); }
    finally { setBusy(false); }
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-extrabold text-ink">موظف جديد</h2>
          <button onClick={onClose} className="btn-ghost p-1"><X width={20} height={20} /></button>
        </div>
        {error && <div className="mb-3 rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}
        <form onSubmit={submit} className="space-y-3">
          <input className="emp" placeholder="الاسم الكامل" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input className="emp" placeholder="البريد الإلكتروني" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
          <input className="emp" placeholder="كلمة المرور" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
          <input className="emp" placeholder="المسمّى الوظيفي (اختياري)" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
          <select className="emp" value={form.roleId} onChange={(e) => setForm({ ...form, roleId: e.target.value })}>
            <option value="">بدون دور محدّد</option>
            {roles.map((r) => <option key={r.id} value={r.id}>{r.name}</option>)}
          </select>
          <div className="flex gap-2 pt-2">
            <button disabled={busy} className="btn-primary flex-1">{busy ? "جارٍ…" : "إضافة الموظف"}</button>
            <button type="button" onClick={onClose} className="btn-outline">إلغاء</button>
          </div>
        </form>
        <style jsx>{`.emp{height:2.6rem;width:100%;border:1px solid #E5E7EB;border-radius:.5rem;padding:0 .75rem;font-size:.875rem;outline:none;background:#F8F8F8}.emp:focus{border-color:#C8102E}`}</style>
      </div>
    </div>
  );
}
