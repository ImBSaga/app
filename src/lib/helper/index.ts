import {
  SellerActivationTypes,
  UpdateShopTypes,
} from "../validation/seller.validation";

import {
  CreateSellerProductsTypes,
  UpdateSellerProductsTypes,
} from "../validation/sellerProducts.validation";

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

export const toFormDataCreateSellerProductUpdate = (
  data: Partial<CreateSellerProductsTypes>
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      // Append arrays properly
      value.forEach((item) => formData.append(`${key}[]`, String(item)));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};

export const toFormDataUpdateSellerProductUpdate = (
  data: Partial<UpdateSellerProductsTypes>
): FormData => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    if (Array.isArray(value)) {
      // Append arrays properly
      value.forEach((item) => formData.append(`${key}[]`, String(item)));
    } else {
      formData.append(key, String(value));
    }
  });
  return formData;
};
