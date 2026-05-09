// TODO (sprint zustand): implement Zustand global store
// Placeholder — will be implemented in @cvabreu/4/zustand-global-state

import { Expense, Income } from "../types";

export interface FinanceState {
  expenses: Expense[];
  incomes: Income[];
  addExpense: (expense: Expense) => void;
  addIncome: (income: Income) => void;
  removeExpense: (id: string) => void;
}
