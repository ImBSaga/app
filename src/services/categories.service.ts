import { api } from "@/lib/api/axiosInstance";
import type {
  GetCategoriesResponse,
  GetCategoryRequest,
} from "@/types/Categories.type";

const prefix = "/api/categories";

// Get Categories
export async function getCategories(params?: GetCategoryRequest) {
  const res = await api.get<GetCategoriesResponse>(`${prefix}`, {
    params,
  });
  return res.data;
}
