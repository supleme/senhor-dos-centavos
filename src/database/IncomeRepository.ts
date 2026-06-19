import { Income } from "../types";
import { getDb } from "./database";

export const IncomeRepository = {
  insert(income: Omit<Income, "id">): number {
    const result = getDb().runSync(
      "INSERT INTO incomes (userId, categoryId, amount, date) VALUES (?, ?, ?, ?)",
      income.userId,
      income.categoryId,
      income.amount,
      income.date
    );
    return result.lastInsertRowId;
  },

  findAll(): Income[] {
    return getDb().getAllSync<Income>("SELECT * FROM incomes ORDER BY date DESC");
  },

  delete(id: number): void {
    getDb().runSync("DELETE FROM incomes WHERE id = ?", id);
  },
};
