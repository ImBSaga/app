"use client";

import { useEffect } from "react";
import { useParams } from "next/navigation";
import { useOrders } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";

export default function OrderDetailPage() {
  const params = useParams();
  const { order, fetchOrderDetail, handleCompleteItem, loading } = useOrders();

  useEffect(() => {
    if (params?.id) {
      fetchOrderDetail({ id: Number(params.id) });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params?.id]);

  if (!order) {
    return (
      <main className="p-8 bg-gray-50 min-h-screen">
        <p>Loading order details...</p>
      </main>
    );
  }

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Order Detail</h1>

      <Card className="mb-6">
        <CardContent className="p-4 space-y-1">
          <p>
            <strong>Order Code:</strong> {order.code}
          </p>
          <p>
            <strong>Payment:</strong> {order.paymentStatus}
          </p>
          <p>
            <strong>Address:</strong> {order.address}
          </p>
          <p>
            <strong>Total:</strong> ${order.totalAmount}
          </p>
          <p>
            <strong>Date:</strong>{" "}
            {dayjs(order.createdAt).format("DD MMM YYYY HH:mm")}
          </p>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-2">Items</h2>
      <div className="grid gap-4">
        {order.items.map((item) => (
          <Card key={item.id}>
            <CardContent className="p-4 flex flex-col md:flex-row justify-between md:items-center gap-3">
              <div>
                <p className="font-semibold">{item.product.title}</p>
                <p className="text-sm text-gray-600">
                  Shop: {item.shop.name} | ${item.priceSnapshot} × {item.qty}
                </p>
                <p>Status: {item.status}</p>
              </div>

              {item.status === "SHIPPED" ? (
                <Button
                  disabled={loading}
                  onClick={() => handleCompleteItem({ id: item.id })}
                >
                  {loading ? "Processing..." : "Mark as Complete"}
                </Button>
              ) : (
                <Button disabled variant="secondary">
                  {item.status}
                </Button>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
