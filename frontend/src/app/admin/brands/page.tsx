"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Brand } from "@/types";
import { brandsApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import CatalogEntityModal from "@/components/admin/CatalogEntityModal";

export default function AdminBrands() {
  const qc = useQueryClient();
  const { data: brands = [], isLoading } = useQuery({ queryKey: ["admin", "brands"], queryFn: brandsApi.list });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);

  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin", "brands"] }); qc.invalidateQueries({ queryKey: ["catalog"] }); };

  async function remove(id: string, name: string) {
    if (!window.confirm(`حذف العلامة "${name}"؟`)) return;
    try { await brandsApi.remove(id); refresh(); }
    catch (e) { window.alert("فشل الحذف: " + (e instanceof Error ? e.message : "")); }
  }

  return (
    <div>
      <PageHeader title="العلامات التجارية" desc={`${brands.length} علامة`}
        action={<button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary"><Plus width={16} height={16} /> إضافة علامة</button>} />
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : (
          <table className="w-full min-w-[460px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">الشعار</th>
                <th className="px-4 py-3 font-bold">الاسم</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {brands.map((b) => (
                <tr key={b.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
                  <td className="px-4 py-3">
                    <div className="relative h-10 w-20 overflow-hidden rounded bg-bg">
                      {b.logo && <Image src={b.logo} alt={b.name} fill sizes="80px" className="object-contain" />}
                    </div>
                  </td>
                  <td className="px-4 py-3 font-bold text-ink">{b.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditing(b); setOpen(true); }} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary"><Pencil width={15} height={15} /></button>
                      <button onClick={() => remove(b.id, b.name)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error"><Trash2 width={15} height={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CatalogEntityModal key={editing?.id ?? "new"} open={open} onClose={() => setOpen(false)} onSaved={refresh} kind="brand" entity={editing} />
    </div>
  );
}
