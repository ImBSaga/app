import { Item } from "./Cart.type";
import { Pagination } from "./Global.type";

// Seller Order
export type SellerOrderResponse = {
  success: boolean;
  message: string;
  data: {
    items: Item[];
    pagination: Pagination;
  };
};

// Update Seller Order Status
export type UpdateSellerOrderStatusResponse = {
  success: boolean;
  message: string;
};
