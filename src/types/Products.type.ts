import { GetProductsTypes } from "@/lib/validation/products.validation";
import { Category } from "./Categories.type";
import { Pagination, Shop, Review } from "./Global.type";

// Types
export type BaseProduct = {
  id: number;
  title: string;
  slug: string;
  price: number;
  stock: number;
  images: string[];
  rating: number;
  reviewCount: number;
  soldCount: number;
};

export type Product = BaseProduct & {
  category: Category;
  shop: Shop;
};

export type ProductDetail = BaseProduct & {
  description: string;
  isActive: boolean;
  shopId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
  shop: Shop;
  reviews: Review[];
};

export type ProductFiltersProps = {
  categories: Category[];
  onFilterChange: (filters: GetProductsTypes) => void;
};

export type ProductCardProps = {
  product: Product;
  index: number;
};

// Get Products
export type GetProductsResponse = {
  success: boolean;
  message: string;
  data: {
    products: Product[];
    pagination: Pagination;
  };
};

// Get Product by Id
export type GetProductByIdResponse = {
  success: boolean;
  message: string;
  data: ProductDetail;
};
