"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, ShieldCheck } from "lucide-react";
import { authApi } from "@/lib/api/services";
import { useAuth } from "@/context/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const user = await authApi.login({ email, password });
      if (user.role === "ADMIN" || user.role === "STAFF") {
        await refreshUser();
        router.replace("/admin");
      } else {
        // A normal customer tried the admin door — deny and sign out.
        await authApi.logout().catch(() => undefined);
        setError("هذه الصفحة مخصّصة للمديرين فقط.");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "بيانات الدخول غير صحيحة");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-ink px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-3 grid h-14 w-14 place-items-center rounded-2xl bg-primary text-white"><ShieldCheck width={28} height={28} /></span>
          <h1 className="text-xl font-extrabold text-ink">لوحة تحكم الراجحي</h1>
          <p className="text-sm text-muted">دخول المديرين والموظفين</p>
        </div>

        {error && <div className="mb-4 rounded-lg bg-error/10 px-4 py-2.5 text-sm font-bold text-error">{error}</div>}

        <form onSubmit={submit} className="space-y-3">
          <div className="flex items-center rounded-lg border border-line bg-bg focus-within:border-primary">
            <span className="grid h-11 w-11 place-items-center text-muted"><Mail width={16} height={16} /></span>
            <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="البريد الإلكتروني" className="h-11 flex-1 bg-transparent pe-3 text-sm outline-none" />
          </div>
          <div className="flex items-center rounded-lg border border-line bg-bg focus-within:border-primary">
            <span className="grid h-11 w-11 place-items-center text-muted"><Lock width={16} height={16} /></span>
            <input type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              placeholder="كلمة المرور" className="h-11 flex-1 bg-transparent pe-3 text-sm outline-none" />
          </div>
          <button disabled={busy} className="btn-primary w-full py-3">{busy ? "جارٍ الدخول…" : "دخول"}</button>
        </form>
      </div>
    </div>
  );
}
