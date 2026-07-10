import { AppError } from "../../utils/AppError";
import { productsRepository, ProductFilter } from "./products.repository";
import { toProductDto } from "./product.mapper";

export const productsService = {
  async list(filter: ProductFilter, opts: { skip: number; limit: number; sort: string; page: number }) {
    const { items, total } = await productsRepository.paginate(filter, opts);
    return { items: items.map(toProductDto), total };
  },
  async getBySlug(slug: string) {
    const p = await productsRepository.findBySlug(slug);
    if (!p) throw AppError.notFound("المنتج غير موجود");
    const related = await productsRepository.related(p.categoryId, p.id);
    return { product: toProductDto(p), related: related.map(toProductDto) };
  },
  async create(input: ProductCreateInput) {
    const created = await productsRepository.create(mapCreate(input));
    return toProductDto(created);
  },
  async update(id: string, input: Partial<ProductCreateInput>) {
    const existing = await productsRepository.findById(id);
    if (!existing) throw AppError.notFound("المنتج غير موجود");
    const updated = await productsRepository.update(id, mapUpdate(input));
    return toProductDto(updated);
  },
  async remove(id: string) {
    const existing = await productsRepository.findById(id);
    if (!existing) throw AppError.notFound("المنتج غير موجود");
    await productsRepository.softDelete(id);
  },
};

export interface ProductCreateInput {
  slug: string; sku?: string; name: string; nameEn: string; description: string;
  price: number; oldPrice?: number; categoryId: string; brandId: string;
  images?: string[]; inStock?: boolean; isFeatured?: boolean; isBestseller?: boolean; isNew?: boolean;
  specs?: { label: string; value: string }[]; quantity?: number;
}

function mapCreate(i: ProductCreateInput) {
  return {
    slug: i.slug, sku: i.sku, name: i.name, nameEn: i.nameEn, description: i.description,
    price: i.price, oldPrice: i.oldPrice, inStock: i.inStock ?? true,
    isFeatured: i.isFeatured ?? false, isBestseller: i.isBestseller ?? false, isNew: i.isNew ?? false,
    specs: i.specs ?? [],
    category: { connect: { id: i.categoryId } },
    brand: { connect: { id: i.brandId } },
    images: i.images?.length ? { create: i.images.map((url, idx) => ({ url, order: idx })) } : undefined,
    inventory: { create: { quantity: i.quantity ?? 0 } },
  };
}

function mapUpdate(i: Partial<ProductCreateInput>) {
  return {
    slug: i.slug, sku: i.sku, name: i.name, nameEn: i.nameEn, description: i.description,
    price: i.price, oldPrice: i.oldPrice, inStock: i.inStock,
    isFeatured: i.isFeatured, isBestseller: i.isBestseller, isNew: i.isNew,
    specs: i.specs,
    ...(i.categoryId ? { category: { connect: { id: i.categoryId } } } : {}),
    ...(i.brandId ? { brand: { connect: { id: i.brandId } } } : {}),
    // Replace the product's images when new ones are provided on edit.
    ...(i.images ? { images: { deleteMany: {}, create: i.images.map((url, idx) => ({ url, order: idx })) } } : {}),
  };
}
