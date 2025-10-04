import { api } from "@/lib/api/axiosInstance";
import { toFormData } from "@/lib/auth";

// Types
import type { LoginResponse, RegisterResponse } from "@/types/Auth.type";
import type {
  LoginTypes,
  RegisterTypes,
} from "@/lib/validation/auth.validation";

const prefix = "/api/auth";

// Register
export const registerService = async (
  data: RegisterTypes
): Promise<RegisterResponse> => {
  const formData = toFormData(data);

  const res = await api.post<RegisterResponse>(`${prefix}/register`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

// Login
export const loginService = async (
  data: LoginTypes
): Promise<LoginResponse> => {
  const res = await api.post<LoginResponse>(`${prefix}/login`, data);
  return res.data;
};
