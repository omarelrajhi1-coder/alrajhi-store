import type { Metadata } from "next";
import Image from "next/image";
import { Target, Heart, Award, Users } from "lucide-react";

export const metadata: Metadata = { title: "من نحن" };

const values = [
  { icon: Award, title: "جودة عالية", desc: "ننتقي منتجاتنا بعناية من علامات موثوقة لنضمن أفضل تجربة." },
  { icon: Heart, title: "ثقة العملاء", desc: "آلاف العملاء يثقون بنا لأننا نضع رضاهم في المقام الأول." },
  { icon: Target, title: "أسعار مناسبة", desc: "نوفّر أفضل قيمة مقابل السعر لكل منتج في متجرنا." },
  { icon: Users, title: "خدمة متميزة", desc: "فريق دعم جاهز لمساعدتك قبل وبعد الشراء." },
];

export default function AboutPage() {
  return (
    <div className="container-x py-10">
      <div className="grid items-center gap-10 lg:grid-cols-2">
        <div>
          <span className="chip bg-primary/10 text-primary">من نحن</span>
          <h1 className="mt-4 text-3xl font-extrabold text-ink sm:text-4xl">الراجحي للمواد المنزلية</h1>
          <p className="mt-5 leading-loose text-muted">
            انطلقنا من ليبيا برؤية واضحة: أن نجعل المنزل الأنيق في متناول الجميع. نقدّم تشكيلة واسعة من أطقم الصحون وأدوات المائدة والمفارش وإكسسوارات المطبخ بجودة عالية وأسعار مناسبة.
          </p>
          <p className="mt-4 leading-loose text-muted">
            نؤمن أن تفاصيل المائدة تصنع الفرق، لذلك نحرص على انتقاء كل قطعة بعناية، مع خدمة توصيل سريعة لكل المناطق وإمكانية الدفع عند الاستلام لراحتك التامة.
          </p>
          <div className="mt-8 grid grid-cols-3 gap-4 text-center">
            {[["+10", "آلاف عميل"], ["+500", "منتج"], ["24/7", "دعم"]].map(([n, l]) => (
              <div key={l} className="card p-4">
                <p className="text-2xl font-extrabold text-primary">{n}</p>
                <p className="text-xs text-muted">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-line">
          <Image src="/assets/products/p17.jpg" alt="الراجحي" fill sizes="50vw" className="object-cover" />
        </div>
      </div>

      <div className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {values.map((v) => (
          <div key={v.title} className="card p-6 text-center">
            <span className="mx-auto grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary"><v.icon width={24} height={24} /></span>
            <h3 className="mt-4 font-extrabold text-ink">{v.title}</h3>
            <p className="mt-2 text-sm text-muted">{v.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
