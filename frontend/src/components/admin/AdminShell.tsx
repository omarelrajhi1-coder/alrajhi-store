"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import {
  LayoutDashboard, Package, Tags, Bookmark, ShoppingBag, Users, Boxes,
  Ticket, Star, Settings, ImageIcon, UserCog, BarChart3, Menu, X, Bell, Search, LogOut, Percent, MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import NotificationBell from "./NotificationBell";

const nav = [
  { href: "/admin", label: "لوحة التحكم", icon: LayoutDashboard },
  { href: "/admin/products", label: "المنتجات", icon: Package },
  { href: "/admin/discounts", label: "العروض والتخفيضات", icon: Percent },
  { href: "/admin/categories", label: "الأقسام", icon: Tags },
  { href: "/admin/brands", label: "العلامات التجارية", icon: Bookmark },
  { href: "/admin/orders", label: "الطلبات", icon: ShoppingBag },
  { href: "/admin/customers", label: "العملاء", icon: Users },
  { href: "/admin/inventory", label: "المخزون", icon: Boxes },
  { href: "/admin/coupons", label: "كوبونات الخصم", icon: Ticket },
  { href: "/admin/reviews", label: "التقييمات", icon: Star },
  { href: "/admin/contact", label: "رسائل التواصل", icon: MessageSquare },
  { href: "/admin/banners", label: "أقسام الصفحة الرئيسية", icon: ImageIcon },
  { href: "/admin/employees", label: "الموظفون", icon: UserCog },
  { href: "/admin/analytics", label: "التحليلات", icon: BarChart3 },
  { href: "/admin/settings", label: "الإعدادات", icon: Settings },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();
  const isAdmin = user?.role === "ADMIN" || user?.role === "STAFF";
  const isLoginRoute = pathname === "/admin/login";

  // Route guard: unauthenticated/non-admins are sent to the hidden admin login.
  useEffect(() => {
    if (!isLoginRoute && !loading && !isAdmin) router.replace("/admin/login");
  }, [isLoginRoute, loading, isAdmin, router]);

  // The login page renders bare (no sidebar, no guard).
  if (isLoginRoute) return <>{children}</>;

  if (loading) {
    return <div className="grid min-h-screen place-items-center bg-bg text-sm text-muted">جارٍ التحقق من الصلاحيات…</div>;
  }
  if (!isAdmin) {
    return <div className="grid min-h-screen place-items-center bg-ink text-sm text-white/70">جارٍ التوجيه…</div>;
  }

  const Sidebar = (
    <div className="flex h-full flex-col bg-ink text-white/80">
      <div className="flex h-16 items-center gap-2.5 px-5">
        <span className="grid h-9 w-9 place-items-center rounded-lg bg-primary font-extrabold text-white">ر</span>
        <span className="font-extrabold text-white">الراجحي</span>
        <span className="rounded bg-white/10 px-1.5 py-0.5 text-[10px]">لوحة التحكم</span>
      </div>
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-3">
        {nav.map((n) => {
          const active = n.href === "/admin" ? pathname === "/admin" : pathname.startsWith(n.href);
          return (
            <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
              className={cn("flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition-colors",
                active ? "bg-primary text-white" : "hover:bg-white/10 hover:text-white")}>
              <n.icon width={18} height={18} /> {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-white/10 p-3">
        <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold hover:bg-white/10 hover:text-white">
          <LogOut width={18} height={18} /> العودة للمتجر
        </Link>
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-bg">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 lg:block">{Sidebar}</aside>

      {open && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="absolute inset-y-0 right-0 w-64"><div className="h-full">{Sidebar}</div></div>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-line bg-white px-4 sm:px-6">
          <button onClick={() => setOpen(true)} className="btn-ghost p-2 lg:hidden"><Menu width={22} height={22} /></button>
          <div className="hidden items-center rounded-lg border border-line bg-bg sm:flex">
            <span className="grid h-9 w-10 place-items-center text-muted"><Search width={16} height={16} /></span>
            <input placeholder="بحث…" className="h-9 w-56 bg-transparent pe-3 text-sm outline-none" />
          </div>
          <div className="ms-auto flex items-center gap-3">
            <NotificationBell />
            <div className="flex items-center gap-2">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary font-bold text-white">{user?.name?.charAt(0) ?? "؟"}</span>
              <div className="hidden text-sm leading-tight sm:block">
                <p className="font-bold text-ink">{user?.name}</p>
                <p className="text-xs text-muted">{user?.role === "ADMIN" ? "مدير" : "موظف"}</p>
              </div>
            </div>
          </div>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
