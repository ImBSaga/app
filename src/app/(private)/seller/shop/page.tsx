"use client";

import { useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { useSeller } from "@/hooks/useSeller";
import Image from "next/image";

export default function SellerShopPage() {
  const { fetchShop, editShop, shop, loading, form } = useSeller();

  // Fetch shop data on load
  useEffect(() => {
    fetchShop();
  }, [fetchShop]);

  // Auto fill form when data loaded
  useEffect(() => {
    if (shop) {
      form.reset({
        name: shop.name,
        logo: shop.logo || "",
        address: shop.address,
        isActive: shop.isActive,
      });
    }
  }, [shop, form]);

  return (
    <main className="p-8 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="w-full max-w-md bg-white p-6 rounded-2xl shadow">
        <h1 className="text-2xl font-semibold mb-4">My Shop Profile</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(editShop)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Shop Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Shop name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="logo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Logo URL</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      onChange={(e) => field.onChange(e.target.files?.[0])}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Display the image */}
            {shop?.logo && (
              <div className="flex items-center gap-2">
                <Image
                  src={shop.logo}
                  alt={shop.name}
                  width={100}
                  height={100}
                />
              </div>
            )}

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
}
