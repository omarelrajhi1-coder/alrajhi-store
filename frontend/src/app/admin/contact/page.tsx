"use client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Mail, Phone, Trash2, MailOpen } from "lucide-react";
import { contactAdminApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import { cn } from "@/lib/utils";

export default function AdminContactMessages() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({ queryKey: ["admin", "contact"], queryFn: () => contactAdminApi.list({ limit: 100 }) });
  const rows = data?.items ?? [];

  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "contact"] });

  async function markRead(id: string) {
    try { await contactAdminApi.markRead(id); await refresh(); } catch { /* ignore */ }
  }
  async function remove(id: string) {
    if (!window.confirm("حذف هذه الرسالة؟")) return;
    try { await contactAdminApi.remove(id); await refresh(); }
    catch (e) { window.alert("فشل الحذف: " + (e instanceof Error ? e.message : "")); }
  }

  return (
    <div>
      <PageHeader title="رسائل التواصل" desc={`${data?.meta?.total ?? rows.length} رسالة`} />
      {isLoading ? (
        <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div>
      ) : rows.length === 0 ? (
        <div className="card py-16 text-center text-sm text-muted">لا توجد رسائل بعد</div>
      ) : (
        <div className="space-y-3">
          {rows.map((m) => (
            <div key={m.id} className={cn("card p-4", !m.isRead && "border-primary")}>
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-extrabold text-ink">{m.name}</p>
                    {!m.isRead && <span className="chip bg-primary/10 text-primary">جديدة</span>}
                  </div>
                  <div className="mt-1 flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span className="flex items-center gap-1"><Phone width={13} height={13} /><span dir="ltr">{m.phone}</span></span>
                    {m.email && <span className="flex items-center gap-1"><Mail width={13} height={13} />{m.email}</span>}
                    <span>{m.createdAt?.slice(0, 16).replace("T", " · ")}</span>
                  </div>
                </div>
                <div className="flex gap-1">
                  {!m.isRead && (
                    <button onClick={() => markRead(m.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary" aria-label="تحديد كمقروءة">
                      <MailOpen width={15} height={15} />
                    </button>
                  )}
                  <button onClick={() => remove(m.id)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error" aria-label="حذف">
                    <Trash2 width={15} height={15} />
                  </button>
                </div>
              </div>
              <p className="mt-3 border-t border-line pt-3 text-sm text-ink">{m.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
