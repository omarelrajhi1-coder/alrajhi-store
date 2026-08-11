import { api, PageMeta } from "./client";
import type { Product, Category, Brand } from "@/types";

export interface Paginated<T> { items: T[]; meta: PageMeta; }
export interface PublicUser { id: string; name: string; email: string; phone: string | null; role: "CUSTOMER" | "ADMIN" | "STAFF"; avatar: string | null; }

export interface ProductQuery {
  category?: string; brand?: string; q?: string; sort?: string;
  page?: number; limit?: number; inStock?: boolean; minRating?: number; minPrice?: number; maxPrice?: number;
}

export const productsApi = {
  async list(query: ProductQuery = {}): Promise<Paginated<Product>> {
    const { data, meta } = await api.get<Product[]>("/products", query as Record<string, unknown>);
    return { items: data, meta: meta! };
  },
  async getBySlug(slug: string): Promise<{ product: Product; related: Product[] }> {
    return (await api.get<{ product: Product; related: Product[] }>(`/products/${slug}`)).data;
  },
  create: (body: unknown) => api.post<Product>("/products", body).then((r) => r.data),
  update: (id: string, body: unknown) => api.put<Product>(`/products/${id}`, body).then((r) => r.data),
  remove: (id: string) => api.del(`/products/${id}`),
};

export interface CategoryInput { slug: string; name: string; nameEn: string; image?: string; order?: number }
export const categoriesApi = {
  list: () => api.get<Category[]>("/categories").then((r) => r.data),
  create: (b: CategoryInput) => api.post<Category>("/categories", b).then((r) => r.data),
  update: (id: string, b: Partial<CategoryInput>) => api.put<Category>(`/categories/${id}`, b).then((r) => r.data),
  remove: (id: string) => api.del(`/categories/${id}`),
};
export interface BrandInput { slug: string; name: string; logo?: string }
export const brandsApi = {
  list: () => api.get<Brand[]>("/brands").then((r) => r.data),
  create: (b: BrandInput) => api.post<Brand>("/brands", b).then((r) => r.data),
  update: (id: string, b: Partial<BrandInput>) => api.put<Brand>(`/brands/${id}`, b).then((r) => r.data),
  remove: (id: string) => api.del(`/brands/${id}`),
};

export const authApi = {
  register: (b: { name: string; email: string; phone?: string; password: string }) => api.post<{ user: PublicUser }>("/auth/register", b).then((r) => r.data.user),
  login: (b: { email: string; password: string }) => api.post<{ user: PublicUser }>("/auth/login", b).then((r) => r.data.user),
  logout: () => api.post("/auth/logout"),
  me: () => api.get<{ user: PublicUser }>("/auth/me").then((r) => r.data.user),
  refresh: () => api.post<{ user: PublicUser }>("/auth/refresh").then((r) => r.data.user),
  forgot: (email: string) => api.post<{ sent: boolean; devResetToken?: string }>("/auth/forgot-password", { email }).then((r) => r.data),
  reset: (token: string, password: string) => api.post("/auth/reset-password", { token, password }),
};

export const cartApi = {
  get: () => api.get("/cart").then((r) => r.data),
  add: (productId: string, qty = 1) => api.post("/cart/items", { productId, qty }).then((r) => r.data),
  setQty: (productId: string, qty: number) => api.patch("/cart/items", { productId, qty }).then((r) => r.data),
  remove: (productId: string) => api.del(`/cart/items/${productId}`).then((r) => r.data),
  clear: () => api.del("/cart").then((r) => r.data),
  merge: (items: { productId: string; qty: number }[]) => api.post("/cart/merge", { items }).then((r) => r.data),
};

export const wishlistApi = {
  list: () => api.get<Product[]>("/wishlist").then((r) => r.data),
  ids: () => api.get<string[]>("/wishlist/ids").then((r) => r.data),
  toggle: (productId: string) => api.post<{ wished: boolean }>("/wishlist/toggle", { productId }).then((r) => r.data),
};

export interface CreateOrderBody {
  customer: string; phone: string; city: string; address: string; notes?: string; couponCode?: string;
  items: { productId: string; quantity: number }[];
}
export const ordersApi = {
  create: (b: CreateOrderBody) => api.post("/orders", b).then((r) => r.data),
  mine: () => api.get("/orders/mine").then((r) => r.data),
  getMine: (id: string) => api.get(`/orders/mine/${id}`).then((r) => r.data),
  listAdmin: (q: Record<string, unknown>) => api.get("/orders", q).then((r) => r),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }).then((r) => r.data),
};

