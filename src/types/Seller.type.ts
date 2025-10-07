// Types
export type Count = {
  products: number;
  orderItems: number;
};

// Seller Activate
export type SellerActivateResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    address: string;
    isActive: boolean;
    createdAt: string;
  };
};

// Get Seller Shop
export type GetSellerShopResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    address: string;
    isActive: boolean;
    createdAt: string;
    _count: Count;
  };
};

// Update Seller Shop
export type UpdateSellerShopResponse = {
  success: boolean;
  message: string;
  data: {
    id: number;
    name: string;
    slug: string;
    logo: string | null;
    address: string;
    isActive: boolean;
    updatedAt: string;
  };
};
