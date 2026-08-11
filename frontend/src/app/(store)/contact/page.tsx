"use client";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2 } from "lucide-react";
import { contactApi } from "@/lib/api/services";

export default function ContactPage() {
  const [sent, setSent] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const info = [
    { icon: Phone, label: "الهاتف", value: "094 563 9026" },
    { icon: Mail, label: "البريد", value: "omaralrajhi200@gmail.com" },
    { icon: MapPin, label: "العنوان", value: "طرابلس، ليبيا" },
    { icon: Clock, label: "أوقات العمل", value: "السبت - الخميس، 9 صباحاً - 2 ظهراً" },
  ];
  return (
    <div className="container-x py-10">
      <div className="text-center">
        <h1 className="text-3xl font-extrabold text-ink">تواصل معنا</h1>
        <p className="mt-2 text-muted">نسعد بخدمتك والإجابة على استفساراتك</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_1.4fr]">
        <div className="space-y-3">
          {info.map((c) => (
            <div key={c.label} className="card flex items-center gap-4 p-4">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-primary/10 text-primary"><c.icon width={20} height={20} /></span>
              <div>
                <p className="text-xs text-muted">{c.label}</p>
                <p dir="auto" className="text-sm font-bold text-ink">{c.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="card p-6">
          {sent ? (
            <div className="grid place-items-center py-12 text-center">
              <CheckCircle2 width={56} height={56} className="text-success" />
              <p className="mt-4 text-lg font-extrabold text-ink">تم إرسال رسالتك!</p>
              <p className="text-sm text-muted">سنتواصل معك في أقرب وقت.</p>
            </div>
          ) : (
            <form onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              setBusy(true);
              try {
                await contactApi.send(form);
                setSent(true);
              } catch (err) {
                setError(err instanceof Error ? err.message : "فشل إرسال الرسالة، حاول مجدداً");
              } finally {
                setBusy(false);
              }
            }} className="space-y-4">
              {error && <div className="rounded-lg bg-error/10 px-4 py-2.5 text-sm font-bold text-error">{error}</div>}
              <div className="grid gap-4 sm:grid-cols-2">
                <input required placeholder="الاسم" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="h-11 rounded-lg border border-line bg-bg px-4 text-sm outline-none focus:border-primary" />
                <input required type="tel" placeholder="رقم الهاتف" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="h-11 rounded-lg border border-line bg-bg px-4 text-sm outline-none focus:border-primary" />
              </div>
              <input type="email" placeholder="البريد الإلكتروني" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="h-11 w-full rounded-lg border border-line bg-bg px-4 text-sm outline-none focus:border-primary" />
              <textarea required rows={5} placeholder="رسالتك" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-lg border border-line bg-bg p-4 text-sm outline-none focus:border-primary" />
              <button disabled={busy} className="btn-primary w-full py-3"><Send width={18} height={18} /> {busy ? "جارٍ الإرسال…" : "إرسال الرسالة"}</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
