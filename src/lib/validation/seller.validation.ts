import { z } from "zod";

// Seller Activate
export const sellerActivationSchema = z.object({
  name: z.string(),
  slug: z.string(),
  logo: z.any().optional(),
  address: z.string(),
});
export type SellerActivationTypes = z.infer<typeof sellerActivationSchema>;

// Update Shop
export const updateShopSchema = z.object({
  name: z.string(),
  logo: z.any().optional(),
  address: z.string(),
  isActive: z.boolean(),
});
export type UpdateShopTypes = z.infer<typeof updateShopSchema>;
