"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { Search, Heart, ShoppingCart, Menu, X } from "lucide-react";
import { useStore } from "@/context/StoreContext";
import { useLocale } from "@/context/LocaleContext";
import { cn } from "@/lib/utils";
import Logo from "./Logo";

export default function Header() {
  const { cartCount, wishlist } = useStore();
  const { t } = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");

  const nav = [
    { href: "/", label: t.nav_home },
    { href: "/shop", label: t.nav_products },
    { href: "/offers", label: t.nav_offers },
    { href: "/about", label: t.nav_about },
    { href: "/contact", label: t.nav_contact },
  ];

  function submitSearch(e: React.FormEvent) {
    e.preventDefault();
    router.push(`/shop?q=${encodeURIComponent(q)}`);
    setOpen(false);
  }

  return (
    <header className="sticky top-0 z-50">
      {/* main bar */}
      <div className="border-b border-line bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center gap-3 lg:gap-6">
          <button onClick={() => setOpen((v) => !v)} className="btn-ghost p-2 lg:hidden" aria-label="القائمة">
            {open ? <X width={22} height={22} /> : <Menu width={22} height={22} />}
          </button>

          <div className="order-1">
            <Logo />
          </div>

          <form onSubmit={submitSearch} className="order-3 hidden flex-1 lg:order-2 lg:flex">
            <div className="flex w-full max-w-xl items-center overflow-hidden rounded-lg border border-line bg-bg focus-within:border-primary">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search}
                className="h-10 flex-1 bg-transparent px-4 text-sm outline-none placeholder:text-muted" />
              <button type="submit" className="grid h-10 w-12 place-items-center bg-primary text-white hover:bg-primary-dark">
                <Search width={18} height={18} />
              </button>
            </div>
          </form>

          <div className="order-2 ms-auto flex items-center gap-1 lg:order-3 lg:ms-0">
            <Link href="/wishlist" className="hidden btn-ghost p-2.5 sm:inline-flex" aria-label={t.wishlist}>
              <span className="relative">
                <Heart width={22} height={22} />
                {wishlist.length > 0 && <Badge n={wishlist.length} />}
              </span>
            </Link>
            <Link href="/cart" className="btn-ghost p-2.5" aria-label={t.cart}>
              <span className="relative">
                <ShoppingCart width={22} height={22} />
                {cartCount > 0 && <Badge n={cartCount} />}
              </span>
            </Link>
          </div>
        </div>

        {/* desktop nav */}
        <nav className="hidden border-t border-line lg:block">
          <div className="container-x flex h-11 items-center gap-7 text-sm font-bold">
            {nav.map((n) => {
              const active = n.href === "/" ? pathname === "/" : pathname.startsWith(n.href);
              return (
                <Link key={n.href} href={n.href}
                  className={cn("relative py-3 transition-colors hover:text-primary",
                    active ? "text-primary" : "text-ink")}>
                  {n.label}
                  {active && <span className="absolute inset-x-0 -bottom-px h-0.5 rounded-full bg-primary" />}
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* mobile menu */}
      {open && (
        <div className="border-b border-line bg-white shadow-soft lg:hidden">
          <div className="container-x space-y-3 py-4">
            <form onSubmit={submitSearch} className="flex items-center overflow-hidden rounded-lg border border-line bg-bg">
              <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t.search}
                className="h-10 flex-1 bg-transparent px-4 text-sm outline-none" />
              <button className="grid h-10 w-12 place-items-center bg-primary text-white"><Search width={18} height={18} /></button>
            </form>
            <nav className="flex flex-col">
              {nav.map((n) => (
                <Link key={n.href} href={n.href} onClick={() => setOpen(false)}
                  className="border-b border-line/70 py-3 text-sm font-bold text-ink hover:text-primary">
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

function Badge({ n }: { n: number }) {
  return (
    <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
      {n}
    </span>
  );
}
