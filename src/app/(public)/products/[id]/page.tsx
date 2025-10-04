"use client";

import { useParams } from "next/navigation";
import { useProductDetail } from "@/hooks/useProductDetail";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { product, loading, error } = useProductDetail(Number(id));

  if (loading)
    return (
      <main className="p-8">
        <Skeleton className="w-full h-96 rounded-xl" />
      </main>
    );

  if (error) return <p className="text-red-500 p-8">{error}</p>;
  if (!product) return <p className="text-gray-500 p-8">Product not found</p>;

  return (
    <main className="min-h-screen bg-[#F5F5F5] p-8">
      <Card className="max-w-4xl mx-auto">
        <CardContent className="p-6 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex justify-center">
            <Image
              src={product.images?.[0] || "/images/image-placeholder.jpeg"}
              alt={product.title}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/image-placeholder.jpeg";
              }}
              width={400}
              height={400}
            />
          </div>

          <div className="space-y-4">
            <h1 className="text-2xl font-bold">{product.title}</h1>
            <p className="text-gray-600">{product.category.name}</p>
            <p className="text-xl font-semibold">${product.price}</p>
            <p className="text-gray-700">{product.description}</p>

            <Button>Add to Cart</Button>
          </div>
        </CardContent>
      </Card>
    </main>
  );
}
