import { api } from "@/lib/api/axiosInstance";
import type {
  GetCartResponse,
  DeleteCartResponse,
  AddItemToCartResponse,
  UpdateItemQtyResponse,
  DeleteItemResponse,
} from "@/types/Cart.type";
import type {
  AddItemToCartTypes,
  UpdateItemQtyTypes,
} from "@/lib/validation/cart.validation";

const prefix = "/api/cart";

// Get Cart
export async function getCart() {
  const res = await api.get<GetCartResponse>(`${prefix}`);
  return res.data;
}

// Delete Cart
export async function deleteCart() {
  const res = await api.delete<DeleteCartResponse>(`${prefix}`);
  return res.data;
}

// Add Item to Cart (merge qty if exists)
export async function addItemToCart(data: AddItemToCartTypes) {
  const res = await api.post<AddItemToCartResponse>(`${prefix}/items`, data);
  return res.data;
}

// Update Item Quantity
export async function updateItemQty(itemId: number, data: UpdateItemQtyTypes) {
  const res = await api.patch<UpdateItemQtyResponse>(
    `${prefix}/items/${itemId}`,
    data
  );
  return res.data;
}

// Delete Item from Cart
export async function deleteItemFromCart(itemId: number) {
  const res = await api.delete<DeleteItemResponse>(`${prefix}/items/${itemId}`);
  return res.data;
}
