"use client";

import { useState, useMemo } from "react";
import { useCart } from "@/hooks/useCart";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function CheckoutPage() {
  const { items, grandTotal } = useCart();
  const { handleCheckout, loading } = useOrders();
  const [address, setAddress] = useState("");

  const totalSelectedAmount = useMemo(
    () =>
      items
        .filter((i) => i.qty > 0)
        .reduce((acc, item) => acc + item.subtotal, 0),
    [items]
  );

  const onCheckout = async () => {
    if (!address) return alert("Please enter address");
    await handleCheckout({ address });
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardContent className="p-4">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div>
                  <p className="font-semibold">{item.product?.title}</p>
                  <p className="text-sm text-gray-600">
                    ${item.priceSnapshot} × {item.qty} ={" "}
                    <span className="font-bold">${item.subtotal}</span>
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Summary Card */}
        <Card className="w-full md:w-80 h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Shopping Summary</h2>

            <div>
              <Label>Shipping Address</Label>
              <Input
                placeholder="Enter your shipping address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>

            <div className="flex justify-between">
              <span>Selected Total:</span>
              <span className="font-semibold">${totalSelectedAmount}</span>
            </div>

            <div className="flex justify-between">
              <span>Grand Total:</span>
              <span className="font-semibold">${grandTotal}</span>
            </div>

            <Button
              className="w-full mt-4"
              disabled={items.length === 0 || loading}
              onClick={onCheckout}
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
