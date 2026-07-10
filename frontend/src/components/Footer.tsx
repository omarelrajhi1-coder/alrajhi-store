"use client";
import Link from "next/link";
import { Phone, Mail, MapPin, Facebook, Instagram, Twitter, Send } from "lucide-react";
import Logo from "./Logo";

const cols = [
  { title: "روابط سريعة", links: [["الرئيسية","/"],["المنتجات","/shop"],["العروض","/offers"],["من نحن","/about"],["تواصل معنا","/contact"]] },
  { title: "خدمة العملاء", links: [["حسابي","/account"],["طلباتي","/account"],["سلة التسوّق","/cart"],["سياسة الإرجاع","/about"],["الشحن والتوصيل","/about"]] },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-line bg-white">
      <div className="container-x grid gap-8 py-12 md:grid-cols-2 lg:grid-cols-5">
        <div className="lg:col-span-2">
          <Logo />
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            الراجحي للمواد المنزلية والكهربائية — وجهتك الأولى في ليبيا لأطقم الصحون وأدوات المائدة والمفارش وإكسسوارات المطبخ. جودة عالية، أسعار مناسبة، وثقة تدوم.
          </p>
          <div className="mt-5 flex gap-2">
            {[Facebook, Instagram, Twitter].map((Icon, i) => (
              <a key={i} href="#" aria-label="social"
                className="grid h-9 w-9 place-items-center rounded-full border border-line text-ink transition-colors hover:border-primary hover:bg-primary hover:text-white">
                <Icon width={17} height={17} />
              </a>
            ))}
          </div>
        </div>

        {cols.map((c) => (
          <div key={c.title}>
            <h4 className="mb-4 text-sm font-extrabold text-ink">{c.title}</h4>
            <ul className="space-y-2.5 text-sm text-muted">
              {c.links.map(([label, href]) => (
                <li key={label}><Link href={href} className="hover:text-primary">{label}</Link></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h4 className="mb-4 text-sm font-extrabold text-ink">تواصل معنا</h4>
          <ul className="space-y-3 text-sm text-muted">
            <li className="flex items-center gap-2"><Phone width={15} height={15} className="text-primary" /> 092 123 4567</li>
            <li className="flex items-center gap-2"><Mail width={15} height={15} className="text-primary" /> info@alrajhi.ly</li>
            <li className="flex items-start gap-2"><MapPin width={15} height={15} className="mt-0.5 text-primary" /> طرابلس، ليبيا</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col items-center justify-between gap-2 py-4 text-xs text-muted sm:flex-row">
          <p>© {new Date().getFullYear()} الراجحي للمواد المنزلية. جميع الحقوق محفوظة.</p>
          <p className="flex items-center gap-1"><Send width={12} height={12} className="text-primary" /> صُنع بعناية في ليبيا</p>
        </div>
      </div>
    </footer>
  );
}
