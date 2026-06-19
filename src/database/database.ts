import * as SQLite from "expo-sqlite";
import {
  CREATE_TABLE_CATEGORIES,
  CREATE_TABLE_EXPENSES,
  CREATE_TABLE_INCOMES,
  CREATE_TABLE_USERS,
} from "./schema";

let db: SQLite.SQLiteDatabase | null = null;

export function getDb(): SQLite.SQLiteDatabase {
  if (!db) {
    db = SQLite.openDatabaseSync("senhor-dos-centavos.db");
  }
  return db;
}

export function initDatabase() {
  const database = getDb();
  database.execSync(CREATE_TABLE_USERS);
  database.execSync(CREATE_TABLE_CATEGORIES);
  database.execSync(CREATE_TABLE_EXPENSES);
  database.execSync(CREATE_TABLE_INCOMES);
  seedCategories(database);
}

function seedCategories(database: SQLite.SQLiteDatabase) {
  const row = database.getFirstSync<{ count: number }>("SELECT COUNT(*) as count FROM categories");
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
      database.runSync("INSERT OR IGNORE INTO categories (id, name, type) VALUES (?, ?, ?)", id, name, type);
    }
  }
}
