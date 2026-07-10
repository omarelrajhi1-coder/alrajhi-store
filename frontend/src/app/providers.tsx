"use client";
import { ReactNode } from "react";
import { StoreProvider } from "@/context/StoreContext";
import { LocaleProvider } from "@/context/LocaleContext";
import { AuthProvider } from "@/context/AuthContext";
import QueryProvider from "@/lib/query-provider";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      <LocaleProvider>
        <AuthProvider>
          <StoreProvider>{children}</StoreProvider>
        </AuthProvider>
      </LocaleProvider>
    </QueryProvider>
  );
}
