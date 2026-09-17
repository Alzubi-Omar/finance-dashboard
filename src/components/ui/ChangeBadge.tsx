interface Props {
  value: number | null;
  label: string;
  invertColors?: boolean;
}

export default function ChangeBadge({
  value,
  label,
  invertColors = false,
}: Props) {
  if (value === null) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
          {label}
        </p>
        <p className="text-zinc-600 text-sm">No previous month</p>
      </div>
    );
  }

  const isPositive = value >= 0;
  const isGood = invertColors ? !isPositive : isPositive;

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-2">
        {label}
      </p>
      <p
        className={`text-3xl font-mono font-bold ${
          isGood ? "text-emerald-400" : "text-red-400"
        }`}
      >
        {isPositive ? "+" : ""}
        {value.toFixed(1)}%
      </p>
      <p className="text-xs text-zinc-600 mt-1">vs last month</p>
    </div>
  );
}
