"use client";
import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Locale = "ar" | "en";
export type Dict = Record<string, string>;

const dict: Record<Locale, Dict> = {
  ar: {
    topContact: "تواصل معنا", topSupport: "خدمة العملاء",
    nav_home: "الرئيسية", nav_products: "المنتجات", nav_offers: "العروض",
    nav_about: "من نحن", nav_contact: "تواصل معنا",
    search: "ابحث عن منتج...", cart: "السلة", wishlist: "المفضلة",
    addToCart: "أضف إلى السلة", quickView: "عرض سريع", buyNow: "اشترِ الآن",
    viewAll: "عرض الكل", shopNow: "تسوّق الآن", viewOffers: "عرض العروض",
    featured: "منتجات مميزة", categories: "تسوّق حسب القسم", bestsellers: "الأكثر مبيعاً",
    latest: "أحدث المنتجات", brands: "علاماتنا التجارية", offers: "عروض خاصة",
    newsletterTitle: "اشترك في نشرتنا البريدية", newsletterDesc: "كن أول من يعرف عن العروض والمنتجات الجديدة",
    subscribe: "اشتراك", email: "البريد الإلكتروني",
    checkout: "إتمام الطلب", subtotal: "المجموع الفرعي", shipping: "التوصيل",
    total: "الإجمالي", emptyCart: "سلتك فارغة", continueShopping: "متابعة التسوّق",
    lang: "EN",
  },
  en: {
    topContact: "Contact us", topSupport: "Customer service",
    nav_home: "Home", nav_products: "Products", nav_offers: "Offers",
    nav_about: "About", nav_contact: "Contact",
    search: "Search for a product...", cart: "Cart", wishlist: "Wishlist",
    addToCart: "Add to cart", quickView: "Quick view", buyNow: "Buy now",
    viewAll: "View all", shopNow: "Shop now", viewOffers: "View offers",
    featured: "Featured products", categories: "Shop by category", bestsellers: "Best sellers",
    latest: "New arrivals", brands: "Our brands", offers: "Special offers",
    newsletterTitle: "Join our newsletter", newsletterDesc: "Be the first to know about deals and new products",
    subscribe: "Subscribe", email: "Email address",
    checkout: "Checkout", subtotal: "Subtotal", shipping: "Shipping",
    total: "Total", emptyCart: "Your cart is empty", continueShopping: "Continue shopping",
    lang: "ع",
  },
};

interface LocaleState { locale: Locale; t: Dict; toggle: () => void; }
const LocaleContext = createContext<LocaleState | null>(null);

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>("ar");

  useEffect(() => {
    const saved = (localStorage.getItem("alrajhi.locale") as Locale) || "ar";
    setLocale(saved);
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
    localStorage.setItem("alrajhi.locale", locale);
  }, [locale]);

  const toggle = () => setLocale((l) => (l === "ar" ? "en" : "ar"));
  return <LocaleContext.Provider value={{ locale, t: dict[locale], toggle }}>{children}</LocaleContext.Provider>;
}

export function useLocale() {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx;
}
