import { useTransactions } from "@/hooks/useTransactions";
import { useAnalytics } from "@/hooks/useAnalytics";
import MonthlyChart from "@/components/charts/MonthlyChart";
import CategoryTable from "@/components/ui/CategoryTable";
import ChangeBadge from "@/components/ui/ChangeBadge";

export default function Analytics() {
  const { transactions, isLoading } = useTransactions();
  const { monthlyData, categoryTotals, expenseChange, incomeChange } =
    useAnalytics(transactions);

  if (isLoading) return <p className="text-zinc-500 text-sm">Loading...</p>;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Analytics</h1>
        <p className="text-zinc-500 text-sm mt-1">
          Spending trends and category breakdown
        </p>
      </div>

      {/* Month-over-month */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <ChangeBadge value={incomeChange} label="Income change" />
        <ChangeBadge
          value={expenseChange}
          label="Expense change"
          invertColors
        />
      </div>

      {/* Monthly chart */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-6">
          Monthly Overview
        </h2>
        <MonthlyChart data={monthlyData} />
      </div>

      {/* Category breakdown */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <h2 className="text-sm font-medium text-zinc-400 uppercase tracking-widest mb-6">
          Spending by Category — All Time
        </h2>
        <CategoryTable data={categoryTotals} />
      </div>
    </div>
  );
}
