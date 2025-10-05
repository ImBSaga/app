import type { Pagination } from "./Global.type";

// Types
export type Product = {
  id: number;
  title: string;
  images: string[];
};

export type Shop = {
  id: number;
  name: string;
  slug: string;
};

export type Item = {
  id: number;
  productId: number;
  shopId: number;
  qty: number;
  priceSnapshot: number;
  status: string;
  product: Product;
  shop: Shop;
};

export type Order = {
  id: number;
  code: string;
  paymentStatus: string;
  address: string;
  totalAmount: number;
  createdAt: string;
  items: Item[];
};

// Checkout Response
export type CheckoutResponse = {
  success: boolean;
  message: string;
  data: Order;
};

// Get Orders Response
export type GetOrdersResponse = {
  success: boolean;
  message: string;
  data: {
    orders: Order[];
    pagination: Pagination;
  };
};

// Get Order Detail Response
export type GetOrderDetailResponse = {
  success: boolean;
  message: string;
  data: Order;
};

// Complete Order Response
export type CompleteOrderResponse = {
  success: boolean;
  message: string;
  data: Order;
};
