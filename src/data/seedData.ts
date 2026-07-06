import type { Transaction } from "@/types";

export const seedTransactions: Transaction[] = [
  {
    id: "1",
    type: "income",
    amount: 3500,
    category: "income",
    description: "Monthly salary",
    date: "2025-06-01",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    type: "expense",
    amount: 1200,
    category: "housing",
    description: "Rent payment",
    date: "2025-06-02",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    type: "expense",
    amount: 85,
    category: "food",
    description: "Grocery run",
    date: "2025-06-05",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    type: "expense",
    amount: 45,
    category: "transport",
    description: "Gas",
    date: "2025-06-07",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    type: "expense",
    amount: 15,
    category: "entertainment",
    description: "Netflix",
    date: "2025-06-08",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    type: "expense",
    amount: 200,
    category: "savings",
    description: "Emergency fund transfer",
    date: "2025-06-10",
    createdAt: new Date().toISOString(),
  },
  {
    id: "7",
    type: "expense",
    amount: 60,
    category: "utilities",
    description: "Electric bill",
    date: "2025-06-12",
    createdAt: new Date().toISOString(),
  },
  {
    id: "8",
    type: "income",
    amount: 500,
    category: "income",
    description: "Freelance project",
    date: "2025-06-15",
    createdAt: new Date().toISOString(),
  },
  {
    id: "9",
    type: "expense",
    amount: 120,
    category: "shopping",
    description: "Clothing",
    date: "2025-06-18",
    createdAt: new Date().toISOString(),
  },
  {
    id: "10",
    type: "expense",
    amount: 40,
    category: "health",
    description: "Pharmacy",
    date: "2025-06-20",
    createdAt: new Date().toISOString(),
  },
];

//

const STORAGE_KEY = "finance_dashboard_transactions";

export const storage = {
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
