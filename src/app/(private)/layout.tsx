// app/me/layout.tsx
"use client";

// React
import { useRouter, usePathname } from "next/navigation";

// Shadcn
import { Button } from "@/components/ui/button";

// Providers
import RequireAuth from "@/providers/RequireAuth";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Navigation
  const router = useRouter();
  const pathname = usePathname();
  const handleNavigate = () => {
    router.push("/seller/shop");
  };
  const handleNavigateProducts = () => {
    router.push("/seller/products");
  };
  const handleNavigateOrders = () => {
    router.push("/products");
  };

  const hideHeader = pathname === "/seller/activation";
  return (
    <RequireAuth>
      {!hideHeader && (
        <header className="flex items-center justify-between px-8 py-4 shadow-md bg-white sticky top-0 z-50 gap-2">
          <h1 className="text-xl font-semibold">Shirt</h1>
          <div className="flex gap-2">
            <Button onClick={handleNavigate}>My Shop</Button>
            <Button onClick={handleNavigateProducts}>My Products</Button>
            <Button onClick={handleNavigateOrders}>Home</Button>
          </div>
        </header>
      )}

      {children}
    </RequireAuth>
  );
}
