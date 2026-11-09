import { useTransactions } from "@/hooks/useTransactions";
import { useStats } from "@/hooks/useStats";
import StatCard from "@/components/ui/StatCard";
import CategoryChart from "@/components/charts/CategoryChart";
import RecentTransactions from "@/components/ui/RecentTransactions";
import { formatMonth } from "@/lib/formatters";
import { StatCardSkeleton, ChartSkeleton } from "@/components/ui/Skeleton";

export default function Dashnoard() {
  const { transactions, isLoading } = useTransactions();
  const { income, expenses, savings, categoryData, recent } =
    useStats(transactions);

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div>
          <div className="h-7 w-32 bg-zinc-800 rounded animate-pulse mb-2" />
          <div className="h-4 w-24 bg-zinc-800 rounded animate-pulse" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCardSkeleton />
          <StatCardSkeleton />
          <StatCardSkeleton />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartSkeleton />
          <ChartSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-zinc-100">Dashboard</h1>
        <p className="text-zinc-500 text-sm mt-1">
          {formatMonth(new Date().toISOString())}
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Income" amount={income} variant="income" />
        <StatCard label="Expenses" amount={expenses} variant="expense" />
        <StatCard label="Savings" amount={savings} variant="savings" />
      </div>

      {/* Chart + Recent */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category breakdown */}
        <div
          className="rounded-xl p-6 border border-slate-700/50"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1a2235 100%)",
          }}
        >
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">
            Spending by Category
          </h2>
          <CategoryChart data={categoryData} />
        </div>

        {/* Recent transactions */}
        <div
          className="rounded-xl p-6 border border-slate-700/50"
          style={{
            background: "linear-gradient(135deg, #111827 0%, #1a2235 100%)",
          }}
        >
          <h2 className="text-sm font-medium text-slate-400 uppercase tracking-widest mb-4">
            Recent Transactions
          </h2>
          <RecentTransactions transactions={recent} />
        </div>
      </div>
    </div>
  );
}
