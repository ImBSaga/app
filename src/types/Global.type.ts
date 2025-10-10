import { User } from "./Auth.type";

export type ErrorCardProps = {
  message?: string;
  onRetry?: () => void;
};

// Products
export type Pagination = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
};
export type Shop = {
  id: number;
  name: string;
  slug: string;
  logo: string | null;
};
export type Review = {
  id: number;
  star: number;
  comment: string;
  createdAt: string;
  user: User;
};

// Confirm Dialog
export type ConfirmDialogProps = {
  title?: string;
  message?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
};
