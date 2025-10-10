import { z } from "zod";

// Get Seller Order
export const getSellerOrderSchema = z.object({
  status: z.string(),
  page: z.number(),
  limit: z.number(),
});
export type GetSellerOrderTypes = z.infer<typeof getSellerOrderSchema>;