export const couponsApi = {
  validate: (code: string, subtotal: number) => api.post<{ code: string; discount: number }>("/coupons/validate", { code, subtotal }).then((r) => r.data),
};

export const reviewsApi = {
  forProduct: (productId: string) => api.get(`/reviews/product/${productId}`).then((r) => r.data),
  create: (productId: string, b: { author: string; rating: number; text: string }) => api.post(`/reviews/product/${productId}`, b).then((r) => r.data),
};

export const dashboardApi = {
  overview: () => api.get("/dashboard/overview").then((r) => r.data),
  recentOrders: () => api.get("/dashboard/recent-orders").then((r) => r.data),
  topProducts: () => api.get("/dashboard/top-products").then((r) => r.data),
  salesByMonth: () => api.get<{ m: string; v: number }[]>("/dashboard/sales-by-month").then((r) => r.data),
};

export const cmsApi = {
  banners: () => api.get("/cms/banners").then((r) => r.data),
  sections: () => api.get("/cms/sections").then((r) => r.data),
  settings: () => api.get<Record<string, unknown>>("/cms/settings").then((r) => r.data),
  setSetting: (key: string, value: unknown) => api.put("/cms/settings", { key, value }).then((r) => r.data),
};

export interface AnalyticsSummary { last30Days: { events: { type: string; _count: number }[]; revenue: number; orders: number } }
export const analyticsApi = {
  track: (b: { type: string; path?: string; value?: number }) => api.post("/analytics/track", b).then((r) => r.data),
  summary: () => api.get<AnalyticsSummary>("/analytics/summary").then((r) => r.data),
};

export const contactApi = {
  send: (b: { name: string; phone: string; email?: string; message: string }) => api.post("/contact", b).then((r) => r.data),
};

export interface ContactMessage { id: string; name: string; phone: string; email: string | null; message: string; isRead: boolean; createdAt: string }
export const contactAdminApi = {
  list: (q: Record<string, unknown> = {}) => api.get<ContactMessage[]>("/contact", q).then((r) => ({ items: r.data, meta: r.meta })),
  unreadCount: () => api.get<{ count: number }>("/contact/unread-count").then((r) => r.data),
  markRead: (id: string) => api.patch(`/contact/${id}/read`).then((r) => r.data),
  remove: (id: string) => api.del(`/contact/${id}`),
};

// ---- Admin-only read/write services ----
export interface AdminUser { id: string; name: string; email: string; phone: string | null; role: string; isActive: boolean; createdAt: string; _count?: { orders: number } }
export const usersApi = {
  list: (q: Record<string, unknown> = {}) => api.get<AdminUser[]>("/users", q).then((r) => ({ items: r.data, meta: r.meta })),
  setActive: (id: string, isActive: boolean) => api.patch(`/users/${id}/active`, { isActive }).then((r) => r.data),
};

export interface InventoryRow { id: string; quantity: number; reserved: number; lowStockAt: number; product: { id: string; name: string; slug: string; sku: string | null } }
export const inventoryApi = {
  list: (q: Record<string, unknown> = {}) => api.get<InventoryRow[]>("/inventory", q).then((r) => ({ items: r.data, meta: r.meta })),
  set: (productId: string, quantity: number) => api.post("/inventory/set", { productId, quantity }).then((r) => r.data),
};

export interface AdminCoupon { id: string; code: string; type: "PERCENT" | "FIXED"; value: number; minTotal: number; active: boolean; usedCount: number; usageLimit: number | null; expiresAt: string | null }
export interface CouponInput { code: string; type: "PERCENT" | "FIXED"; value: number; minTotal?: number; usageLimit?: number; expiresAt?: string }
export const couponsAdminApi = {
  list: () => api.get<AdminCoupon[]>("/coupons").then((r) => r.data),
  create: (b: CouponInput) => api.post<AdminCoupon>("/coupons", b).then((r) => r.data),
  update: (id: string, b: Partial<CouponInput> & { active?: boolean }) => api.put<AdminCoupon>(`/coupons/${id}`, b).then((r) => r.data),
  remove: (id: string) => api.del(`/coupons/${id}`),
};

export interface AdminReview { id: string; author: string; rating: number; text: string; status: string; createdAt: string; product: { name: string; slug: string } }
export const reviewsAdminApi = {
  list: (q: Record<string, unknown> = {}) => api.get<AdminReview[]>("/reviews", q).then((r) => ({ items: r.data, meta: r.meta })),
  setStatus: (id: string, status: string) => api.patch(`/reviews/${id}/status`, { status }).then((r) => r.data),
};

