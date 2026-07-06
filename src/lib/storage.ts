import type { Transaction } from "@/types";
import { seedTransactions } from "@/data/seedData";

const STORAGE_KEY = "finance_dashboard_transactions";

export const storage = {
  getTransactions(): Transaction[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(seedTransactions));
        return seedTransactions;
      }
      return JSON.parse(raw) as Transaction[];
    } catch (error) {
      return [];
    }
  },

  setTransactions(transactions: Transaction[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
    } catch (error) {
      console.error("Failed to save transactions");
    }
  },

  addTransaction(transaction: Transaction): Transaction[] {
    const current = this.getTransactions();
    const updated = [transaction, ...current];
    this.setTransactions(updated);
    return updated;
  },

  updateTransaction(updated: Transaction): Transaction[] {
    const current = this.getTransactions();
    const result = current.map((t) => (t.id === updated.id ? updated : t));
    this.setTransactions(result);
    return result;
  },

  deleteTransaction(id: string): Transaction[] {
    const current = this.getTransactions();
    const result = current.filter((t) => t.id !== id);
    this.setTransactions(result);
    return result;
  },

  clearAll(): void {
    localStorage.removeItem(STORAGE_KEY);
  },
};
