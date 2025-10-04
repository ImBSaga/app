"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function Home() {
  const { user } = useAuth();

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold">Welcome, {user?.name}</h1>
    </main>
  );
}
