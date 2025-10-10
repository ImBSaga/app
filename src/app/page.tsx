"use client";

import { redirect } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  // Go to products page
  redirect("/products");

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
    </main>
  );
}
