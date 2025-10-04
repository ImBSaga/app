import { z } from "zod";

// Register
export const registerSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    phone: z
      .string()
      .min(10, "Phone number must be at least 10 characters")
      .refine((value) => value.startsWith("08"), {
        message: "Phone number must start with 08",
      }),
    email: z.email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirm your password"),
    avatar: z.any().optional(),
    avatarUrl: z.url("Invalid avatar URL").optional().or(z.literal("")),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })
  .refine((data) => data.avatar || data.avatarUrl, {
    message: "Either avatar file or avatar URL is required",
    path: ["avatarUrl"],
  })
  .transform((data) => {
    if (data.avatar) {
      return { ...data, avatarUrl: undefined };
    }
    if (data.avatarUrl) {
      return { ...data, avatar: undefined };
    }
    return data;
  });
export type RegisterTypes = z.infer<typeof registerSchema>;

// Login
export const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});
export type LoginTypes = z.infer<typeof loginSchema>;
