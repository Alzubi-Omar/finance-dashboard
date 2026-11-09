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
      <div
        className="rounded-xl p-6 border border-slate-700/50"
        style={{
          background: "linear-gradient(135deg, #111827 0%, #1a2235 100%)",
        }}
      >
        <p className="text-xs font-medium text-slate-500 uppercase tracking-widest mb-2">
          {label}
        </p>
        <p className="text-slate-600 text-sm">No previous month</p>
      </div>
    );
  }

  const isPositive = value >= 0;
  const isGood = invertColors ? !isPositive : isPositive;

  const goodStyle = {
    background: "linear-gradient(135deg, #052e16 0%, #064e3b 100%)",
    border: "1px solid #065f46",
  };
  const badStyle = {
    background: "linear-gradient(135deg, #2d0a0a 0%, #450a0a 100%)",
    border: "1px solid #7f1d1d",
  };

  return (
    <div className="rounded-xl p-6" style={isGood ? goodStyle : badStyle}>
      <p
        className={`text-xs font-medium uppercase tracking-widest mb-2 ${
          isGood ? "text-emerald-700" : "text-red-800"
        }`}
      >
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
      <p
        className={`text-xs mt-1 ${isGood ? "text-emerald-800" : "text-red-900"}`}
      >
        vs last month
      </p>
    </div>
  );
}
