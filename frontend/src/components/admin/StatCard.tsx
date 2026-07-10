"use client";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function StatCard({ icon: Icon, label, value, delta, tone = "primary", index = 0 }: {
  icon: LucideIcon; label: string; value: string; delta?: number; tone?: "primary" | "success" | "warning" | "ink"; index?: number;
}) {
  const tones: Record<string, string> = {
    primary: "bg-primary/10 text-primary", success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning", ink: "bg-ink/10 text-ink",
  };
  return (
    <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.06 }}
      className="card p-5">
      <div className="flex items-start justify-between">
        <span className={cn("grid h-11 w-11 place-items-center rounded-xl", tones[tone])}><Icon width={22} height={22} /></span>
        {typeof delta === "number" && (
          <span className={cn("inline-flex items-center gap-0.5 text-xs font-bold", delta >= 0 ? "text-success" : "text-error")}>
            {delta >= 0 ? <ArrowUpRight width={14} height={14} /> : <ArrowDownRight width={14} height={14} />}{Math.abs(delta)}%
          </span>
        )}
      </div>
      <p className="mt-4 text-2xl font-extrabold text-ink">{value}</p>
      <p className="text-sm text-muted">{label}</p>
    </motion.div>
  );
}
