import { cn, formatPrice } from "@/lib/utils";

export default function Price({ price, oldPrice, className }: { price: number; oldPrice?: number; className?: string }) {
  return (
    <span className={cn("inline-flex items-baseline gap-2", className)}>
      <span className="text-lg font-extrabold text-primary">{formatPrice(price)}</span>
      {oldPrice && oldPrice > price && (
        <span className="text-sm font-medium text-muted line-through">{formatPrice(oldPrice)}</span>
      )}
    </span>
  );
}
