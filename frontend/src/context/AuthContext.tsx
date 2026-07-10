"use client";
import { createContext, useContext, useEffect, useState, useCallback, ReactNode } from "react";
import { authApi, PublicUser } from "@/lib/api/services";

interface AuthState {
  user: PublicUser | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (data: { name: string; email: string; phone?: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<PublicUser | null>(null);
  const [loading, setLoading] = useState(true);

  const refreshUser = useCallback(async () => {
    try { setUser(await authApi.me()); }
    catch { setUser(null); }
  }, []);

  useEffect(() => { refreshUser().finally(() => setLoading(false)); }, [refreshUser]);

  const login = useCallback(async (email: string, password: string) => { setUser(await authApi.login({ email, password })); }, []);
  const register = useCallback(async (data: { name: string; email: string; phone?: string; password: string }) => { setUser(await authApi.register(data)); }, []);
  const logout = useCallback(async () => { await authApi.logout().catch(() => undefined); setUser(null); }, []);

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, refreshUser, isAdmin: user?.role === "ADMIN" || user?.role === "STAFF" }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
