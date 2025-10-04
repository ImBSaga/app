"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function CatalogPage() {
  const { logout } = useAuth();

  return (
    <main className="flex flex-col gap-4 justify-center min-h-screen items-center bg-[#F5F5F5]">
      <h1 className="text-2xl font-bold">Catalog</h1>
      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Log Out
      </button>
    </main>
  );
}
