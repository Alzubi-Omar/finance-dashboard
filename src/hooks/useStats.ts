import { useMemo } from "react";
import type { Transaction } from "@/types";
import { getMonthKey } from "@/lib/formatters";

export function useStats(transactions: Transaction[]) {
  return useMemo(() => {
    const currentMonth = getMonthKey(new Date().toISOString());

    const thisMonth = transactions.filter(
      (t) => getMonthKey(t.date) === currentMonth,
    );

    const income = thisMonth
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const expenses = thisMonth
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const savings = income - expenses;

    const categoryTotals = thisMonth
      .filter((t) => t.type === "expense")
      .reduce<Record<string, number>>((acc, t) => {
        acc[t.category] = (acc[t.category] ?? 0) + t.amount;
        return acc;
      }, {});

    const categoryData = Object.entries(categoryTotals).map(
      ([name, value]) => ({ name, value }),
    );

    const recent = [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);

    return { income, expenses, savings, categoryData, recent };
  }, [transactions]);
}
