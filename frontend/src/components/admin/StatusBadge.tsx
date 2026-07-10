import { statusLabel, statusColor, type OrderStatus } from "@/data/admin";
import { cn } from "@/lib/utils";
export default function StatusBadge({ status }: { status: OrderStatus }) {
  return <span className={cn("chip", statusColor[status])}>{statusLabel[status]}</span>;
}
