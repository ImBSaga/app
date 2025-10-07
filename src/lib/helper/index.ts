import {
  SellerActivationTypes,
  UpdateShopTypes,
} from "../validation/seller.validation";

export const toFormDataActivation = (data: SellerActivationTypes): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const toFormDataSellerUpdate = (data: UpdateShopTypes): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};
