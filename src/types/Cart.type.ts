// Types
export type Item = {
  id: number;
  productId: number;
  qty: number;
  priceSnapshot: number;
  subtotal: number;
  product: Product;
};

export type Product = {
  id: number;
  title: string;
  price: number;
  images?: string[];
  isActive: boolean;
  stock: number;
};

// Get Cart
export type GetCartResponse = {
  success: boolean;
  message: string;
  data: {
    cartId: number;
    items?: Item[];
    grandTotal: number;
  };
};

// Delete Cart
export type DeleteCartResponse = {
  success: boolean;
  message: string;
  data: {
    cartId: number;
  };
};

// Item Response
export type ItemResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    cartId: number;
    productId: number;
    qty: number;
    priceSnapshot: number;
  };
};

// Add Item to Cart
export type AddItemToCartResponse = ItemResponse;
// Update Item Qty
export type UpdateItemQtyResponse = ItemResponse;
// Delete Item
export type DeleteItemResponse = ItemResponse;
