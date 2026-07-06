import { useTransactions } from "@/hooks/useTransactions";
import { formatCurrency } from "@/lib/formatters";

export default function App() {
  const { transactions, isLoading } = useTransactions();

  if (isLoading) return <p className="p-8 text-zinc-400">Loading...</p>;

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 p-8">
      <h1 className="text-2xl font-bold text-indigo-400 mb-4">
        Finance Dashboard
      </h1>
      <p className="text-zinc-400 mb-6">
        {transactions.length} transactions loaded
      </p>
      <ul className="space-y-2">
        {transactions.map((t) => (
          <li key={t.id} className="text-zinc-300">
            {t.description} —{" "}
            <span
              className={
                t.type === "income" ? "text-emerald-400" : "text-red-400"
              }
            >
              {formatCurrency(t.amount)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
