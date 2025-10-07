"use client";
import React from "react";

// Types
import type { ConfirmDialogProps } from "@/types/Global.type";

// Shadcn
import { Button } from "@/components/ui/button";

export default function ConfirmDialog({
  title = "Confirm",
  message = "Are you sure?",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div className="p-4 space-y-4">
      <h3 className="text-lg font-semibold">{title}</h3>
      <p>{message}</p>
      <div className="flex justify-end gap-2">
        <Button variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="destructive" onClick={onConfirm}>
          Confirm
        </Button>
      </div>
    </div>
  );
}
