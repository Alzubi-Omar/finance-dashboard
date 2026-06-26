export type TransactionType = "income" | "expense";

export type Category =
  | "housing"
  | "food"
  | "transport"
  | "entertainment"
  | "health"
  | "shopping"
  | "utilities"
  | "savings"
  | "income"
  | "other";

export interface Transaction {
  id: string;
  type: TransactionType;
  amount: number;
  category: Category;
  description: string;
  date: string;
  createdAt: string;
}

export interface Budget {
  category: Category;
  limit: number;
  spent: number;
}

export interface MonthlyStats {
  month: string;
  income: number;
  expenses: number;
  savings: number;
}
