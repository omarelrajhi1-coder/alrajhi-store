"use client";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Trash2, Power } from "lucide-react";
import { employeesApi } from "@/lib/api/services";
import PageHeader from "@/components/admin/PageHeader";
import EmployeeFormModal from "@/components/admin/EmployeeFormModal";
import { cn } from "@/lib/utils";

export default function AdminEmployees() {
  const qc = useQueryClient();
  const { data: employees = [], isLoading } = useQuery({ queryKey: ["admin", "employees"], queryFn: employeesApi.list });
  const { data: roles = [] } = useQuery({ queryKey: ["admin", "roles"], queryFn: employeesApi.roles });
  const [open, setOpen] = useState(false);
  // Employees are also Users (role STAFF), so keep the customers list in sync too.
  const refresh = () => {
    qc.invalidateQueries({ queryKey: ["admin", "employees"] });
    qc.invalidateQueries({ queryKey: ["admin", "customers"] });
  };

  async function toggle(id: string, active: boolean) {
    try { await employeesApi.setActive(id, active); refresh(); } catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
  }
  async function remove(id: string, name: string) {
    if (!window.confirm(`حذف الموظف "${name}"؟`)) return;
    try { await employeesApi.remove(id); refresh(); } catch (e) { window.alert("فشل: " + (e instanceof Error ? e.message : "")); }
  }

  return (
    <div>
      <PageHeader title="الموظفون" desc={`${employees.length} موظف`}
        action={<button onClick={() => setOpen(true)} className="btn-primary"><Plus width={16} height={16} /> إضافة موظف</button>} />
      <div className="card overflow-x-auto">
        {isLoading ? <div className="py-16 text-center text-sm text-muted">جارٍ التحميل…</div> : employees.length === 0 ? (
          <div className="py-16 text-center text-sm text-muted">لا يوجد موظفون بعد</div>
        ) : (
          <table className="w-full min-w-[640px] text-sm">
            <thead>
              <tr className="border-b border-line text-right text-xs text-muted">
                <th className="px-4 py-3 font-bold">الاسم</th>
                <th className="px-4 py-3 font-bold">البريد</th>
                <th className="px-4 py-3 font-bold">المسمّى</th>
                <th className="px-4 py-3 font-bold">الدور</th>
                <th className="px-4 py-3 font-bold">الحالة</th>
                <th className="px-4 py-3 font-bold">إجراءات</th>
              </tr>
            </thead>
            <tbody>
              {employees.map((e) => (
                <tr key={e.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
                  <td className="px-4 py-3 font-bold text-ink">{e.user.name}</td>
                  <td className="px-4 py-3 text-muted">{e.user.email}</td>
                  <td className="px-4 py-3 text-muted">{e.title ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{e.role?.name ?? "—"}</td>
                  <td className="px-4 py-3"><span className={cn("chip", e.isActive ? "bg-success/15 text-success" : "bg-error/10 text-error")}>{e.isActive ? "نشط" : "موقوف"}</span></td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1">
                      <button onClick={() => toggle(e.id, !e.isActive)} title={e.isActive ? "إيقاف" : "تفعيل"} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-primary hover:text-primary"><Power width={15} height={15} /></button>
                      <button onClick={() => remove(e.id, e.user.name)} className="grid h-8 w-8 place-items-center rounded-lg border border-line hover:border-error hover:text-error"><Trash2 width={15} height={15} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <EmployeeFormModal open={open} onClose={() => setOpen(false)} onSaved={refresh} roles={roles} />
    </div>
  );
}
