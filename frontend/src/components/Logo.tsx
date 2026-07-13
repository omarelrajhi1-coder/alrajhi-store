import Link from "next/link";
import Image from "next/image";

export default function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-2.5 leading-none" aria-label="الراجحي للمواد المنزلية">
      <span className="relative grid h-11 w-14 place-items-center overflow-hidden rounded-xl bg-white shadow-soft ring-1 ring-line">
        <Image src="/assets/brands/rtc.png" alt="RTC" fill className="object-contain p-1.5" sizes="56px" />
      </span>
      <span className="flex flex-col">
        <span className={`text-lg font-extrabold tracking-tight ${light ? "text-white" : "text-ink"}`}>الراجحي</span>
        <span className={`text-[10px] font-bold ${light ? "text-white/70" : "text-muted"}`}>للمواد المنزلية</span>
      </span>
    </Link>
  );
}
