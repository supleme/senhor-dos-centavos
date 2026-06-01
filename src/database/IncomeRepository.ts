import { Income } from "../types";
import db from "./database";

export const IncomeRepository = {
  insert(income: Omit<Income, "id">): number {
    const result = db.runSync(
      "INSERT INTO incomes (userId, categoryId, amount, date) VALUES (?, ?, ?, ?)",
      income.userId,
      income.categoryId,
      income.amount,
      income.date
    );
    return result.lastInsertRowId;
  },

  findAll(): Income[] {
    return db.getAllSync<Income>("SELECT * FROM incomes ORDER BY date DESC");
  },

  delete(id: number): void {
    db.runSync("DELETE FROM incomes WHERE id = ?", id);
  },
};
