import type { Transaction } from "@/types";
import { formatCurrency, formatDate } from "@/lib/formatters";

interface Props {
  transactions: Transaction[];
}

export default function RecentTransactions({ transactions }: Props) {
  if (transactions.length === 0) {
    return <p className="text-zinc-600 text-sm py-4">No transactions yet.</p>;
  }

  return (
    <ul className="divide-y divide-zinc-800">
      {transactions.map((t) => (
        <li key={t.id} className="flex items-center justify-between py-3">
          <div>
            <p className="text-sm font-medium text-zinc-200">{t.description}</p>
            <p className="text-xs text-zinc-500 mt-0.5">
              {t.category} · {formatDate(t.date)}
            </p>
          </div>
          <span
            className={`text-sm font-mono font-semibold ${
              t.type === "income" ? "text-emerald-400" : "text-red-400"
            }`}
          >
            {t.type === "income" ? "+" : "-"}
            {formatCurrency(t.amount)}
          </span>
        </li>
      ))}
    </ul>
  );
}
