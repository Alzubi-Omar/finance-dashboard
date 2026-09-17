import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import type { MonthlyData } from "@/hooks/useAnalytics";
import { formatCurrency } from "@/lib/formatters";

interface Props {
  data: MonthlyData[];
}

export default function MonthlyChart({ data }: Props) {
  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-48 text-zinc-600 text-sm">
        No data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={4}>
        <XAxis
          dataKey="label"
          tick={{ fill: "#71717a", fontSize: 12 }}
          axisLine={false}
          tickLine={false}
        />
        <YAxis
          tick={{ fill: "#71717a", fontSize: 11 }}
          axisLine={false}
          tickLine={false}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          tickFormatter={(v: any) =>
            typeof v === "number" ? `$${(v / 1000).toFixed(0)}k` : v
          }
        />
        <Tooltip
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          formatter={(value: any) =>
            typeof value === "number"
              ? formatCurrency(value)
              : String(value ?? "")
          }
          contentStyle={{
            backgroundColor: "#18181b",
            border: "1px solid #27272a",
            borderRadius: "8px",
            color: "#f4f4f5",
          }}
        />
        <Legend wrapperStyle={{ fontSize: "12px", color: "#a1a1aa" }} />
        <Bar
          dataKey="income"
          name="Income"
          fill="#34d399"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="expenses"
          name="Expenses"
          fill="#f87171"
          radius={[4, 4, 0, 0]}
        />
        <Bar
          dataKey="savings"
          name="Savings"
          fill="#6366f1"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
