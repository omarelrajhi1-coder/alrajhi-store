"use client";
import { createContext, useContext, useEffect, useMemo, useState, useCallback, useRef, ReactNode } from "react";
import type { Product, CartLine } from "@/types";
import { useAuth } from "@/context/AuthContext";
import { cartServerApi, wishlistServerApi } from "@/lib/api/services";

interface StoreState {
  cart: CartLine[];
  wishlist: string[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  isWished: (id: string) => boolean;
  cartCount: number;
  subtotal: number;
}

const StoreContext = createContext<StoreState | null>(null);
const CART_KEY = "alrajhi.cart";
const WISH_KEY = "alrajhi.wishlist";

export function StoreProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [ready, setReady] = useState(false);

  // keep a live ref to the current user so stable callbacks can read it
  const userRef = useRef(user);
  useEffect(() => { userRef.current = user; }, [user]);

  // 1) load guest state from localStorage on mount
  useEffect(() => {
    try {
      const c = localStorage.getItem(CART_KEY);
      const w = localStorage.getItem(WISH_KEY);
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
    setReady(true);
  }, []);

  // 2) mirror to localStorage (works for guests, and acts as a cache for users)
  useEffect(() => { if (ready) localStorage.setItem(CART_KEY, JSON.stringify(cart)); }, [cart, ready]);
  useEffect(() => { if (ready) localStorage.setItem(WISH_KEY, JSON.stringify(wishlist)); }, [wishlist, ready]);

  // 3) on login: merge guest cart once, then load server cart + wishlist (server-authoritative)
  const syncedRef = useRef<string | null>(null);
  useEffect(() => {
    if (!user) { syncedRef.current = null; return; }
    if (!ready || syncedRef.current === user.id) return;
    syncedRef.current = user.id;
    (async () => {
      try {
        const mergedFlag = `alrajhi.merged.${user.id}`;
        if (cart.length && !localStorage.getItem(mergedFlag)) {
          await cartServerApi.merge(cart.map((l) => ({ productId: l.product.id, qty: l.qty }))).catch(() => undefined);
          localStorage.setItem(mergedFlag, "1");
        }
        const [serverCart, ids] = await Promise.all([
          cartServerApi.get().catch(() => null),
          wishlistServerApi.ids().catch(() => [] as string[]),
        ]);
        if (serverCart) setCart(serverCart.items.map((i) => ({ product: i.product, qty: i.qty })));
        if (ids && ids.length) setWishlist(ids);
      } catch { /* ignore — keep local state */ }
    })();
  }, [ready, user, cart]);

  const addToCart = useCallback((p: Product, qty = 1) => {
    setCart((prev) => {
      const found = prev.find((l) => l.product.id === p.id);
      if (found) return prev.map((l) => (l.product.id === p.id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { product: p, qty }];
    });
    if (userRef.current) cartServerApi.add(p.id, qty).catch(() => undefined);
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setCart((prev) => prev.filter((l) => l.product.id !== id));
    if (userRef.current) cartServerApi.remove(id).catch(() => undefined);
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    const q = Math.max(1, qty);
    setCart((prev) => prev.map((l) => (l.product.id === id ? { ...l, qty: q } : l)));
    if (userRef.current) cartServerApi.setQty(id, q).catch(() => undefined);
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
    if (userRef.current) cartServerApi.clear().catch(() => undefined);
  }, []);

  const toggleWishlist = useCallback((id: string) => {
    setWishlist((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
    if (userRef.current) wishlistServerApi.toggle(id).catch(() => undefined);
  }, []);

  const isWished = useCallback((id: string) => wishlist.includes(id), [wishlist]);

  const cartCount = useMemo(() => cart.reduce((s, l) => s + l.qty, 0), [cart]);
  const subtotal = useMemo(() => cart.reduce((s, l) => s + l.qty * l.product.price, 0), [cart]);

  const value: StoreState = {
    cart, wishlist, addToCart, removeFromCart, setQty, clearCart,
    toggleWishlist, isWished, cartCount, subtotal,
  };
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
