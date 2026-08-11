"use client";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { Wallet, ShoppingBag, Clock, Truck, CheckCircle2, Users, AlertTriangle } from "lucide-react";
import StatCard from "@/components/admin/StatCard";
import SalesChart from "@/components/admin/SalesChart";
import { stats as mockStats, topProducts as mockTop } from "@/data/admin";
import { dashboardApi, ordersAdminApi, AdminOrder } from "@/lib/api/services";
import { formatPrice, cn } from "@/lib/utils";

const statusLabel: Record<string, string> = {
  NEW: "جديد", PROCESSING: "قيد التجهيز", SHIPPING: "قيد التوصيل",
  DELIVERED: "تم التسليم", CANCELLED: "ملغي", RETURNED: "مرتجع",
};
const statusColor: Record<string, string> = {
  NEW: "bg-warning/15 text-warning", PROCESSING: "bg-blue-100 text-blue-600",
  SHIPPING: "bg-primary/10 text-primary", DELIVERED: "bg-success/15 text-success",
  CANCELLED: "bg-error/10 text-error", RETURNED: "bg-muted/15 text-muted",
};

interface TopProduct { id: string; name: string; price: number; image: string | null; sold: number }

export default function AdminDashboard() {
  const { data: live } = useQuery({ queryKey: ["admin", "overview"], queryFn: dashboardApi.overview as () => Promise<typeof mockStats>, retry: 0 });
  const { data: topLive } = useQuery({ queryKey: ["admin", "top"], queryFn: dashboardApi.topProducts as () => Promise<TopProduct[]>, retry: 0 });
  const { data: sales } = useQuery({ queryKey: ["admin", "sales"], queryFn: dashboardApi.salesByMonth, retry: 0 });
  const { data: recentOrders } = useQuery({
    queryKey: ["admin", "orders", "recent"],
    queryFn: () => ordersAdminApi.list({ limit: 6 }),
    retry: 0,
  });

  const stats = { ...mockStats, ...(live ?? {}) };
  const top: TopProduct[] = (topLive && topLive.length)
    ? topLive
    : mockTop.map((p) => ({ id: p.id, name: p.name, price: p.price, image: p.images[0], sold: p.sold }));
  const recent: AdminOrder[] = recentOrders?.items ?? [];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-extrabold text-ink">نظرة عامة</h1>
        <p className="text-sm text-muted">مرحباً عمر، إليك ملخّص أداء متجرك اليوم</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard index={0} icon={Wallet} tone="success" label="إجمالي الإيرادات" value={formatPrice(stats.revenue)} delta={18} />
        <StatCard index={1} icon={ShoppingBag} tone="primary" label="إجمالي الطلبات" value={String(stats.totalOrders)} delta={12} />
        <StatCard index={2} icon={Clock} tone="warning" label="طلبات جديدة" value={String(stats.newOrders)} delta={5} />
        <StatCard index={3} icon={Users} tone="ink" label="العملاء" value={String(stats.customers)} delta={9} />
      </div>

      <div className="grid gap-4 sm:grid-cols-3">
        <MiniStat icon={Truck} label="قيد التوصيل" value={stats.shipping} tone="text-primary" />
        <MiniStat icon={CheckCircle2} label="تم التسليم" value={stats.delivered} tone="text-success" />
        <MiniStat icon={AlertTriangle} label="مخزون منخفض" value={stats.lowStock} tone="text-warning" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.6fr_1fr]">
        <SalesChart data={sales} />
        <div className="card p-5">
          <h3 className="mb-4 font-extrabold text-ink">الأكثر مبيعاً</h3>
          {top.length === 0 ? (
            <p className="py-6 text-center text-sm text-muted">لا توجد مبيعات بعد</p>
          ) : (
            <div className="space-y-3">
              {top.map((p) => (
                <div key={p.id} className="flex items-center gap-3">
                  <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-bg">
                    {p.image && <Image src={p.image} alt="" fill sizes="44px" className="object-cover" />}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-bold text-ink">{p.name}</p>
                    <p className="text-xs text-muted">{p.sold} عملية بيع</p>
                  </div>
                  <span className="text-sm font-bold text-primary">{formatPrice(p.price)}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="card overflow-hidden">
        <div className="flex items-center justify-between border-b border-line px-5 py-4">
          <h3 className="font-extrabold text-ink">أحدث الطلبات</h3>
          <a href="/admin/orders" className="text-sm font-bold text-primary">عرض الكل</a>
        </div>
        <OrdersTable rows={recent} />
      </div>
    </div>
  );
}

function MiniStat({ icon: Icon, label, value, tone }: { icon: React.ComponentType<{ width?: number; height?: number; className?: string }>; label: string; value: number; tone: string }) {
  return (
    <div className="card flex items-center gap-3 p-4">
      <Icon width={22} height={22} className={tone} />
      <div><p className="text-lg font-extrabold text-ink">{value}</p><p className="text-xs text-muted">{label}</p></div>
    </div>
  );
}

function OrdersTable({ rows }: { rows: AdminOrder[] }) {
  if (rows.length === 0) {
    return <p className="py-10 text-center text-sm text-muted">لا توجد طلبات بعد</p>;
  }
  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[640px] text-sm">
        <thead>
          <tr className="border-b border-line text-right text-xs text-muted">
            <th className="px-5 py-3 font-bold">رقم الطلب</th>
            <th className="px-5 py-3 font-bold">العميل</th>
            <th className="px-5 py-3 font-bold">العنوان</th>
            <th className="px-5 py-3 font-bold">الإجمالي</th>
            <th className="px-5 py-3 font-bold">الحالة</th>
            <th className="px-5 py-3 font-bold">التاريخ</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((o) => (
            <tr key={o.id} className="border-b border-line/60 last:border-0 hover:bg-bg">
              <td className="px-5 py-3 font-bold text-ink">{o.number}</td>
              <td className="px-5 py-3">{o.customer}</td>
              <td className="px-5 py-3 text-muted">{o.address}</td>
              <td className="px-5 py-3 font-bold text-primary">{formatPrice(o.total)}</td>
              <td className="px-5 py-3"><span className={cn("chip", statusColor[o.status])}>{statusLabel[o.status] ?? o.status}</span></td>
              <td className="px-5 py-3 text-muted">{o.createdAt?.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
