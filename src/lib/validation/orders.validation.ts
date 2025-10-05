import { z } from "zod";

// Orders Checkout
export const checkoutSchema = z.object({
  address: z.string(),
});
export type CheckoutTypes = z.infer<typeof checkoutSchema>;

// Get Orders
export const getOrdersSchema = z.object({
  page: z.number(),
  limit: z.number(),
  paymentStatus: z.enum(["PENDING", "PAID", "FAILED", "REFUNDED"]),
});
export type GetOrdersTypes = z.infer<typeof getOrdersSchema>;

// Get Order Detail
export const getOrderDetailSchema = z.object({
  id: z.number(),
});
export type GetOrderDetailTypes = z.infer<typeof getOrderDetailSchema>;

// Complete Order
export const completeOrderSchema = z.object({
  id: z.number(),
});
export type CompleteOrderTypes = z.infer<typeof completeOrderSchema>;
