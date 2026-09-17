import type { CategoryTotal } from "@/hooks/useAnalytics";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  data: CategoryTotal[];
}

export default function CategoryTable({ data }: Props) {
  if (data.length === 0) {
    return <p className="text-zinc-600 text-sm py-4">No expense data yet.</p>;
  }

  return (
    <div className="space-y-3">
      {data.map((item) => (
        <div key={item.category}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-sm text-zinc-300 capitalize">
              {item.category}
            </span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-zinc-500">
                {item.count} transaction{item.count !== 1 ? "s" : ""}
              </span>
              <span className="text-sm font-mono font-medium text-zinc-200">
                {formatCurrency(item.total)}
              </span>
              <span className="text-xs text-zinc-500 w-10 text-right">
                {item.percentage.toFixed(0)}%
              </span>
            </div>
          </div>
          {/* Progress bar */}
          <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
            <div
              className="h-full bg-indigo-500 rounded-full transition-all"
              style={{ width: `${item.percentage}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
