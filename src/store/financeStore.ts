import { create } from "zustand";
import { ExpenseRepository } from "../database/ExpenseRepository";
import { IncomeRepository } from "../database/IncomeRepository";
import { Expense, Income } from "../types";

interface FinanceState {
  expenses: Expense[];
  incomes: Income[];
  loadAll: () => void;
  addExpense: (expense: Expense) => void;
  removeExpense: (id: string) => void;
  addIncome: (income: Omit<Income, "id">) => void;
  removeIncome: (id: number) => void;
}

export const useFinanceStore = create<FinanceState>((set) => ({
  expenses: [],
  incomes: [],

  loadAll: () => {
    set({
      expenses: ExpenseRepository.findAll(),
      incomes: IncomeRepository.findAll(),
    });
  },

  addExpense: (expense) => {
    ExpenseRepository.insert(expense);
    set((state) => ({ expenses: [expense, ...state.expenses] }));
  },

  removeExpense: (id) => {
    ExpenseRepository.delete(id);
    set((state) => ({ expenses: state.expenses.filter((e) => e.id !== id) }));
  },

  addIncome: (income) => {
    const id = IncomeRepository.insert(income);
    set((state) => ({ incomes: [{ ...income, id }, ...state.incomes] }));
  },

  removeIncome: (id) => {
    IncomeRepository.delete(id);
    set((state) => ({ incomes: state.incomes.filter((i) => i.id !== id) }));
  },
}));
