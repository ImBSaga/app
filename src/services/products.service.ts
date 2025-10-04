import { api } from "@/lib/api/axiosInstance";
import type {
  GetProductsResponse,
  GetProductByIdResponse,
} from "@/types/Products.type";
import type {
  GetProductsTypes,
  GetProductByIdTypes,
} from "@/lib/validation/products.validation";

const prefix = "/api/products";

// Get Products
export async function getProducts(params?: GetProductsTypes) {
  const res = await api.get<GetProductsResponse>(`${prefix}`, { params });
  return res.data;
}

// Get Product by Id
export async function getProductById({ id }: GetProductByIdTypes) {
  const res = await api.get<GetProductByIdResponse>(`${prefix}/${id}`);
  return res.data;
}
