// app/me/layout.tsx
"use client";

import RequireAuth from "@/providers/RequireAuth";

export default function MeLayout({ children }: { children: React.ReactNode }) {
  return <RequireAuth>{children}</RequireAuth>;
}
