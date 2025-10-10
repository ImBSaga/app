// // hooks/useCart.ts
// "use client";

// import { useEffect, useState, useCallback } from "react";

// // Types
// import type { Item } from "@/types/Cart.type";
// import type {
//   AddItemToCartTypes,
//   UpdateItemQtyTypes,
// } from "@/lib/validation/cart.validation";

// // Service
// import {
//   getCart,
//   deleteCart,
//   addItemToCart,
//   updateItemQty,
//   deleteItemFromCart,
// } from "@/services/cart.service";

// // Provider
// import { useAuth } from "@/providers/AuthProvider";

// export function useCart() {
//   const [items, setItems] = useState<Item[]>([]);
//   const [grandTotal, setGrandTotal] = useState<number>(0);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [error, setError] = useState<string | null>(null);

//   const { user, token } = useAuth();

//   const refreshCart = useCallback(async () => {
//     if (!token) return;
//     try {
//       setLoading(true);
//       const res = await getCart();
//       if (res.success && res.data.items) {
//         setItems(res.data.items);
//         setGrandTotal(res.data.grandTotal);
//       } else {
//         setItems([]);
//         setGrandTotal(0);
//       }
//     } catch (err: Error | unknown) {
//       setError(err instanceof Error ? err.message : "Failed to fetch cart");
//     } finally {
//       setLoading(false);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (user && token) refreshCart();
//   }, [refreshCart, user, token]);

//   const handleAddItem = async (data: AddItemToCartTypes) => {
//     await addItemToCart(data);
//     await refreshCart();
//   };

//   const handleUpdateQty = async (itemId: number, data: UpdateItemQtyTypes) => {
//     // optimistic update
//     setItems((prev) =>
//       prev.map((item) =>
//         item.id === itemId
//           ? { ...item, qty: data.qty, subtotal: data.qty * item.priceSnapshot }
//           : item
//       )
//     );
//     setGrandTotal(() => items.reduce((acc, item) => acc + item.subtotal, 0));
//     try {
//       await updateItemQty(itemId, data);
//       await refreshCart();
//     } catch {
//       await refreshCart(); // reconcile if failed
//     }
//   };

//   const handleDeleteItem = async (itemId: number) => {
//     await deleteItemFromCart(itemId);
//     await refreshCart();
//   };

//   const handleClearCart = async () => {
//     await deleteCart();
//     setItems([]);
//     setGrandTotal(0);
//   };

//   return {
//     items,
//     grandTotal,
//     loading,
//     error,
//     refreshCart,
//     handleAddItem,
//     handleUpdateQty,
//     handleDeleteItem,
//     handleClearCart,
//   };
// }

// hooks/useCart.ts
"use client";

import { useEffect, useState, useCallback } from "react";

// Types
import type { Item } from "@/types/Cart.type";
import type {
  AddItemToCartTypes,
  UpdateItemQtyTypes,
} from "@/lib/validation/cart.validation";

// Service
import {
  getCart,
  deleteCart,
  addItemToCart,
  updateItemQty,
  deleteItemFromCart,
} from "@/services/cart.service";

// Provider
import { useAuth } from "@/providers/AuthProvider";

export function useCart() {
  const [items, setItems] = useState<Item[]>([]);
  const [grandTotal, setGrandTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { user, token } = useAuth();

  const refreshCart = useCallback(async () => {
    if (!token) return;
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
  }, [token]);

  useEffect(() => {
    if (user && token) refreshCart();
  }, [refreshCart, user, token]);

  // Optimistic Add to Cart
  const handleAddItem = async (data: AddItemToCartTypes) => {
    if (!token) return;

    // Optimistic UI update
    setItems((prev) => {
      const existing = prev.find((item) => item.productId === data.productId);
      if (existing) {
        return prev.map((item) =>
          item.productId === data.productId
            ? { ...item, qty: item.qty + data.qty }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: Math.random(), // temporary ID
            productId: data.productId,
            qty: data.qty,
            priceSnapshot: 0,
            subtotal: 0,
            product: undefined,
          },
        ];
      }
    });

    try {
      await addItemToCart(data);
      await refreshCart(); // reconcile state with backend
    } catch (err) {
      console.error("Add to cart failed:", err);
      await refreshCart(); // rollback if failed
    }
  };

  // Optimistic update for quantity
  const handleUpdateQty = async (itemId: number, data: UpdateItemQtyTypes) => {
    const prevItems = [...items];
    const prevTotal = grandTotal;

    const newItems = items.map((item) =>
      item.id === itemId
        ? { ...item, qty: data.qty, subtotal: data.qty * item.priceSnapshot }
        : item
    );
    const newTotal = newItems.reduce((acc, item) => acc + item.subtotal, 0);

    setItems(newItems);
    setGrandTotal(newTotal);

    try {
      await updateItemQty(itemId, data);
      await refreshCart();
    } catch {
      // rollback if API fails
      setItems(prevItems);
      setGrandTotal(prevTotal);
    }
  };

  const handleDeleteItem = async (itemId: number) => {
    const prevItems = [...items];
    const prevTotal = grandTotal;

    // optimistic removal
    const newItems = items.filter((item) => item.id !== itemId);
    setItems(newItems);
    setGrandTotal(newItems.reduce((acc, item) => acc + item.subtotal, 0));

    try {
      await deleteItemFromCart(itemId);
      await refreshCart();
    } catch {
      setItems(prevItems);
      setGrandTotal(prevTotal);
    }
  };

  const handleClearCart = async () => {
    const prevItems = [...items];
    const prevTotal = grandTotal;

    setItems([]);
    setGrandTotal(0);

    try {
      await deleteCart();
    } catch {
      setItems(prevItems);
      setGrandTotal(prevTotal);
    }
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
