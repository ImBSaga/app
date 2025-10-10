import { api } from "@/lib/api/axiosInstance";

import type {
  SellerOrderResponse,
  UpdateSellerOrderStatusResponse,
} from "@/types/SellerOrder.type";
import type { GetSellerOrderTypes } from "@/lib/validation/sellerOrder.validation";

const prefix = "/api/order-items";

// Get Seller Order
export async function getSellerOrder(params?: Partial<GetSellerOrderTypes>) {
  const res = await api.get<SellerOrderResponse>(`${prefix}`, { params });
  return res.data;
}
// Update Seller Product
export async function updateSellerProduct(id: number) {
  const res = await api.put<UpdateSellerOrderStatusResponse>(
    `${prefix}/${id}/status`
  );

  return res.data;
}
