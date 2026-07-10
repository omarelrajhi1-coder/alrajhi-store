import { products } from "./catalogue";

export type OrderStatus = "new" | "processing" | "shipping" | "delivered" | "cancelled";

export const statusLabel: Record<OrderStatus, string> = {
  new: "جديد", processing: "قيد التجهيز", shipping: "قيد التوصيل", delivered: "تم التسليم", cancelled: "ملغي",
};
export const statusColor: Record<OrderStatus, string> = {
  new: "bg-warning/15 text-warning", processing: "bg-blue-100 text-blue-600",
  shipping: "bg-primary/10 text-primary", delivered: "bg-success/15 text-success",
  cancelled: "bg-error/10 text-error",
};

const names = ["محمد علي", "سارة أحمد", "أحمد سالم", "ليلى منصور", "خالد عمر", "نور الهدى", "يوسف إبراهيم", "هالة كمال", "عمر الراجحي", "فاطمة سعيد"];
const cities = ["طرابلس - طريق السواني", "بنغازي - الكيش", "مصراتة", "الزاوية", "طرابلس - حي الأندلس", "زليتن", "صبراتة"];
const statuses: OrderStatus[] = ["new", "processing", "shipping", "delivered", "delivered", "cancelled"];

export interface AdminOrder {
  id: string; customer: string; phone: string; address: string;
  total: number; status: OrderStatus; date: string; items: number;
}

export const orders: AdminOrder[] = Array.from({ length: 24 }).map((_, i) => {
  const p1 = products[(i * 5) % products.length];
  const p2 = products[(i * 7 + 3) % products.length];
  const items = 1 + (i % 4);
  return {
    id: `#${1042 - i}`,
    customer: names[i % names.length],
    phone: `09${(12345670 + i * 137).toString().slice(0, 8)}`,
    address: cities[i % cities.length],
    total: (p1.price + (i % 3 === 0 ? p2.price : 0)) * items + 10,
    status: statuses[i % statuses.length],
    date: `2026-06-${String(27 - (i % 26)).padStart(2, "0")} ${10 + (i % 12)}:${String((i * 7) % 60).padStart(2, "0")}`,
    items,
  };
});

export const stats = {
  revenue: orders.filter(o => o.status !== "cancelled").reduce((s, o) => s + o.total, 0),
  totalOrders: 128,
  newOrders: 15,
  shipping: 23,
  delivered: 90,
  customers: 312,
  lowStock: products.filter(p => !p.inStock).length,
};

export const salesByMonth = [
  { m: "يناير", v: 42 }, { m: "فبراير", v: 55 }, { m: "مارس", v: 48 },
  { m: "أبريل", v: 67 }, { m: "مايو", v: 73 }, { m: "يونيو", v: 91 },
];

export const topProducts = products.filter(p => p.isBestseller).slice(0, 5)
  .map((p, i) => ({ ...p, sold: 180 - i * 22 }));
