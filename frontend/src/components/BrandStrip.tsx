"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { brands } from "@/data/catalogue";
import SectionHeader from "./SectionHeader";

export default function BrandStrip() {
  // duplicate brands to fill the strip nicely
  const list = [...brands, ...brands, ...brands].slice(0, 6);
  return (
    <section className="container-x my-14">
      <SectionHeader title="علاماتنا التجارية" subtitle="نتعامل مع أفضل العلامات الموثوقة" />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {list.map((b, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.3, delay: i * 0.05 }}
            className="grid h-24 place-items-center rounded-xl border border-line bg-white p-4 grayscale transition-all hover:grayscale-0 hover:shadow-card">
            <div className="relative h-12 w-full">
              <Image src={b.logo} alt={b.name} fill className="object-contain" sizes="160px" />
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
