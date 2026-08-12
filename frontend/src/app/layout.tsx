import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const cairo = Cairo({ subsets: ["arabic", "latin"], variable: "--font-cairo", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://alrajhi-store.vercel.app"),
  title: { default: "الراجحي للمواد المنزلية | جودة عالية وأسعار مناسبة", template: "%s | الراجحي" },
  description: "متجر الراجحي للمواد المنزلية والكهربائية في ليبيا — أطقم صحون، أدوات مائدة، مفارش، وإكسسوارات المطبخ بجودة عالية وأسعار مناسبة. الدفع عند الاستلام وتوصيل سريع.",
  keywords: ["الراجحي", "مواد منزلية", "أدوات مطبخ", "أطقم صحون", "ليبيا", "طرابلس"],
  openGraph: { title: "الراجحي للمواد المنزلية", description: "جودة عالية .. أسعار مناسبة .. ثقة تدوم", type: "website", locale: "ar_LY" },
  twitter: { card: "summary_large_image", title: "الراجحي للمواد المنزلية" },
  icons: { icon: "/assets/brands/rtc.png" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={cairo.variable}>
      <body className="min-h-screen font-sans antialiased">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
