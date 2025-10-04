// Types
import type { User } from "@/types/Auth.type";
import type { RegisterTypes } from "../validation/auth.validation";

export const setAuth = (token: string, user: User) => {
  localStorage.setItem("authToken", token);
  localStorage.setItem("authUser", JSON.stringify(user));
};

export const getAuthToken = () => {
  return localStorage.getItem("authToken");
};

export const getAuthUser = () => {
  const user = localStorage.getItem("authUser");
  return user ? JSON.parse(user) : null;
};

export const clearAuth = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("authUser");
};

// Helper to convert to FormData
export const toFormData = (data: RegisterTypes): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value);
    }
  });
  return formData;
};
