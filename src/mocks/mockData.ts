import { Category, Expense, Income, User } from "../types";

export const mockUser: User = {
  id: "user-001",
  name: "Cesar Abreu",
  email: "cesar@email.com",
};

export const mockCategories: Category[] = [
  { id: 1, name: "Food", type: 1 },
  { id: 2, name: "Transport", type: 1 },
  { id: 3, name: "Entertainment", type: 1 },
  { id: 4, name: "Health", type: 1 },
  { id: 5, name: "Education", type: 1 },
  { id: 6, name: "Salary", type: 2 },
  { id: 7, name: "Freelance", type: 2 },
];

export const mockExpenses: Expense[] = [
  {
    id: "exp-001",
    userId: "user-001",
    categoryId: 1,
    amount: 45.9,
    date: "2025-04-01T12:00:00Z",
    paymentType: "pix",
  },
  {
    id: "exp-002",
    userId: "user-001",
    categoryId: 2,
    amount: 12.5,
    date: "2025-04-02T08:30:00Z",
    paymentType: "debit",
  },
  {
    id: "exp-003",
    userId: "user-001",
    categoryId: 3,
    amount: 89.9,
    date: "2025-04-03T20:00:00Z",
    paymentType: "credit",
  },
  {
    id: "exp-004",
    userId: "user-001",
    categoryId: 1,
    amount: 32.0,
    date: "2025-04-05T13:15:00Z",
    paymentType: "debit",
  },
  {
    id: "exp-005",
    userId: "user-001",
    categoryId: 4,
    amount: 120.0,
    date: "2025-04-06T09:00:00Z",
    paymentType: "credit",
  },
];

export const mockIncomes: Income[] = [
  {
    id: 1,
    userId: 1,
    categoryId: 6,
    amount: 3500.0,
    date: "2025-04-01",
  },
  {
    id: 2,
    userId: 1,
    categoryId: 7,
    amount: 800.0,
    date: "2025-04-10",
  },
];
