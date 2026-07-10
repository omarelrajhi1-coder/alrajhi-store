"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { bannersApi, Banner } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import BannerFormModal from "@/components/admin/BannerFormModal";
import { cn } from "@/lib/utils";

export default function AdminBanners() {
  const qc = useQueryClient();
  const { data: banners = [], isLoading } = useQuery({ queryKey: ["admin", "banners"], queryFn: bannersApi.listAll });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Banner | null>(null);
  const refresh = () => qc.invalidateQueries({ queryKey: ["admin", "banners"] });

  async function remove(id: string, title: string) {
    if (!window.confirm(`حذف البانر "${title}"؟`)) return;
    try { await bannersApi.remove(id); refresh(); } catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
  }

  return (
    <div>
      <PageHeader title="بانرات الصفحة الرئيسية" desc={`${banners.length} بانر`}
        action={<button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary"><Plus width={16} height={16} /> إضافة بانر</button>} />
      {isLoading ? <div className="card py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : (
        <div className="grid gap-4 sm:grid-cols-2">
          {banners.map((b) => (
            <div key={b.id} className="card overflow-hidden">
              <div className="relative h-36 bg-bg">
                {b.image && <Image src={b.image} alt={b.title} fill sizes="400px" className="object-cover" />}
                {!b.isActive && <span className="absolute right-2 top-2 chip bg-muted/80 text-white">مخفي</span>}
              </div>
              <div className="flex items-center justify-between p-4">
                <div><p className="font-bold text-ink">{b.title}</p><p className="text-xs text-muted">{b.subtitle}</p></div>
                <div className="flex gap-1">
                  <button onClick={() => { setEditing(b); setOpen(true); }} className={cn("grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary")}><Pencil width={15} height={15} /></button>
                  <button onClick={() => remove(b.id, b.title)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error"><Trash2 width={15} height={15} /></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      <BannerFormModal key={editing?.id ?? "new"} open={open} onClose={() => setOpen(false)} onSaved={refresh} banner={editing} />
    </div>
  );
}
