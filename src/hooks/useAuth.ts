import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Validation
import {
  loginSchema,
  registerSchema,
  type LoginTypes,
  type RegisterTypes,
} from "@/lib/validation/auth.validation";

// Types
import type { LoginResponse, RegisterResponse } from "@/types/Auth.type";

// Service
import { loginService, registerService } from "@/services/auth.service";

// Hooks
import { useAuth } from "@/providers/AuthProvider";

// Register
export const useRegister = () => {
  // Hooks
  const { login } = useAuth();

  // Form
  const form = useForm<RegisterTypes>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      avatar: undefined,
      avatarUrl: "",
    },
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // Mutation
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data: RegisterTypes) => registerService(data),
    onSuccess: async (data: RegisterResponse, variables: RegisterTypes) => {
      // Automatically log in with the same credentials
      try {
        const loginResponse = await loginService({
          email: variables.email,
          password: variables.password,
        });
        login(loginResponse);
      } catch (err: Error | unknown) {
        console.error("❌ Auto-login failed:", (err as Error).message);
      }
      reset();
    },
    onError: (err: Error) => {
      console.error("❌ Register error:", err.message);
    },
  });
  const onSubmit = (data: RegisterTypes) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    isError,
    error,
    isSuccess,
    form,
  };
};

// Login
export const useLogin = () => {
  // Hooks
  const { login } = useAuth();

  // Form
  const form = useForm<LoginTypes>({
    resolver: zodResolver(loginSchema),
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = form;

  // Mutation
  const { mutate, isPending, isError, error, isSuccess } = useMutation({
    mutationFn: (data: LoginTypes) => loginService(data),
    onSuccess: (data: LoginResponse) => {
      login(data);
      reset();
    },
    onError: (err: Error) => {
      console.error("❌ Login error:", err.message);
    },
  });
  const onSubmit = (data: LoginTypes) => {
    mutate(data);
  };

  return {
    register,
    handleSubmit,
    errors,
    onSubmit,
    isPending,
    isError,
    error,
    isSuccess,
    form,
  };
};
