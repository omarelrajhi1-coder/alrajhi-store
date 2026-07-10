"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";

export default function OfferBanner() {
  return (
    <section className="container-x my-14">
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { img: "/assets/products/p33.jpg", tag: "عرض الأسبوع", title: "مفارش وتشاريف الطاولة", desc: "خصم حتى 40% على تشكيلة مختارة", href: "/offers" },
          { img: "/assets/products/p06.jpg", tag: "وفّر أكثر", title: "أدوات التقديم الفاخرة", desc: "اشترِ قطعتين واحصل على الثالثة بنصف السعر", href: "/shop?category=serving" },
        ].map((b, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.45, delay: i * 0.1 }}
            className="group relative h-56 overflow-hidden rounded-2xl">
            <Image src={b.img} alt={b.title} fill sizes="50vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/40 to-transparent" />
            <div className="absolute inset-0 flex flex-col justify-center p-8 text-white">
              <span className="chip w-fit bg-primary text-white">{b.tag}</span>
              <h3 className="mt-3 text-2xl font-extrabold">{b.title}</h3>
              <p className="mt-1 max-w-xs text-sm text-white/80">{b.desc}</p>
              <Link href={b.href} className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-bold text-white hover:gap-2">
                تسوّق الآن <ArrowLeft width={16} height={16} />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
