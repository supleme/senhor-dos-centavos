import * as SQLite from "expo-sqlite";
import {
  CREATE_TABLE_CATEGORIES,
  CREATE_TABLE_EXPENSES,
  CREATE_TABLE_INCOMES,
  CREATE_TABLE_USERS,
} from "./schema";

const db = SQLite.openDatabaseSync("senhor-dos-centavos.db");

export function initDatabase() {
  db.execSync(CREATE_TABLE_USERS);
  db.execSync(CREATE_TABLE_CATEGORIES);
  db.execSync(CREATE_TABLE_EXPENSES);
  db.execSync(CREATE_TABLE_INCOMES);
  seedCategories();
}

function seedCategories() {
  const row = db.getFirstSync<{ count: number }>("SELECT COUNT(*) as count FROM categories");
  if ((row?.count ?? 0) === 0) {
    const categories: [number, string, number][] = [
      [1, "Food", 1],
      [2, "Transport", 1],
      [3, "Entertainment", 1],
      [4, "Health", 1],
      [5, "Education", 1],
      [6, "Salary", 2],
      [7, "Freelance", 2],
    ];
    for (const [id, name, type] of categories) {
      db.runSync("INSERT OR IGNORE INTO categories (id, name, type) VALUES (?, ?, ?)", id, name, type);
    }
  }
}

export default db;
