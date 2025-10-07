"use client";

import { useEffect, useState } from "react";

// Types
import type { ProductDetail } from "@/types/Products.type";

// Service
import { getProductById } from "@/services/products.service";

export const useProductDetail = (id: number) => {
  // States
  const [product, setProduct] = useState<ProductDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await getProductById({ id });
        setProduct(res.data);
      } catch (err: Error | unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to fetch product details"
        );
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
