import { api } from "@/lib/api/axiosInstance";
import type {
  GetProductsResponse,
  CreateProductResponse,
  UpdateProductResponse,
  DeleteProductResponse,
} from "@/types/SellerProducts.type";
import type {
  GetSellerProductsTypes,
  CreateSellerProductsTypes,
  UpdateSellerProductsTypes,
} from "@/lib/validation/sellerProducts.validation";
import {
  toFormDataCreateSellerProductUpdate,
  toFormDataUpdateSellerProductUpdate,
} from "@/lib/helper";

const prefix = "/api/seller/products";

// Get Seller Products
export async function getSellerProducts(
  params?: Partial<GetSellerProductsTypes>
) {
  const res = await api.get<GetProductsResponse>(`${prefix}`, { params });
  return res.data;
}

// Create Seller Product
export async function createSellerProduct(
  params?: Partial<CreateSellerProductsTypes>
) {
  if (!params) throw new Error("Missing parameters");

  // Convert to FormData
  const formData = toFormDataCreateSellerProductUpdate(params);

  const res = await api.post<CreateProductResponse>(`${prefix}`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

// Update Seller Product
export async function updateSellerProduct(
  id: number,
  params?: Partial<UpdateSellerProductsTypes>
) {
  if (!params) throw new Error("Missing parameters");

  // Convert to FormData
  const formData = toFormDataUpdateSellerProductUpdate(params);

  const res = await api.put<UpdateProductResponse>(
    `${prefix}/${id}`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

// Delete Seller Product
export async function deleteSellerProduct(id: number) {
  const res = await api.delete<DeleteProductResponse>(`${prefix}/${id}`);
  return res.data;
}
