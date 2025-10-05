import { api } from "@/lib/api/axiosInstance";
import type {
  CheckoutResponse,
  GetOrdersResponse,
  GetOrderDetailResponse,
  CompleteOrderResponse,
} from "@/types/Orders.type";
import type {
  CheckoutTypes,
  GetOrdersTypes,
  GetOrderDetailTypes,
  CompleteOrderTypes,
} from "@/lib/validation/orders.validation";

const prefix = "/api/orders";

// Order Checkout
export async function checkout(data: CheckoutTypes) {
  const res = await api.post<CheckoutResponse>(`${prefix}/checkout`, data);
  return res.data;
}

// Get Orders
export async function getOrders(params?: GetOrdersTypes) {
  const res = await api.get<GetOrdersResponse>(`${prefix}/my`, { params });
  return res.data;
}

// Get Order Detail
export async function getOrderDetail({ id }: GetOrderDetailTypes) {
  const res = await api.get<GetOrderDetailResponse>(`${prefix}/${id}`);
  return res.data;
}

// Complete Order
export async function completeOrder({ id }: CompleteOrderTypes) {
  const res = await api.patch<CompleteOrderResponse>(
    `${prefix}/items/${id}/complete`
  );
  return res.data;
}
