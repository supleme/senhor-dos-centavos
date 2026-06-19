import { Expense } from "../types";
import { getDb } from "./database";

export const ExpenseRepository = {
  insert(expense: Expense): void {
    getDb().runSync(
      "INSERT INTO expenses (id, userId, categoryId, amount, date, paymentType) VALUES (?, ?, ?, ?, ?, ?)",
      expense.id,
      expense.userId,
      expense.categoryId,
      expense.amount,
      expense.date,
      expense.paymentType
    );
  },

  findAll(): Expense[] {
    return getDb().getAllSync<Expense>("SELECT * FROM expenses ORDER BY date DESC");
  },

  delete(id: string): void {
    getDb().runSync("DELETE FROM expenses WHERE id = ?", id);
  },
};
