"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import { Star } from "lucide-react";
import type { ProductCardProps } from "@/types/Products.type";
import Link from "next/link";

const ProductCard = ({ product, index }: ProductCardProps) => {
  return (
    <Link href={`/products/${product.id}`}>
      <Card className="hover:shadow-lg transition rounded-2xl overflow-hidden">
        <CardHeader className="p-0">
          <div className="relative w-full h-48">
            <Image
              unoptimized
              src={product.images[0] || "/images/image-placeholder.jpeg"}
              alt={product.title}
              fill
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/images/image-placeholder.jpeg";
              }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover"
              priority={index < 4}
            />
          </div>
        </CardHeader>
        <CardContent className="p-4">
          <CardTitle className="text-lg font-semibold truncate">
            {product.title}
          </CardTitle>

          <p className="font-bold mt-1">
            Rp. {new Intl.NumberFormat("id-ID").format(product.price)}
          </p>
          <div className="flex items-center gap-1 text-yellow-500 mt-2">
            <Star className="w-4 h-4 fill-current" />
            <span className="text-sm text-gray-700">
              {product.rating.toFixed(1)} {product.soldCount} Sold
            </span>
          </div>

          <div className="flex flex-row items-center gap-1">
            <Image
              src="/icons/icon-verify.svg"
              alt="Verified"
              width={24}
              height={24}
            />
            <p className="text-sm text-gray-700">{product.shop.name}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
