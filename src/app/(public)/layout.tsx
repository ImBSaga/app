"use client";

import { useEffect, useState, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import HeaderSearch from "@/components/ui/HeaderSearch";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

import { useCartContext } from "@/providers/CartProvider";
import { useSeller } from "@/hooks/useSeller";
import { useAuth } from "@/providers/AuthProvider";

export default function PublicLayout({ children }: { children: ReactNode }) {
  const { items } = useCartContext();
  const { logout, user } = useAuth();
  const { shop, fetchShop, loading } = useSeller();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  const pathname = usePathname();
  const hideHeader = pathname === "/login" || pathname === "/register";
  const router = useRouter();

  const handleNavigate = () => router.push("/seller/activation");
  const handleNavigateSeller = () => router.push("/seller/products");
  const handleNavigateLogin = () => router.push("/login");

  useEffect(() => {
    if (user) fetchShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {!hideHeader && (
        <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50 gap-2">
          <h1 className="text-xl font-semibold">Shirt</h1>
          <HeaderSearch />
          <Link href="/cart" className="relative flex items-center">
            {loading ? (
              <div className="w-6 h-6 border-2 border-gray-300 border-t-red-500 rounded-full animate-spin" />
            ) : (
              <ShoppingCart className="w-6 h-6" />
            )}
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>

          {mounted && (
            <>
              {shop ? (
                <Button onClick={handleNavigateSeller}>My Products</Button>
              ) : (
                <Button onClick={handleNavigate}>Open Store</Button>
              )}

              {user ? (
                <Button onClick={logout}>Logout</Button>
              ) : (
                <Button onClick={handleNavigateLogin}>Login</Button>
              )}
            </>
          )}
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
