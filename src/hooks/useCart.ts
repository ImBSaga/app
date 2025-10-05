// hooks/useCart.ts
"use client";

import { useEffect, useState, useCallback } from "react";
import {
  getCart,
  deleteCart,
  addItemToCart,
  updateItemQty,
  deleteItemFromCart,
} from "@/services/cart.service";
import type { Item } from "@/types/Cart.type";
import type {
  AddItemToCartTypes,
  UpdateItemQtyTypes,
} from "@/lib/validation/cart.validation";

export function useCart() {
  const [items, setItems] = useState<Item[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const refreshCart = useCallback(async () => {
    try {
      setLoading(true);
      const res = await getCart();
      if (res.success && res.data.items) {
        setItems(res.data.items);
        setGrandTotal(res.data.grandTotal);
      } else {
        setItems([]);
        setGrandTotal(0);
      }
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch cart");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const handleAddItem = async (data: AddItemToCartTypes) => {
    await addItemToCart(data);
    await refreshCart();
  };

  const handleUpdateQty = async (itemId: number, data: UpdateItemQtyTypes) => {
    // optimistic update
    setItems((prev) =>
      prev.map((item) =>
        item.id === itemId
          ? { ...item, qty: data.qty, subtotal: data.qty * item.priceSnapshot }
          : item
      )
    );
    setGrandTotal(() => items.reduce((acc, item) => acc + item.subtotal, 0));
    try {
      await updateItemQty(itemId, data);
      await refreshCart();
    } catch {
      await refreshCart(); // reconcile if failed
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    await deleteItemFromCart(itemId);
    await refreshCart();
  };

  const handleClearCart = async () => {
    await deleteCart();
    setItems([]);
    setGrandTotal(0);
  };

  return {
    items,
    grandTotal,
    loading,
    error,
    refreshCart,
    handleAddItem,
    handleUpdateQty,
    handleDeleteItem,
    handleClearCart,
  };
}
