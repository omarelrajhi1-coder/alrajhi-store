import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

export default function RatingStars({ value, size = 14, showValue = false, count }: {
  value: number; size?: number; showValue?: boolean; count?: number;
}) {
  const full = Math.round(value);
  return (
    <span className="inline-flex items-center gap-1" aria-label={`التقييم ${value} من 5`}>
      <span className="inline-flex">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} width={size} height={size}
            className={cn(i < full ? "fill-warning text-warning" : "fill-line text-line")} />
        ))}
      </span>
      {showValue && <span className="text-xs font-bold text-ink">{value.toFixed(1)}</span>}
      {typeof count === "number" && <span className="text-xs text-muted">({count})</span>}
    </span>
  );
}
