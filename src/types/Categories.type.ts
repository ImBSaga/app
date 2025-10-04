import { Pagination } from "./Global.type";

// Types
export type Category = {
  id: number;
  name: string;
  slug: string;
};

// Get Categories
export type GetCategoryRequest = {
  q?: string;
  page?: number;
  limit?: number;
};
export type GetCategoriesResponse = {
  success: boolean;
  message: string;
  data: {
    categories: Category[];
    pagination: Pagination;
  };
};
