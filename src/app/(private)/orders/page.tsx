"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useOrders } from "@/hooks/useOrders";
import { Card, CardContent } from "@/components/ui/card";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";

export default function OrdersPage() {
  const { fetchOrders, orders, loading, handleCompleteItem } = useOrders();

  useEffect(() => {
    fetchOrders({ page: 1, limit: 10, paymentStatus: "PAID" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Order List</h1>

      {loading && <p>Loading orders...</p>}

      {orders.length === 0 ? (
        <div className="flex flex-col md:flex-row gap-8">
          <Card className="flex-1">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <p className="text-center">No orders found.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <Link key={order.id} href={`/orders/${order.id}`}>
              <Card className="hover:shadow-md transition">
                <CardContent className="p-4 space-y-1">
                  <p className="font-semibold">Order Code: {order.code}</p>
                  <p>Status: {order.paymentStatus}</p>
                  <p>Address: {order.address}</p>
                  <p>Total: ${order.totalAmount}</p>
                  <p>
                    Date: {dayjs(order.createdAt).format("DD MMM YYYY HH:mm")}
                  </p>
                  <p>Items: {order.items.length}</p>
                </CardContent>
                {order.items[0].status === "SHIPPED" ? (
                  <Button
                    disabled={loading}
                    onClick={() =>
                      handleCompleteItem({ id: order.items[0].id })
                    }
                  >
                    {loading ? "Processing..." : "Mark as Complete"}
                  </Button>
                ) : (
                  <Button disabled variant="secondary">
                    {order.items[0].status}
                  </Button>
                )}
              </Card>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
