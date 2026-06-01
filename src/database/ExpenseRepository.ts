import { Expense } from "../types";
import db from "./database";

export const ExpenseRepository = {
  insert(expense: Expense): void {
    db.runSync(
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
    return db.getAllSync<Expense>("SELECT * FROM expenses ORDER BY date DESC");
  },

  delete(id: string): void {
    db.runSync("DELETE FROM expenses WHERE id = ?", id);
  },
};
