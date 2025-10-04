"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getAuthToken, getAuthUser, setAuth, clearAuth } from "@/lib/auth";
import { useRouter } from "next/navigation";

// Types
import type { User, AuthContextType, LoginResponse } from "@/types/Auth.type";

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  // Navigation + Loading
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  // State
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Restore session
  useEffect(() => {
    const savedToken = getAuthToken();
    const savedUser = getAuthUser();
    if (savedToken && savedUser) {
      setToken(savedToken);
      setUser(savedUser);
    } else {
      console.log("No session found");
    }
    setIsLoading(false);
  }, []);

  const login = (data: LoginResponse) => {
    setAuth(data.data.token, data.data.user);
    setToken(data.data.token);
    setUser(data.data.user);
    router.push("/products");
  };

  const logout = () => {
    clearAuth();
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
