import Link from "next/link";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 leading-none" aria-label="الراجحي للمواد المنزلية">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary font-extrabold text-white shadow-soft">
        ر
      </span>
      <span className="flex flex-col">
        <span className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>الراجحي</span>
        <span className={`text-[10px] font-bold ${light ? "text-white/70" : "text-muted"}`}>للمواد المنزلية</span>
      </span>
    </Link>
  );
}
