// TODO (sprint sqlite): define and run table creation statements
// Placeholder — will be implemented in @cvabreu/5/sqlite-integration

export const CREATE_TABLE_USERS = `
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY NOT NULL,
    name TEXT NOT NULL,
    email TEXT NOT NULL
  );
`;

export const CREATE_TABLE_CATEGORIES = `
  CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    type INTEGER NOT NULL
  );
`;

export const CREATE_TABLE_EXPENSES = `
  CREATE TABLE IF NOT EXISTS expenses (
    id TEXT PRIMARY KEY NOT NULL,
    userId TEXT NOT NULL,
    categoryId INTEGER NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    paymentType TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  );
`;

export const CREATE_TABLE_INCOMES = `
  CREATE TABLE IF NOT EXISTS incomes (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId INTEGER NOT NULL,
    categoryId INTEGER NOT NULL,
    amount REAL NOT NULL,
    date TEXT NOT NULL,
    FOREIGN KEY (userId) REFERENCES users(id),
    FOREIGN KEY (categoryId) REFERENCES categories(id)
  );
`;
