import { api } from "@/lib/api/axiosInstance";
import { toFormDataActivation, toFormDataSellerUpdate } from "@/lib/helper";
import type {
  SellerActivateResponse,
  GetSellerShopResponse,
  UpdateSellerShopResponse,
} from "@/types/Seller.type";
import type {
  SellerActivationTypes,
  UpdateShopTypes,
} from "@/lib/validation/seller.validation";

const prefix = "/api/seller";

// Seller Activation
export async function sellerActivation(params?: SellerActivationTypes) {
  if (!params) throw new Error("Missing seller activation data");

  const formData = toFormDataActivation(params);

  const res = await api.post<SellerActivateResponse>(
    `${prefix}/activate`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}

// Get Shop
export async function getShop() {
  const res = await api.get<GetSellerShopResponse>(`${prefix}/shop`);
  return res.data;
}

// Update Shop
export async function updateShop(params?: UpdateShopTypes) {
  if (!params) throw new Error("Missing seller activation data");

  const formData = toFormDataSellerUpdate(params);

  console.log("FormData", formData);

  const res = await api.patch<UpdateSellerShopResponse>(
    `${prefix}/shop`,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return res.data;
}
