// app/cart/page.tsx
"use client";

import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Trash2 } from "lucide-react";
import { useState, useMemo } from "react";

export default function CartPage() {
  const {
    items,
    grandTotal,
    handleUpdateQty,
    handleDeleteItem,
    handleClearCart,
  } = useCart();
  const [selectedItems, setSelectedItems] = useState<number[]>([]);

  const allSelected = selectedItems.length === items.length && items.length > 0;

  const toggleSelectAll = () => {
    if (allSelected) setSelectedItems([]);
    else setSelectedItems(items.map((i) => i.id));
  };

  const toggleSelectItem = (id: number) => {
    setSelectedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const totalSelectedAmount = useMemo(
    () =>
      items
        .filter((i) => selectedItems.includes(i.id))
        .reduce((acc, item) => acc + item.subtotal, 0),
    [selectedItems, items]
  );

  const handleCheckout = () => {
    const selected = items.filter((i) => selectedItems.includes(i.id));
    console.log("Checkout items:", selected);
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">My Cart</h1>

      <div className="flex flex-col md:flex-row gap-8">
        <Card className="flex-1">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                />
                <span>Select All</span>
              </label>
              <Button
                variant="destructive"
                size="sm"
                onClick={handleClearCart}
                disabled={items.length === 0}
              >
                Clear Cart
              </Button>
            </div>

            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between border-b py-4"
              >
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={selectedItems.includes(item.id)}
                    onChange={() => toggleSelectItem(item.id)}
                  />
                  <div>
                    <p className="font-semibold">{item.product.title}</p>
                    <p className="text-sm text-gray-600">
                      ${item.priceSnapshot} x {item.qty} ={" "}
                      <span className="font-bold">${item.subtotal}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateQty(item.id, {
                        qty: Math.max(1, item.qty - 1),
                      })
                    }
                  >
                    –
                  </Button>
                  <span>{item.qty}</span>
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleUpdateQty(item.id, { qty: item.qty + 1 })
                    }
                  >
                    +
                  </Button>

                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="w-4 h-4 text-red-500" />
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Total Card */}
        <Card className="w-full md:w-80 h-fit">
          <CardContent className="p-6 space-y-4">
            <h2 className="text-lg font-bold">Shopping Summary</h2>
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
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
            >
              Checkout
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
