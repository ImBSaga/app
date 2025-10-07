"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import {
  sellerActivation,
  getShop,
  updateShop,
} from "@/services/seller.service";
import type {
  SellerActivateResponse,
  GetSellerShopResponse,
  UpdateSellerShopResponse,
} from "@/types/Seller.type";
import {
  sellerActivationSchema,
  updateShopSchema,
  type SellerActivationTypes,
  type UpdateShopTypes,
} from "@/lib/validation/seller.validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

export function useSeller() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [shop, setShop] = useState<GetSellerShopResponse["data"] | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Activate Seller
  const activateSeller = useCallback(
    async (data: SellerActivationTypes) => {
      try {
        setLoading(true);
        setError(null);
        const res: SellerActivateResponse = await sellerActivation(data);
        if (res.success) {
          router.push("/seller/shop");
        }
        return res;
      } catch (err: Error | unknown) {
        setError(
          err instanceof Error ? err.message : "Failed to activate seller"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [router]
  );

  // Fetch Shop
  const fetchShop = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const res: GetSellerShopResponse = await getShop();
      if (res.success) setShop(res.data);
      return res;
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Failed to load shop data");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Update Shop
  const editShop = useCallback(async (data: UpdateShopTypes) => {
    try {
      setLoading(true);
      setError(null);
      const res: UpdateSellerShopResponse = await updateShop(data);
      if (res.success) {
        setShop(res.data as unknown as GetSellerShopResponse["data"]);
      }
      return res;
    } catch (err: Error | unknown) {
      setError(err instanceof Error ? err.message : "Failed to update shop");
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // form
  const form = useForm<UpdateShopTypes>({
    resolver: zodResolver(updateShopSchema),
    defaultValues: {
      name: "",
      logo: "",
      address: "",
      isActive: true,
    },
  });

  // activation form
  const activationForm = useForm<SellerActivationTypes>({
    resolver: zodResolver(sellerActivationSchema),
    defaultValues: {
      name: "",
      slug: "",
      logo: "",
      address: "",
    },
  });

  return {
    loading,
    shop,
    error,
    activateSeller,
    fetchShop,
    editShop,
    form,
    activationForm,
  };
}
