// app/(public)/layout.tsx
"use client";

// React
import { useEffect, ReactNode } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

// Components
import HeaderSearch from "@/components/ui/HeaderSearch";

// Shadcn
import { Button } from "@/components/ui/button";

// Icons
import { ShoppingCart } from "lucide-react";

// Hooks
import { useCart } from "@/hooks/useCart";
import { useSeller } from "@/hooks/useSeller";

// Providers
import { useAuth } from "@/providers/AuthProvider";

export default function PublicLayout({ children }: { children: ReactNode }) {
  // Hooks
  const { items } = useCart();
  const { logout } = useAuth();
  const { shop, fetchShop } = useSeller();

  // Logics
  const totalQty = items.reduce((acc, item) => acc + item.qty, 0);

  // Navigation
  const pathname = usePathname();
  const hideHeader = pathname === "/login" || pathname === "/register";
  const router = useRouter();
  const handleNavigate = () => {
    router.push("/seller/activation");
  };
  const handleNavigateSeller = () => {
    router.push("/seller/products");
  };

  useEffect(() => {
    fetchShop();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="bg-white text-gray-900 min-h-screen">
      {!hideHeader && (
        <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50 gap-2">
          <h1 className="text-xl font-semibold">Shirt</h1>
          <HeaderSearch />
          <Link href="/cart" className="relative flex items-center">
            <ShoppingCart className="w-6 h-6" />
            {totalQty > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalQty}
              </span>
            )}
          </Link>

          {shop ? (
            <Button onClick={handleNavigateSeller}>My Products</Button>
          ) : (
            <Button onClick={handleNavigate}>Open Store</Button>
          )}

          <Button onClick={logout}>Logout</Button>
        </header>
      )}

      <main>{children}</main>
    </div>
  );
}
