"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, User, Phone, LogOut, Package, Heart, MapPin } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export default function AccountPage() {
  const { user, loading, login, register, logout } = useAuth();
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [form, setForm] = useState({ name: "", phone: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "login") await login(form.email, form.password);
      else await register({ name: form.name, phone: form.phone || undefined, email: form.email, password: form.password });
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "حدث خطأ، حاول مجدداً");
    } finally {
      setBusy(false);
    }
  }

  if (loading) {
    return <div className="container-x py-24 text-center text-muted">جارٍ التحميل…</div>;
  }

  // Logged-in dashboard
  if (user) {
    return (
      <div className="container-x py-12">
        <div className="card mx-auto max-w-2xl p-7">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-primary text-lg font-bold text-white">{user.name.charAt(0)}</span>
              <div>
                <h1 className="text-lg font-extrabold text-ink">{user.name}</h1>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>
            <button onClick={() => logout()} className="btn-outline"><LogOut width={16} height={16} /> خروج</button>
          </div>
          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <Link href="/account/orders" className="card flex flex-col items-center gap-2 p-5 text-center hover:shadow-hover"><Package className="text-primary" /> طلباتي</Link>
            <Link href="/wishlist" className="card flex flex-col items-center gap-2 p-5 text-center hover:shadow-hover"><Heart className="text-primary" /> المفضلة</Link>
            <Link href="/account/addresses" className="card flex flex-col items-center gap-2 p-5 text-center hover:shadow-hover"><MapPin className="text-primary" /> عناويني</Link>
          </div>

        </div>
      </div>
    );
  }

  // Auth form
  return (
    <div className="container-x grid place-items-center py-16">
      <div className="card w-full max-w-md p-7">
        <div className="mb-6 flex rounded-lg border border-line p-1">
          {(["login", "register"] as const).map((m) => (
            <button key={m} onClick={() => { setMode(m); setError(null); }}
              className={`flex-1 rounded-md py-2 text-sm font-bold transition-colors ${mode === m ? "bg-primary text-white" : "text-muted hover:text-ink"}`}>
              {m === "login" ? "تسجيل الدخول" : "حساب جديد"}
            </button>
          ))}
        </div>

        {error && <div className="mb-4 rounded-lg bg-error/10 px-4 py-2.5 text-sm font-bold text-error">{error}</div>}

        <form onSubmit={submit} className="space-y-3">
          {mode === "register" && (
            <>
              <IconInput icon={User} placeholder="الاسم الكامل" value={form.name} onChange={(v: string) => setForm({ ...form, name: v })} />
              <IconInput icon={Phone} placeholder="رقم الهاتف" type="tel" value={form.phone} onChange={(v: string) => setForm({ ...form, phone: v })} required={false} />
            </>
          )}
          <IconInput icon={Mail} placeholder="البريد الإلكتروني" type="email" value={form.email} onChange={(v: string) => setForm({ ...form, email: v })} />
          <IconInput icon={Lock} placeholder="كلمة المرور" type="password" value={form.password} onChange={(v: string) => setForm({ ...form, password: v })} />
          <button disabled={busy} className="btn-primary w-full py-3">{busy ? "جارٍ…" : mode === "login" ? "دخول" : "إنشاء الحساب"}</button>
        </form>

        <p className="mt-5 text-center text-xs text-muted">
          بمتابعتك أنت توافق على <Link href="/about" className="font-bold text-primary">شروط الاستخدام</Link> و<Link href="/about" className="font-bold text-primary">سياسة الخصوصية</Link>
        </p>
      </div>
    </div>
  );
}

function IconInput({ icon: Icon, value, onChange, required = true, ...props }: { icon: React.ComponentType<{ width?: number; height?: number }>; value: string; onChange: (v: string) => void; required?: boolean; placeholder?: string; type?: string }) {
  return (
    <div className="flex items-center rounded-lg border border-line bg-bg focus-within:border-primary">
      <span className="grid h-11 w-11 place-items-center text-muted"><Icon width={16} height={16} /></span>
      <input {...props} required={required} value={value} onChange={(e) => onChange(e.target.value)} className="h-11 flex-1 bg-transparent pe-3 text-sm outline-none" />
    </div>
  );
}
