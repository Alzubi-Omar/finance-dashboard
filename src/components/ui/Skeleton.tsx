interface Props {
  className?: string;
}

export function Skeleton({ className = "" }: Props) {
  return (
    <div className={`animate-pulse bg-zinc-800 rounded-lg ${className}`} />
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <Skeleton className="h-3 w-20 mb-3" />
      <Skeleton className="h-8 w-32" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="px-6 py-3 border-b border-zinc-800">
        <Skeleton className="h-3 w-48" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="px-6 py-4 border-b border-zinc-800 flex items-center justify-between"
        >
          <div className="space-y-2">
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-2.5 w-24" />
          </div>
          <Skeleton className="h-4 w-20" />
        </div>
      ))}
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <Skeleton className="h-3 w-36 mb-6" />
      <Skeleton className="h-64 w-full" />
    </div>
  );
}
