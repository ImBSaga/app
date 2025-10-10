// app/me/layout.tsx
"use client";

// React
import { useRouter, usePathname } from "next/navigation";

// Shadcn
import { Button } from "@/components/ui/button";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigateShop = () => {
    router.push("/seller/shop");
  };
  const handleNavigateProducts = () => {
    router.push("/seller/products");
  };
  const handleNavigateOrders = () => {
    router.push("/seller/orders");
  };
  const handleNavigateHome = () => {
    router.push("/products");
  };

  const hideHeader = pathname === "/seller/activation";
  return (
    <>
      {!hideHeader && (
        <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50 gap-2">
          <h1 className="text-xl font-semibold">My Shop</h1>
          <div className="flex gap-2">
            <Button onClick={handleNavigateShop}>Shop</Button>
            <Button onClick={handleNavigateProducts}>Products</Button>
            <Button onClick={handleNavigateOrders}>Orders</Button>
            <Button onClick={handleNavigateHome}>Home</Button>
          </div>
        </header>
      )}

      {children}
    </>
  );
}
