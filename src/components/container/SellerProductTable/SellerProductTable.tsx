"use client";
import React from "react";

// Types
import type { SellerProductTableProps } from "@/types/SellerProducts.type";

// Shadcn
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Icons
import { Pencil, Trash2, Eye, EyeOff } from "lucide-react";

export default function SellerProductTable({
  products,
  onEdit,
  onDelete,
  onToggleActive,
}: SellerProductTableProps) {
  if (!products.length) return <div className="p-8">No products yet.</div>;

  return (
    <div className="overflow-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.filter(Boolean).map((p) => (
            <TableRow key={p.id}>
              <TableCell className="max-w-xs truncate">{p.title}</TableCell>
              <TableCell>
                <span>Rp {p.price.toLocaleString()}</span>
              </TableCell>
              <TableCell>{p.stock}</TableCell>
              <TableCell>{p.category?.name ?? "-"}</TableCell>
              <TableCell>{p.isActive ? "Active" : "Inactive"}</TableCell>
              <TableCell className="flex gap-2">
                <Button size="sm" onClick={() => onEdit(p)}>
                  <Pencil />
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => onDelete(p)}
                >
                  <Trash2 />
                </Button>
                <Button size="sm" onClick={() => onToggleActive(p)}>
                  {p.isActive ? <Eye /> : <EyeOff />}
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
