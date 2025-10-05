"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useProducts } from "@/hooks/useProducts";
import ProductCard from "@/components/container/ProductCard";
import ProductFilters from "@/components/container/ProductFilters";
import { Skeleton } from "@/components/ui/skeleton";

export default function ProductPage() {
  const searchParams = useSearchParams();
  const queryParam = searchParams.get("q") ?? "";

  const {
    products,
    categories,
    loading,
    error,
    handleFilterChange,
    lastElementRef,
    filters,
  } = useProducts();

  useEffect(() => {
    // Only trigger if the query changed
    if (filters.q !== queryParam) {
      handleFilterChange({ q: queryParam });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryParam]);

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-8 space-y-6">
      <h1 className="text-2xl font-bold">Catalog</h1>

      <ProductFilters
        categories={categories}
        onFilterChange={handleFilterChange}
      />

      {error && <p className="text-red-500">{error}</p>}
      {!loading && products.length === 0 && (
        <p className="text-gray-500 text-center">No products found.</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {products.map((product, index) => {
          const isLast = index === products.length - 1;
          return (
            <div key={product.id} ref={isLast ? lastElementRef : undefined}>
              <ProductCard key={product.id} product={product} index={index} />
            </div>
          );
        })}
      </div>

      {loading && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="w-full h-64 rounded-xl" />
          ))}
        </div>
      )}
    </main>
  );
}
