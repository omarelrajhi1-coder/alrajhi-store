import type { Metadata } from "next";
import { Percent } from "lucide-react";
import OffersClient from "@/components/shop/OffersClient";
export const metadata: Metadata = { title: "العروض" };

export default function OffersPage() {
  return (
    <div>
      <section className="bg-gradient-to-l from-primary to-primary-dark py-14 text-center text-white">
        <div className="container-x">
          <span className="chip mx-auto bg-white/20 text-white"><Percent width={14} height={14} /> عروض حصرية</span>
          <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">عروض وخصومات الراجحي</h1>
          <p className="mx-auto mt-3 max-w-lg text-white/80">خصومات على تشكيلة مختارة من أطقم الصحون وأدوات المائدة والمفارش.</p>
        </div>
      </section>
      <OffersClient />
    </div>
  );
}