export interface AdminOrder { id: string; number: string; customer: string; phone: string; city: string; address: string; notes: string | null; total: number; status: string; createdAt: string; items: { name: string; quantity: number }[] }
export const ordersAdminApi = {
  list: (q: Record<string, unknown> = {}) => api.get<AdminOrder[]>("/orders", q).then((r) => ({ items: r.data, meta: r.meta })),
  updateStatus: (id: string, status: string) => api.patch(`/orders/${id}/status`, { status }).then((r) => r.data),
};

export interface Address { id: string; fullName: string; phone: string; city: string; line: string; isDefault: boolean }
export const accountApi = {
  listAddresses: () => api.get<Address[]>("/account/addresses").then((r) => r.data),
  addAddress: (b: Omit<Address, "id">) => api.post<Address>("/account/addresses", b).then((r) => r.data),
  updateAddress: (id: string, b: Partial<Omit<Address, "id">>) => api.put<Address>(`/account/addresses/${id}`, b).then((r) => r.data),
  removeAddress: (id: string) => api.del(`/account/addresses/${id}`),
};

// ===== Banners (admin CMS) =====
export interface Banner { id: string; title: string; subtitle: string | null; image: string; href: string | null; order: number; isActive: boolean }
export const bannersApi = {
  listAll: () => api.get<Banner[]>("/cms/banners/all").then((r) => r.data),
  create: (b: { title: string; subtitle?: string; image: string; href?: string; order?: number }) => api.post<Banner>("/cms/banners", b).then((r) => r.data),
  update: (id: string, b: Partial<Banner>) => api.put<Banner>(`/cms/banners/${id}`, b).then((r) => r.data),
  remove: (id: string) => api.del(`/cms/banners/${id}`),
};

// ===== Employees + roles (admin) =====
export interface Employee { id: string; title: string | null; isActive: boolean; user: { id: string; name: string; email: string; isActive: boolean }; role: { id: string; name: string } | null }
export interface StaffRole { id: string; name: string; description: string | null }
export const employeesApi = {
  list: () => api.get<Employee[]>("/employees").then((r) => r.data),
  create: (b: { name: string; email: string; password: string; title?: string; roleId?: string }) => api.post<Employee>("/employees", b).then((r) => r.data),
  setActive: (id: string, isActive: boolean) => api.patch(`/employees/${id}/active`, { isActive }).then((r) => r.data),
  remove: (id: string) => api.del(`/employees/${id}`),
  roles: () => api.get<StaffRole[]>("/employees/roles/list").then((r) => r.data),
};

// ===== Notifications =====
export interface Notification { id: string; type: string; title: string; body: string | null; isRead: boolean; createdAt: string }
export const notificationsApi = {
  list: () => api.get<Notification[]>("/notifications").then((r) => r.data),
  unreadCount: () => api.get<{ count: number }>("/notifications/unread-count").then((r) => r.data.count),
  markRead: (id: string) => api.patch(`/notifications/${id}/read`).then((r) => r.data),
  markAllRead: () => api.patch("/notifications/read-all").then((r) => r.data),
};

// ===== extend usersApi with role =====
export const usersRoleApi = {
  setRole: (id: string, role: "CUSTOMER" | "ADMIN" | "STAFF") => api.patch(`/users/${id}/role`, { role }).then((r) => r.data),
};

// ===== cart & wishlist (server) =====
export interface ServerCartLine { product: Product; qty: number }
export interface ServerCart { items: ServerCartLine[]; count: number; subtotal: number }
export const cartServerApi = {
  get: () => api.get<ServerCart>("/cart").then((r) => r.data),
  add: (productId: string, qty = 1) => api.post<ServerCart>("/cart/items", { productId, qty }).then((r) => r.data),
  setQty: (productId: string, qty: number) => api.patch<ServerCart>("/cart/items", { productId, qty }).then((r) => r.data),
  remove: (productId: string) => api.del<ServerCart>(`/cart/items/${productId}`).then((r) => r.data),
  clear: () => api.del<ServerCart>("/cart").then((r) => r.data),
  merge: (items: { productId: string; qty: number }[]) => api.post<ServerCart>("/cart/merge", { items }).then((r) => r.data),
};
export const wishlistServerApi = {
  ids: () => api.get<string[]>("/wishlist/ids").then((r) => r.data),
  toggle: (productId: string) => api.post<{ wished: boolean }>("/wishlist/toggle", { productId }).then((r) => r.data),
};
