import { formatCurrency } from "@/lib/formatters";

interface StatCardProps {
  label: string;
  amount: number;
  variant?: "default" | "income" | "expense" | "savings";
}

const variantStyles = {
  default: {
    card: {
      background: "linear-gradient(135deg, #1a2235 0%, #1e2a40 100%)",
      border: "1px solid #1f2d45",
    },
    label: "text-slate-500",
    value: "text-slate-100",
  },
  income: {
    card: {
      background: "linear-gradient(135deg, #052e16 0%, #064e3b 100%)",
      border: "1px solid #065f46",
    },
    label: "text-emerald-700",
    value: "text-emerald-400",
  },
  expense: {
    card: {
      background: "linear-gradient(135deg, #2d0a0a 0%, #450a0a 100%)",
      border: "1px solid #7f1d1d",
    },
    label: "text-red-800",
    value: "text-red-400",
  },
  savings: {
    card: {
      background: "linear-gradient(135deg, #0c1a3d 0%, #0c2461 100%)",
      border: "1px solid #1e3a8a",
    },
    label: "text-blue-800",
    value: "text-blue-400",
  },
};

export default function StatCard({
  label,
  amount,
  variant = "default",
}: StatCardProps) {
  const s = variantStyles[variant];
  return (
    <div className="rounded-xl p-6" style={s.card}>
      <p
        className={`text-xs font-medium uppercase tracking-widest mb-2 ${s.label}`}
      >
        {label}
      </p>
      <p className={`text-3xl font-mono font-bold ${s.value}`}>
        {formatCurrency(amount)}
      </p>
    </div>
  );
}
