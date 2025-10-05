import { z } from "zod";

// Add Item to Cart
export const addItemToCartSchema = z.object({
  productId: z.number(),
  qty: z.number(),
});
export type AddItemToCartTypes = z.infer<typeof addItemToCartSchema>;

// Update Item Qty
export const updateItemQtySchema = z.object({
  qty: z.number(),
});
export type UpdateItemQtyTypes = z.infer<typeof updateItemQtySchema>;
