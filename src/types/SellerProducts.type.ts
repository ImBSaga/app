import { CreateSellerProductsTypes } from "@/lib/validation/sellerProducts.validation";
import { Pagination } from "./Global.type";

// Types
export type Category = {
  id: number;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type Product = {
  id: number;
  title: string;
  slug: string;
  description: string;
  price: number;
  stock: number;
  images: string[];
  isActive: boolean;
  rating: number;
  reviewCount: number;
  soldCount: number;
  shopId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type SellerProductTableProps = {
  products: Product[];
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
  onToggleActive: (p: Product) => void;
};

export type SellerProductFormProps = {
  product?: Product | null;
  onCancel: () => void;
  onSave: (payload: CreateSellerProductsTypes) => Promise<void> | void;
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

// Create Product
export type CreateProductResponse = {
  success: boolean;
  message: string;
  data: {
    product: Product;
  };
};

// Update Product
export type UpdateProductResponse = {
  success: boolean;
  message: string;
  data: {
    product: Product;
  };
};

// Delete Product
export type DeleteProductResponse = {
  success: boolean;
  message: string;
  data: {
    product: Product;
  };
};
