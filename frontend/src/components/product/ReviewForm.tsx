"use client";
import { useState } from "react";
import { Star, CheckCircle2 } from "lucide-react";
import { reviewsApi } from "@/lib/api/services";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";

export default function ReviewForm({ productId }: { productId: string }) {
  const { user } = useAuth();
  const [author, setAuthor] = useState(user?.name ?? "");
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!author.trim() || text.trim().length < 2) { setError("اكتب اسمك ونص التقييم"); return; }
    setBusy(true);
    try {
      await reviewsApi.create(productId, { author: author.trim(), rating, text: text.trim() });
      setDone(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الإرسال، حاول مجدداً");
    } finally {
      setBusy(false);
    }
  }

  if (done) {
    return (
      <div className="card flex items-center gap-3 border-success/30 bg-success/5 p-4">
        <CheckCircle2 className="text-success" />
        <div>
          <p className="font-bold text-ink">شكراً لتقييمك!</p>
          <p className="text-sm text-muted">تقييمك قيد المراجعة، وسيظهر بعد موافقة الإدارة.</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="card space-y-3 p-4">
      <p className="font-bold text-ink">أضف تقييمك</p>
      {error && <div className="rounded-lg bg-error/10 px-3 py-2 text-sm font-bold text-error">{error}</div>}

      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((n) => (
          <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} نجوم`}>
            <Star width={24} height={24} className={cn(n <= rating ? "fill-warning text-warning" : "fill-line text-line")} />
          </button>
        ))}
      </div>

      <input value={author} onChange={(e) => setAuthor(e.target.value)} placeholder="اسمك"
        className="h-11 w-full rounded-lg border border-line bg-bg px-3 text-sm outline-none focus:border-primary" />
      <textarea value={text} onChange={(e) => setText(e.target.value)} rows={3} placeholder="اكتب رأيك في المنتج…"
        className="w-full resize-none rounded-lg border border-line bg-bg p-3 text-sm outline-none focus:border-primary" />

      <button disabled={busy} className="btn-primary">{busy ? "جارٍ الإرسال…" : "إرسال التقييم"}</button>
    </form>
  );
}
