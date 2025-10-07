"use client";

import React, { useEffect, useState } from "react";

// Types
import type { SellerProductFormProps } from "@/types/SellerProducts.type";
import type { CreateSellerProductsTypes } from "@/lib/validation/sellerProducts.validation";

// Shadcn
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Hooks
import { useProducts } from "@/hooks/useProducts";

export default function ProductForm({
  product,
  onCancel,
  onSave,
}: SellerProductFormProps) {
  // Hooks
  const { categories } = useProducts();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(0);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [isActive, setIsActive] = useState<boolean>(true);

  useEffect(() => {
    if (categories.length > 0 && categoryId === 0) {
      setCategoryId(categories[0].id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  useEffect(() => {
    if (product) {
      setTitle(product.title ?? "");
      setDescription(product.description ?? "");
      setPrice(product.price ?? 0);
      setStock(product.stock ?? 0);
      setCategoryId(product.categoryId ?? categories[0]?.id ?? 0);
      setImages(product.images ?? []);
      setIsActive(product.isActive ?? true);
    } else {
      setTitle("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setImages([]);
      setIsActive(true);
      setCategoryId(categories[0]?.id ?? 0);
    }
  }, [product, categories]);

  const handleAddImage = () => {
    setImages((p) => [...p, ""]);
  };
  const handleChangeImage = (idx: number, val: string) => {
    setImages((p) => p.map((it, i) => (i === idx ? val : it)));
  };
  const handleRemoveImage = (idx: number) => {
    setImages((p) => p.filter((_, i) => i !== idx));
  };

  const handleSave = async () => {
    const payload: CreateSellerProductsTypes = {
      title,
      description,
      price,
      stock,
      categoryId,
      images,
      imagesUrl: images,
      isActive,
    };

    await onSave(payload);
  };

  return (
    <div className="space-y-4 p-4">
      <div>
        <Label>Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div>
        <Label>Description</Label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <Label>Price</Label>
          <Input
            type="text"
            inputMode="decimal"
            value={price}
            onChange={(e) => {
              const val = e.target.value;
              // Allow empty or numeric input
              if (val === "" || /^\d*\.?\d*$/.test(val)) {
                setPrice(Number(val));
              }
            }}
          />
        </div>
        <div>
          <Label>Stock</Label>
          <Input
            type="text"
            inputMode="decimal"
            value={stock}
            onChange={(e) => {
              const val = e.target.value;
              // Allow empty or numeric input
              if (val === "" || /^\d*\.?\d*$/.test(val)) {
                setStock(Number(val));
              }
            }}
          />
        </div>
      </div>
      <div>
        <Label>Category</Label>
        <Select
          value={String(categoryId)}
          onValueChange={(value) => setCategoryId(Number(value))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a category" />
          </SelectTrigger>
          <SelectContent>
            {categories.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label>Images (URLs)</Label>
        <div className="space-y-2">
          {images.map((img, idx) => (
            <div key={idx} className="flex gap-2">
              <Input
                value={img}
                onChange={(e) => handleChangeImage(idx, e.target.value)}
              />
              <Button
                variant="destructive"
                onClick={() => handleRemoveImage(idx)}
              >
                Remove
              </Button>
            </div>
          ))}
          <Button onClick={handleAddImage}>Add Image</Button>
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={handleSave}>Save</Button>
      </div>
    </div>
  );
}
