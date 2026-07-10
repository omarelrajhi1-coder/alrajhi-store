"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { cmsApi, Banner } from "@/lib/api/services";

interface Slide { image: string; title: string; accent: string; desc: string; cta: string; href: string }

// Fallback slides used until CMS banners load (or if the API is unavailable).
const fallbackSlides: Slide[] = [
  { image: "/assets/products/p18.jpg", title: "الراجحي", accent: "للمواد المنزلية والكهربائية", desc: "جودة عالية .. أسعار مناسبة .. ثقة تدوم", cta: "تسوّق الآن", href: "/shop" },
  { image: "/assets/products/p24.jpg", title: "أطقم الصحون الفاخرة", accent: "تشكيلة جديدة بالكامل", desc: "أناقة المائدة تبدأ من هنا — أطقم بورسلين وسيراميك راقية", cta: "اكتشف التشكيلة", href: "/shop?category=dinnerware" },
  { image: "/assets/products/p60.jpg", title: "أدوات المائدة", accent: "خصومات تصل إلى 30%", desc: "ملاعق وشوك وسكاكين ستانلس بتشطيب فاخر", cta: "عرض العروض", href: "/offers" },
];

export default function HeroSlider() {
  const { data: banners } = useQuery({ queryKey: ["banners"], queryFn: cmsApi.banners as () => Promise<Banner[]>, retry: 0 });

  const slides: Slide[] = banners && banners.length
    ? banners.map((b) => ({ image: b.image, title: b.title, accent: b.subtitle ?? "", desc: "", cta: "تسوّق الآن", href: b.href ?? "/shop" }))
    : fallbackSlides;

  const [i, setI] = useState(0);
  const count = slides.length;

  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % count), 6000);
    return () => clearInterval(id);
  }, [count]);

  const s = slides[i % count];
  const next = () => setI((v) => (v + 1) % count);
  const prev = () => setI((v) => (v - 1 + count) % count);

  return (
    <section className="container-x pt-5">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-gradient-to-l from-white to-bg shadow-card">
        <div className="grid items-center gap-4 md:grid-cols-2">
          <div className="order-2 px-6 py-8 md:order-1 md:px-12 md:py-14">
            <AnimatePresence mode="wait">
              <motion.div key={i}
                initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.5 }}>
                <h1 className="text-4xl font-extrabold leading-tight text-primary md:text-5xl">{s.title}</h1>
                <p className="mt-2 text-2xl font-extrabold text-ink md:text-3xl">{s.accent}</p>
                {s.desc && <p className="mt-4 max-w-md text-base text-muted">{s.desc}</p>}
                <div className="mt-7 flex flex-wrap gap-3">
                  <Link href={s.href} className="btn-primary px-6 py-3 text-base">
                    <ShoppingBag width={18} height={18} /> {s.cta}
                  </Link>
                  <Link href="/offers" className="btn-outline px-6 py-3 text-base">عرض العروض</Link>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative order-1 h-56 md:order-2 md:h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div key={i} className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.06 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}>
                <Image src={s.image} alt={s.title} fill priority sizes="50vw" className="object-cover md:rounded-s-[2.5rem]" />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <button onClick={prev} aria-label="السابق"
          className="absolute top-1/2 right-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink shadow-card backdrop-blur hover:bg-white">
          <ChevronRight width={20} height={20} />
        </button>
        <button onClick={next} aria-label="التالي"
          className="absolute top-1/2 left-3 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-white/80 text-ink shadow-card backdrop-blur hover:bg-white">
          <ChevronLeft width={20} height={20} />
        </button>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {slides.map((_, d) => (
            <button key={d} onClick={() => setI(d)} aria-label={`شريحة ${d + 1}`}
              className={`h-2 rounded-full transition-all ${d === i % count ? "w-6 bg-primary" : "w-2 bg-ink/20"}`} />
          ))}
        </div>
      </div>
    </section>
  );
}
