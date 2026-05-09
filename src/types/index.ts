export type PaymentType = "credit" | "debit" | "pix";

export type CategoryType = 1 | 2; // 1 = expense, 2 = income

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Category {
  id: number;
  name: string;
  type: CategoryType;
}

export interface Expense {
  id: string;
  userId: string;
  categoryId: number;
  amount: number;
  date: string; // ISO timestamp
  paymentType: PaymentType;
}

export interface Income {
  id: number;
  userId: number;
  categoryId: number;
  amount: number;
  date: string; // ISO date
}
