"use client";

import { createContext, useContext, ReactNode } from "react";
import { useCart as useCartHook } from "@/hooks/useCart";

const CartContext = createContext<ReturnType<typeof useCartHook> | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const cart = useCartHook();
  return <CartContext.Provider value={cart}>{children}</CartContext.Provider>;
}

export function useCartContext() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
}
