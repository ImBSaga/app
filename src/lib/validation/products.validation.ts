import { z } from "zod";

// Get Products
export const getProductsSchema = z.object({
  q: z.string().optional(),
  categoryId: z.number().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  sort: z.string().optional(),
  order: z.enum(["asc", "desc"]).optional(),
  page: z.number().default(1),
  limit: z.number().default(20),
});
export type GetProductsTypes = z.infer<typeof getProductsSchema>;

// Get Product by Id
export const getProductByIdSchema = z.object({
  id: z.number(),
});
export type GetProductByIdTypes = z.infer<typeof getProductByIdSchema>;
