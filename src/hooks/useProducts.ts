"use client";

import { useState, useEffect, useRef, useCallback } from "react";

// Types
import type { Product } from "@/types/Products.type";
import type { Category } from "@/types/Categories.type";
import type { GetProductsTypes } from "@/lib/validation/products.validation";

// Service
import { getProducts } from "@/services/products.service";
import { getCategories } from "@/services/categories.service";

export const useProducts = () => {
  // States
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 20,
    total: 0,
    totalPages: 0,
  });
  const [filters, setFilters] = useState<GetProductsTypes>({
    page: 1,
    limit: 20,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  // Refs
  const observerRef = useRef<IntersectionObserver | null>(null);
  const initialLoad = useRef(false);

  // Fetch products
  const fetchProducts = async (params?: GetProductsTypes, append = false) => {
    setLoading(true);
    setError(null);
    try {
      const data = await getProducts(params ?? filters);
      const { products: newProducts, pagination } = data.data;

      setPagination(pagination);
      setHasMore(pagination.page < pagination.totalPages);

      setProducts((prev) => (append ? [...prev, ...newProducts] : newProducts));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const data = await getCategories();
      setCategories(data.data.categories);
    } catch {
      setError("Failed to fetch categories");
    }
  };

  // Initial load
  useEffect(() => {
    fetchCategories();
    fetchProducts(filters);
    initialLoad.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // When filters (except page) change, reset products
  useEffect(() => {
    if (!initialLoad.current) return;
    // reset list when filters change except for page
    fetchProducts(filters);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    filters.q,
    filters.categoryId,
    filters.minPrice,
    filters.maxPrice,
    filters.sort,
    filters.order,
  ]);

  // Infinite scroll logic
  const lastElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver((entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && hasMore && !loading) {
          const nextPage = filters.page + 1;
          setFilters((prev) => ({ ...prev, page: nextPage }));
          fetchProducts({ ...filters, page: nextPage }, true); // append = true
        }
      });

      if (node) observerRef.current.observe(node);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [loading, hasMore, filters]
  );

  // Filter changes (like category/sort/search)
  const handleFilterChange = (newFilters: Partial<GetProductsTypes>) => {
    setProducts([]); // clear previous
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
      page: 1,
    }));
  };

  return {
    products,
    categories,
    loading,
    error,
    filters,
    hasMore,
    pagination,
    handleFilterChange,
    lastElementRef,
  };
};
