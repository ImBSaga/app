"use client";

import React, { useState } from "react";
import { useSellerProducts } from "@/hooks/useSellerProducts";
import ProductTable from "@/components/container/SellerProductTable";
import ProductForm from "@/components/container/SellerProductForm";
import ConfirmDialog from "@/components/container/ConfirmDialog";
import { Button } from "@/components/ui/button";
import type { Product } from "@/types/SellerProducts.type";
import {
  CreateSellerProductsTypes,
  GetSellerProductsTypes,
} from "@/lib/validation/sellerProducts.validation";
import { Input } from "@/components/ui/input";

export default function SellerProductsPage() {
  const {
    products,
    loading,
    error,
    page,
    total,
    load,
    create,
    update,
    remove,
    toggleActive,
    goNext,
    goPrev,
  } = useSellerProducts(1, 10);

  // Logics
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [toDelete, setToDelete] = useState<Product | null>(null);
  const [filters, setFilters] = useState<Partial<GetSellerProductsTypes>>({
    q: "",
  });

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleEdit = (p: Product) => {
    setEditing(p);
    setShowForm(true);
  };

  const handleDelete = (p: Product) => {
    setToDelete(p);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    if (!toDelete) return;
    // If the product status is active, warn the user
    if (toDelete.isActive) {
      alert("Cannot delete active product");
      return;
    }
    try {
      await remove(toDelete.id);
      setShowConfirm(false);
      load();
    } catch (err) {
      console.error(err);
      setShowConfirm(false);
    }
  };

  const handleToggleActive = async (p: Product) => {
    try {
      await toggleActive(p.id, !p.isActive);
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSave = async (payload: CreateSellerProductsTypes) => {
    try {
      if (editing) {
        await update(editing.id, { ...payload, merge: true });
      } else {
        await create(payload);
      }
      setShowForm(false);
      load();
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  // Search Filter
  const handleFilterChange = (opts: Partial<GetSellerProductsTypes>) => {
    setFilters(opts);
    load(opts);
  };

  return (
    <main className="p-8 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">My Products</h1>
        <div className="flex gap-2">
          <Button onClick={handleAdd}>Add Product</Button>
        </div>
      </div>

      {/* Querry */}
      <div className="mb-6">
        <Input
          type="text"
          placeholder="Search products..."
          value={filters.q}
          onChange={(e) => handleFilterChange({ q: e.target.value })}
        />
      </div>

      <section>
        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-600">{error}</div>
        ) : (
          <ProductTable
            products={products}
            onEdit={handleEdit}
            onDelete={handleDelete}
            onToggleActive={handleToggleActive}
          />
        )}

        <div className="flex justify-between items-center mt-4">
          <div>
            Page {page} — Showing {products.length} of {total}
          </div>
          <div className="flex gap-2">
            <Button onClick={goPrev}>Prev</Button>
            <Button onClick={goNext}>Next</Button>
          </div>
        </div>
      </section>

      {/* Form modal (simple conditional render) */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="text-lg font-semibold">
                {editing ? "Edit Product" : "Create Product"}
              </h3>
              <button onClick={() => setShowForm(false)} className="text-xl">
                ✖
              </button>
            </div>
            <ProductForm
              product={editing}
              onCancel={() => setShowForm(false)}
              onSave={handleSave}
            />
          </div>
        </div>
      )}

      {/* Confirm modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-lg shadow-lg">
            <ConfirmDialog
              title="Delete product"
              message={`Are you sure you want to delete \"${toDelete?.title}\"?`}
              onCancel={() => setShowConfirm(false)}
              onConfirm={confirmDelete}
            />
          </div>
        </div>
      )}
    </main>
  );
}
