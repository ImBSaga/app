"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dayjs from "dayjs";

// Types
import type { Product } from "@/types/SellerProducts.type";
import type {
  GetSellerProductsTypes,
  CreateSellerProductsTypes,
  UpdateSellerProductsTypes,
} from "@/lib/validation/sellerProducts.validation";

// Service
import {
  getSellerProducts,
  createSellerProduct,
  updateSellerProduct,
  deleteSellerProduct,
} from "@/services/sellerProducts.service";

export function useSellerProducts(initialPage = 1, initialLimit = 10) {
  const [products, setProducts] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(initialPage);
  const [limit, setLimit] = useState<number>(initialLimit);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Get Products
  const load = useCallback(
    async (opts?: Partial<GetSellerProductsTypes>) => {
      setLoading(true);
      setError(null);
      try {
        const params: Partial<GetSellerProductsTypes> = {
          q: opts?.q ?? "",
          isActive:
            typeof opts?.isActive === "boolean" ? opts?.isActive : undefined,
          page: opts?.page ?? page,
          limit: opts?.limit ?? limit,
        };

        const res = await getSellerProducts(params);
        setProducts(res.data.products);
        setTotal(res.data.pagination.total ?? res.data.products.length);
      } catch (err: Error | unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to load products"
        );
      } finally {
        setLoading(false);
      }
    },
    [page, limit]
  );

  useEffect(() => {
    // always load when page/limit changes
    load({ page, limit });
  }, [load, page, limit]);

  // Create Product (optimistic)
  const create = useCallback(
    async (payload: Partial<CreateSellerProductsTypes>) => {
      // optimistic id
      const optimisticId = dayjs().valueOf() * -1;
      const optimisticProduct: Product = {
        id: optimisticId,
        title: payload.title ?? "(untitled)",
        slug: "",
        description: payload.description ?? "",
        price: payload.price ?? 0,
        stock: payload.stock ?? 0,
        images: payload.images ?? [],
        isActive:
          typeof payload.isActive === "boolean" ? payload.isActive : true,
        rating: 0,
        reviewCount: 0,
        soldCount: 0,
        shopId: 0,
        categoryId: payload.categoryId ?? 0,
        createdAt: dayjs().toISOString(),
        updatedAt: dayjs().toISOString(),
        category: {
          id: payload.categoryId ?? 0,
          name: "",
          slug: "",
          createdAt: dayjs().toISOString(),
          updatedAt: dayjs().toISOString(),
        },
      };

      setProducts((p) => [optimisticProduct, ...p]);
      try {
        const res = await createSellerProduct(
          payload as CreateSellerProductsTypes
        );
        // replace optimistic with real
        setProducts((prev) =>
          prev.map((item) =>
            item.id === optimisticId ? res.data.product : item
          )
        );
        return res.data.product;
      } catch (err: Error | unknown) {
        // rollback
        setProducts((prev) => prev.filter((item) => item.id !== optimisticId));
        throw err;
      }
    },
    []
  );

  // Update Product
  const update = useCallback(
    async (id: number, payload: Partial<UpdateSellerProductsTypes>) => {
      // snapshot
      const snapshot = products;
      // optimistic update
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? ({ ...p, ...payload } as Product) : p))
      );

      try {
        const res = await updateSellerProduct(
          id,
          payload as UpdateSellerProductsTypes
        );
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? res.data.product : p))
        );
        return res.data.product;
      } catch (err: Error | unknown) {
        setProducts(snapshot);
        throw err;
      }
    },
    [products]
  );

  // Delete Product
  const remove = useCallback(
    async (id: number) => {
      // optimistic: mark isActive false
      const snapshot = products;
      setProducts((prev) =>
        prev.map((p) => (p.id === id ? { ...p, isActive: false } : p))
      );

      try {
        const res = await deleteSellerProduct(id);
        // use returned product if any
        setProducts((prev) =>
          prev.map((p) => (p.id === id ? res.data.product : p))
        );
        return res.data.product;
      } catch (err: Error | unknown) {
        setProducts(snapshot);
        throw err;
      }
    },
    [products]
  );

  // Set Product active/inactive
  const toggleActive = useCallback(
    async (id: number, active: boolean) => {
      return update(id, { isActive: active });
    },
    [update]
  );

  // Pagination
  const goNext = useCallback(() => setPage((p) => p + 1), []);
  const goPrev = useCallback(() => setPage((p) => Math.max(1, p - 1)), []);
  const setToPage = useCallback((p: number) => setPage(p), []);

  return useMemo(
    () => ({
      products,
      loading,
      error,
      page,
      limit,
      total,
      load,
      create,
      update,
      remove,
      toggleActive,
      goNext,
      goPrev,
      setToPage,
      setLimit,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      products,
      loading,
      error,
      page,
      limit,
      total,
      load,
      create,
      update,
      remove,
      toggleActive,
    ]
  );
}
