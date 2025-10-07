"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Types
import type {
  CheckoutTypes,
  GetOrdersTypes,
  GetOrderDetailTypes,
  CompleteOrderTypes,
} from "@/lib/validation/orders.validation";
import type { Order } from "@/types/Orders.type";

// Service
import {
  checkout,
  getOrders,
  getOrderDetail,
  completeOrder,
} from "@/services/orders.service";

export function useOrders() {
  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  // Checkout
  const handleCheckout = async (data: CheckoutTypes) => {
    try {
      setLoading(true);
      const res = await checkout(data);
      if (res.success) {
        router.push(`/orders`);
      }
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  // Get Orders
  const fetchOrders = async (params?: GetOrdersTypes) => {
    try {
      setLoading(true);
      const res = await getOrders(params);
      if (res.success) setOrders(res.data.orders);
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Get orders failed");
    } finally {
      setLoading(false);
    }
  };

  // Get Order Detail
  const fetchOrderDetail = async (payload: GetOrderDetailTypes) => {
    try {
      setLoading(true);
      const res = await getOrderDetail(payload);
      if (res.success) setOrder(res.data);
      // Return to home if order still empty after fetching
      if (res.data.items.length === 0) {
        router.push(`/orders`);
      }
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Get order detail failed");
    } finally {
      setLoading(false);
    }
  };

  // Complete Order Item
  const handleCompleteItem = async (payload: CompleteOrderTypes) => {
    try {
      setLoading(true);
      const res = await completeOrder(payload);
      if (res.success) setOrder(res.data);
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Complete order failed");
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    orders,
    order,
    handleCheckout,
    fetchOrders,
    fetchOrderDetail,
    handleCompleteItem,
  };
}
