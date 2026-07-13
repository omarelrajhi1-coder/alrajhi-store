import HeroSlider from "@/components/HeroSlider";
import FeatureCards from "@/components/FeatureCards";
import CategoryCard from "@/components/CategoryCard";
import ProductGrid from "@/components/ProductGrid";
import SectionHeader from "@/components/SectionHeader";
import OfferBanner from "@/components/OfferBanner";
import BrandStrip from "@/components/BrandStrip";
import { categories } from "@/data/catalogue";
import { getHomeData } from "@/lib/api/server";

// Revalidate homepage data periodically (ISR) so admin/catalogue changes appear.
export const revalidate = 120;

export default async function HomePage() {
  const { featured: featuredProducts, best: bestsellers, latest: newArrivals } = await getHomeData();
  return (
    <>
      <HeroSlider />

      {/* features */}
      <FeatureCards />

      {/* categories */}
      <section className="container-x mt-16">
        <SectionHeader title="تسوّق حسب القسم" subtitle="اختر القسم الذي يناسب احتياجك" href="/shop" />
        <div className="grid grid-cols-3 gap-4 sm:grid-cols-4 lg:grid-cols-6">
          {categories.map((c, i) => <CategoryCard key={c.id} category={c} index={i} />)}
        </div>
      </section>

      {/* featured */}
      <section className="container-x mt-16">
        <SectionHeader title="منتجات مميزة" subtitle="مختارات فريقنا من الأكثر تميّزاً" href="/shop" />
        <ProductGrid products={featuredProducts.slice(0, 10)} />
      </section>

      <OfferBanner />

      {/* bestsellers */}
      <section className="container-x mt-16">
        <SectionHeader title="الأكثر مبيعاً" subtitle="ما يفضّله عملاؤنا أكثر" href="/shop" />
        <ProductGrid products={bestsellers.slice(0, 10)} />
      </section>

      {/* latest */}
      <section className="container-x mt-16">
        <SectionHeader title="أحدث المنتجات" subtitle="وصل حديثاً إلى متجرنا" href="/shop" />
        <ProductGrid products={newArrivals.slice(0, 5)} />
      </section>

      <BrandStrip />
    </>
  );
}
