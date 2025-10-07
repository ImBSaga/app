import { z } from "zod";

// Get Seller Products
export const getSellerProductsSchema = z.object({
  q: z.string(),
  isActive: z.boolean(),
  page: z.number(),
  limit: z.number(),
});
export type GetSellerProductsTypes = z.infer<typeof getSellerProductsSchema>;

// Create Seller Product
export const createSellerProductsSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  categoryId: z.number(),
  images: z.array(z.string()),
  imagesUrl: z.array(z.string()),
  isActive: z.boolean(),
});
export type CreateSellerProductsTypes = z.infer<
  typeof createSellerProductsSchema
>;

// Update Seller Product
export const updateSellerProductsSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.number(),
  stock: z.number(),
  categoryId: z.number(),
  isActive: z.boolean(),
  images: z.array(z.string()),
  imagesUrl: z.array(z.string()),
  merge: z.boolean(),
});
export type UpdateSellerProductsTypes = z.infer<
  typeof updateSellerProductsSchema
>;
