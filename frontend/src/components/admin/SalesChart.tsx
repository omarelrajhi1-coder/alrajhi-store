"use client";
import { salesByMonth as mockSales } from "@/data/admin";

export default function SalesChart({ data }: { data?: { m: string; v: number }[] }) {
  const series = data && data.length ? data : mockSales;
  const max = Math.max(1, ...series.map((d) => d.v));
  const hasSales = series.some((d) => d.v > 0);
  return (
    <div className="card p-5">
      <div className="mb-5 flex items-center justify-between">
        <h3 className="font-extrabold text-ink">المبيعات الشهرية</h3>
        {hasSales && <span className="text-xs font-bold text-success">آخر 6 أشهر</span>}
      </div>
      <div className="flex h-52 items-end gap-3">
        {series.map((d, i) => (
          <div key={`${d.m}-${i}`} className="flex flex-1 flex-col items-center gap-2">
            <div className="flex w-full flex-1 items-end">
              <div className="w-full rounded-t-lg bg-gradient-to-t from-primary to-primary/60 transition-all hover:from-primary-dark"
                style={{ height: `${(d.v / max) * 100}%` }} title={`${d.v} د.ل`} />
            </div>
            <span className="text-xs text-muted">{d.m}</span>
          </div>
        ))}
      </div>
      {!hasSales && <p className="mt-3 text-center text-xs text-muted">لا توجد مبيعات كافية لعرض الرسم بعد</p>}
    </div>
  );
}
