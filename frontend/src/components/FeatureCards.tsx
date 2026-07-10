"use client";
import { Truck, ShieldCheck, BadgeCheck, Wallet } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  { icon: Truck, title: "توصيل سريع", desc: "لكل المناطق في ليبيا" },
  { icon: Wallet, title: "الدفع عند الاستلام", desc: "ادفع عند وصول طلبك" },
  { icon: ShieldCheck, title: "جودة مضمونة", desc: "منتجات أصلية 100%" },
  { icon: BadgeCheck, title: "ضمان حقيقي", desc: "على المنتجات المؤهلة" },
];

export default function FeatureCards() {
  return (
    <section className="container-x mt-6">
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f, i) => <FeatureCard key={i} index={i} {...f} />)}
      </div>
    </section>
  );
}
