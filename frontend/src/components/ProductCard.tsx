"use client";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import type { Product } from "@/types";
import { useStore } from "@/context/StoreContext";
import { cn, discountPercent, safeImg } from "@/lib/utils";
import RatingStars from "./ui/RatingStars";
import Price from "./ui/Price";

export default function ProductCard({ product, index = 0 }: { product: Product; index?: number }) {
  const { addToCart, toggleWishlist, isWished } = useStore();
  const disc = discountPercent(product.price, product.oldPrice);
  const wished = isWished(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.4, delay: (index % 5) * 0.05 }}
      className="group card overflow-hidden transition-shadow duration-300 hover:shadow-hover"
    >
      <div className="relative aspect-square overflow-hidden bg-bg">
        <Link href={`/product/${product.slug}`}>
          <Image
            src={safeImg(product.images[0])} alt={product.name} fill sizes="(max-width:768px) 50vw, 20vw"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        <div className="absolute right-3 top-3 flex flex-col gap-1.5">
          {disc && <span className="chip bg-primary text-white">-{disc}%</span>}
          {product.isNew && !disc && <span className="chip bg-ink text-white">جديد</span>}
          {!product.inStock && <span className="chip bg-muted text-white">نفد</span>}
        </div>

        <button
          onClick={() => toggleWishlist(product.id)}
          aria-label="إضافة إلى المفضلة"
          className={cn(
            "absolute left-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-white/90 shadow-card backdrop-blur transition-colors",
            wished ? "text-primary" : "text-ink hover:text-primary"
          )}
        >
          <Heart width={18} height={18} className={cn(wished && "fill-primary")} />
        </button>

        {/* hover actions */}
        <div className="absolute inset-x-3 bottom-3 flex translate-y-3 gap-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
          <button
            onClick={() => addToCart(product)}
            disabled={!product.inStock}
            className="btn-primary flex-1 py-2"
          >
            <ShoppingCart width={16} height={16} /> أضف للسلة
          </button>
          <Link href={`/product/${product.slug}`} aria-label="عرض سريع"
            className="btn-outline grid h-[38px] w-[42px] place-items-center bg-white p-0">
            <Eye width={16} height={16} />
          </Link>
        </div>
      </div>

      <div className="space-y-2 p-4">
        <span className="text-[11px] font-bold uppercase tracking-wide text-muted">{product.nameEn ? "" : ""}{product.badge ?? ""}</span>
        <Link href={`/product/${product.slug}`}>
          <h3 className="line-clamp-2 min-h-[2.6em] text-sm font-bold leading-tight text-ink hover:text-primary">
            {product.name}
          </h3>
        </Link>
        <RatingStars value={product.rating} count={product.reviewsCount} />
        <Price price={product.price} oldPrice={product.oldPrice} />
      </div>
    </motion.article>
  );
}
