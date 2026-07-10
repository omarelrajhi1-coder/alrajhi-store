"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Bell, Check } from "lucide-react";
import { notificationsApi } from "@/lib/api/services";
import { cn } from "@/lib/utils";

export default function NotificationBell() {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const { data: list = [] } = useQuery({ queryKey: ["notifications"], queryFn: notificationsApi.list, refetchInterval: 60000 });
  const unread = list.filter((n) => !n.isRead).length;

  async function markAll() {
    try { await notificationsApi.markAllRead(); qc.invalidateQueries({ queryKey: ["notifications"] }); } catch { /* ignore */ }
  }

  return (
    <div className="relative">
      <button onClick={() => setOpen((v) => !v)} className="relative btn-ghost p-2" aria-label="الإشعارات">
        <Bell width={20} height={20} />
        {unread > 0 && <span className="absolute right-1 top-1 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">{unread}</span>}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-50 mt-2 w-80 overflow-hidden rounded-xl border border-line bg-white shadow-hover">
            <div className="flex items-center justify-between border-b border-line px-4 py-3">
              <span className="font-extrabold text-ink">الإشعارات</span>
              {unread > 0 && <button onClick={markAll} className="flex items-center gap-1 text-xs font-bold text-primary"><Check width={13} height={13} /> تحديد الكل كمقروء</button>}
            </div>
            <div className="max-h-80 overflow-y-auto">
              {list.length === 0 ? (
                <p className="py-10 text-center text-sm text-muted">لا توجد إشعارات</p>
              ) : list.map((n) => (
                <div key={n.id} className={cn("border-b border-line/60 px-4 py-3 last:border-0", !n.isRead && "bg-primary/5")}>
                  <p className="text-sm font-bold text-ink">{n.title}</p>
                  {n.body && <p className="text-xs text-muted">{n.body}</p>}
                  <p className="mt-1 text-[10px] text-muted">{n.createdAt?.slice(0, 16).replace("T", " ")}</p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
