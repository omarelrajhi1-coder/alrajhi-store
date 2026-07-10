import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function SectionHeader({ title, subtitle, href, action }: {
  title: string; subtitle?: string; href?: string; action?: string;
}) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <div>
        <h2 className="section-title">
          <span className="relative">
            {title}
            <span className="absolute -bottom-1.5 right-0 h-1 w-12 rounded-full bg-primary" />
          </span>
        </h2>
        {subtitle && <p className="mt-3 text-sm text-muted">{subtitle}</p>}
      </div>
      {href && (
        <Link href={href} className="group inline-flex shrink-0 items-center gap-1 text-sm font-bold text-primary hover:text-primary-dark">
          {action ?? "عرض الكل"}
          <ArrowLeft width={16} height={16} className="transition-transform group-hover:-translate-x-1" />
        </Link>
      )}
    </div>
  );
}
