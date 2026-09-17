import { useMemo } from "react";
import type { Transaction } from "@/types";
import { getMonthKey } from "@/lib/formatters";

export interface MonthlyData {
  month: string;
  label: string;
  income: number;
  expenses: number;
  savings: number;
}

export interface CategoryTotal {
  category: string;
  total: number;
  count: number;
  percentage: number;
}

export function useAnalytics(transactions: Transaction[]) {
  return useMemo(() => {
    /* ── Monthly breakdown ── */
    const monthMap = new Map<string, MonthlyData>();

    transactions.forEach((t) => {
      const key = getMonthKey(t.date);

      if (!monthMap.has(key)) {
        const [year, month] = key.split("-").map(Number);
        const label = new Intl.DateTimeFormat("en-US", {
          month: "short",
          year: "numeric",
        }).format(new Date(year, month - 1));

        monthMap.set(key, {
          month: key,
          label,
          income: 0,
          expenses: 0,
          savings: 0,
        });
      }

      const entry = monthMap.get(key)!;
      if (t.type === "income") entry.income += t.amount;
      else entry.expenses += t.amount;
      entry.savings = entry.income - entry.expenses;
    });

    const monthlyData = Array.from(monthMap.values()).sort((a, b) =>
      a.month.localeCompare(b.month),
    );

    /* ── Category breakdown (all time) ── */
    const categoryMap = new Map<string, { total: number; count: number }>();
    const expenseTransactions = transactions.filter(
      (t) => t.type === "expense",
    );
    const totalExpenses = expenseTransactions.reduce(
      (sum, t) => sum + t.amount,
      0,
    );

    expenseTransactions.forEach((t) => {
      const existing = categoryMap.get(t.category) ?? { total: 0, count: 0 };
      categoryMap.set(t.category, {
        total: existing.total + t.amount,
        count: existing.count + 1,
      });
    });

    const categoryTotals: CategoryTotal[] = Array.from(categoryMap.entries())
      .map(([category, { total, count }]) => ({
        category,
        total,
        count,
        percentage: totalExpenses > 0 ? (total / totalExpenses) * 100 : 0,
      }))
      .sort((a, b) => b.total - a.total);

    /* ── Month-over-month change ── */
    const last = monthlyData[monthlyData.length - 1];
    const prev = monthlyData[monthlyData.length - 2];

    const expenseChange =
      prev && prev.expenses > 0
        ? ((last.expenses - prev.expenses) / prev.expenses) * 100
        : null;

    const incomeChange =
      prev && prev.income > 0
        ? ((last.income - prev.income) / prev.income) * 100
        : null;

    return { monthlyData, categoryTotals, expenseChange, incomeChange };
  }, [transactions]);
}
