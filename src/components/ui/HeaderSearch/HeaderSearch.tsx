"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { Input } from "@/components/ui/input";

export default function HeaderSearch() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [query, setQuery] = useState("");

  // Sync input value with ?q= on /products
  useEffect(() => {
    if (pathname === "/products") {
      const q = searchParams.get("q") ?? "";
      setQuery(q);
    }
  }, [pathname, searchParams]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const trimmed = query.trim();

      // Build URL (allow empty query)
      const targetUrl =
        trimmed.length > 0
          ? `/products?q=${encodeURIComponent(trimmed)}`
          : "/products";

      // If already on products page, use replace() to update params
      if (pathname === "/products") {
        router.replace(targetUrl);
      } else {
        router.push(targetUrl);
      }
    }
  };

  return (
    <Input
      placeholder="Search products..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      onKeyDown={handleKeyDown}
      className="max-w-sm"
    />
  );
}
