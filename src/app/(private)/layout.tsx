// app/me/layout.tsx
"use client";

// Providers
import RequireAuth from "@/providers/RequireAuth";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <RequireAuth>{children}</RequireAuth>;
}
