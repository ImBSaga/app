// app/(public)/layout.tsx
"use client";

import HeaderSearch from "@/components/ui/HeaderSearch";
import { ReactNode } from "react";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/hooks/useCart";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { items } = useCart();

  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50">
        <h1 className="text-xl font-semibold">MyShop</h1>
        <HeaderSearch />

        <Link href="/cart" className="relative flex items-center">
          <ShoppingCart className="w-6 h-6" />
          {totalQty > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {totalQty}
            </span>
          )}
        </Link>
      </header>

      <main>{children}</main>
    </div>
  );
}
