"use client";

import type { ErrorCardProps } from "@/types/Global.type";
import ErrorCard from "@/components/container/ErrorCard";

export default function Error({ message, onRetry }: ErrorCardProps) {
  return <ErrorCard message={message} onRetry={onRetry} />;
}
