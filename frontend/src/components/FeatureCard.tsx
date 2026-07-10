"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";

export default function FeatureCard({ icon: Icon, title, desc, index = 0 }: {
  icon: LucideIcon; title: string; desc: string; index?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="flex items-center gap-3 rounded-xl bg-white p-4 shadow-card"
    >
      <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary/10 text-primary">
        <Icon width={22} height={22} />
      </span>
      <div>
        <h3 className="text-sm font-extrabold text-ink">{title}</h3>
        <p className="text-xs text-muted">{desc}</p>
      </div>
    </motion.div>
  );
}
