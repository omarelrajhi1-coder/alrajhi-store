"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "@/lib/api/services";
import { Power } from "lucide-react";
import PageHeader from "@/components/admin/PageHeader";
import { cn } from "@/lib/utils";

const roleLabel: Record<string, string> = { CUSTOMER: "عميل", ADMIN: "مدير", STAFF: "موظف" };

export default function AdminCustomers() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "customers"], queryFn: () => usersApi.list({ limit: 50 }) });
  const rows = data?.items ?? [];

  async function toggle(id: string, active: boolean) {
    try { await usersApi.setActive(id, active); qc.invalidateQueries({ queryKey: ["admin", "customers"] }); }
    catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
  }
  return (
    <div>
      <PageHeader title="العملاء" desc={`${data?.meta?.total ?? rows.length} مستخدم`} />
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : (
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">الاسم</th>
                <th className="px-4 py-3 font-bold">البريد</th>
                <th className="px-4 py-3 font-bold">الهاتف</th>
                <th className="px-4 py-3 font-bold">الدور</th>
                <th className="px-4 py-3 font-bold">الطلبات</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">إجراء</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((u) => (
                <tr key={u.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
                  <td className="px-4 py-3 font-bold text-ink">{u.name}</td>
                  <td className="px-4 py-3 text-muted">{u.email}</td>
                  <td className="px-4 py-3 text-muted">{u.phone ?? "—"}</td>
                  <td className="px-4 py-3">{roleLabel[u.role] ?? u.role}</td>
                  <td className="px-4 py-3 font-bold">{u._count?.orders ?? 0}</td>
                  <td className="px-4 py-3">
                    <span className={cn("chip", u.isActive ? "bg-success/15 text-success" : "bg-error/10 text-error")}>
                      {u.isActive ? "نشط" : "موقوف"}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggle(u.id, !u.isActive)} title={u.isActive ? "إيقاف" : "تفعيل"} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary"><Power width={15} height={15} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
