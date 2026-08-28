import { formatCurrency } from "@/lib/formatters";

interface StatCardProps {
  label: string;
  amount: number;
  variant?: "default" | "income" | "expense" | "savings";
}

const variantStyles: Record<string, string> = {
  default: "text-zinc-100",
  income: "text-emerald-400",
  expense: "text-red-400",
  savings: "text-indigo-400",
};

export default function StatCard({
  label,
  amount,
  variant = "default",
}: StatCardProps) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p className={`text-3xl font-mono font-bold ${variantStyles[variant]}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  );
}
