"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Category } from "@/types";

export default function CategoryCard({ category, index = 0 }: { category: Category; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Link href={`/shop?category=${category.slug}`} className="group block text-center">
        <div className="relative mx-auto aspect-square overflow-hidden rounded-2xl border border-line bg-white shadow-card transition-all duration-300 group-hover:-translate-y-1 group-hover:shadow-hover">
          <Image src={category.image} alt={category.name} fill sizes="160px"
            className="object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        </div>
        <h3 className="mt-3 text-sm font-bold text-ink group-hover:text-primary">{category.name}</h3>
        <p className="text-xs text-muted">{category.count} منتج</p>
      </Link>
    </motion.div>
  );
}
