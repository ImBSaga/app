export const dynamic = "force-dynamic";
import { Suspense } from "react";
import Product from "@/components/container/Product";

export default function ProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Product />
    </Suspense>
  );
}
