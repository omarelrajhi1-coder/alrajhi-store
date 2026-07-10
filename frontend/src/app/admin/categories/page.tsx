"use client";
import Image from "next/image";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Pencil, Trash2 } from "lucide-react";
import type { Category } from "@/types";
import { categoriesApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import CatalogEntityModal from "@/components/admin/CatalogEntityModal";

export default function AdminCategories() {
  const qc = useQueryClient();
  const { data: cats = [], isLoading } = useQuery({ queryKey: ["admin", "categories"], queryFn: categoriesApi.list });
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Category | null>(null);

  const refresh = () => { qc.invalidateQueries({ queryKey: ["admin", "categories"] }); qc.invalidateQueries({ queryKey: ["catalog"] }); };

  async function remove(id: string, name: string) {
    if (!window.confirm(`حذف القسم "${name}"؟`)) return;
    try { await categoriesApi.remove(id); refresh(); }
    catch (e) { window.alert("فشل الحذف: " + (e instanceof Error ? e.message : "")); }
  }

  return (
    <div>
      <PageHeader title="الأقسام" desc={`${cats.length} قسم`}
        action={<button onClick={() => { setEditing(null); setOpen(true); }} className="btn-primary"><Plus width={16} height={16} /> إضافة قسم</button>} />
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : (
          <table className="w-full min-w-[560px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">القسم</th>
                <th className="px-4 py-3 font-bold">slug</th>
                <th className="px-4 py-3 font-bold">المنتجات</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {cats.map((c) => (
                <tr key={c.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-lg bg-bg">
                        {c.image && <Image src={c.image} alt="" fill sizes="40px" className="object-cover" />}
                      </div>
                      <span className="font-bold text-ink">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-muted">{c.slug}</td>
                  <td className="px-4 py-3 font-bold text-primary">{c.count}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => { setEditing(c); setOpen(true); }} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary"><Pencil width={15} height={15} /></button>
                      <button onClick={() => remove(c.id, c.name)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error"><Trash2 width={15} height={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <CatalogEntityModal key={editing?.id ?? "new"} open={open} onClose={() => setOpen(false)} onSaved={refresh} kind="category" entity={editing} />
    </div>
  );
}
