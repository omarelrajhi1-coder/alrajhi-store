export interface Category {
  id: string;
  slug: string;
  name: string;       // Arabic
  nameEn: string;
  image: string;
  count: number;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  slug?: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  text: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;       // Arabic
  nameEn: string;
  brandId: string;
  brandName?: string;     // provided by API DTO
  categorySlug: string;
  categoryName?: string;  // provided by API DTO
  stockQuantity?: number; // provided by API DTO
  price: number;
  oldPrice?: number;
  rating: number;
  reviewsCount: number;
  images: string[];
  inStock: boolean;
  isFeatured?: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  badge?: string;
  description: string;
  specs: { label: string; value: string }[];
  reviews?: Review[];
}

export interface CartLine {
  product: Product;
  qty: number;
}
