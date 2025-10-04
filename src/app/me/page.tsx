// app/me/page.tsx
"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function MePage() {
  const { user, logout } = useAuth();

  if (!user) return <p>Loading...</p>;

  return (
    <main className="flex flex-col gap-4 justify-center min-h-screen items-center bg-[#F5F5F5]">
      <h1 className="text-2xl font-bold">My Account</h1>

      <button
        onClick={logout}
        className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
      >
        Log Out
      </button>
    </main>
  );
}
