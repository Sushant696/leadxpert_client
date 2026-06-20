function DashboardSkeleton() {
  return (
    <div className="min-h-screen bg-background max-w-7xl mx-auto p-6 space-y-8 animate-pulse">
      {/* Header skeleton */}
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-8 bg-muted rounded-lg w-56" />
          <div className="h-4 bg-muted rounded w-40" />
        </div>
        <div className="h-9 bg-muted rounded-lg w-36" />
      </div>

      {/* Tabs skeleton */}
      <div className="flex gap-2">
        <div className="h-9 bg-muted rounded-lg w-24" />
        <div className="h-9 bg-muted rounded-lg w-24" />
        <div className="h-9 bg-muted rounded-lg w-24" />
      </div>

      {/* Stats cards row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="rounded-xl border border-border bg-card p-5 space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="h-4 bg-muted rounded w-24" />
              <div className="h-8 w-8 bg-muted rounded-lg" />
            </div>
            <div className="h-7 bg-muted rounded w-16" />
            <div className="h-3 bg-muted rounded w-32" />
          </div>
        ))}
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Large card */}
        <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="h-5 bg-muted rounded w-40" />
          <div className="space-y-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-9 w-9 bg-muted rounded-full shrink-0" />
                <div className="flex-1 space-y-1.5">
                  <div className="h-3.5 bg-muted rounded w-3/4" />
                  <div className="h-3 bg-muted rounded w-1/2" />
                </div>
                <div className="h-5 bg-muted rounded-full w-16 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Side card */}
        <div className="rounded-xl border border-border bg-card p-5 space-y-4">
          <div className="h-5 bg-muted rounded w-32" />
          <div className="space-y-3">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-lg border border-border p-3 space-y-2">
                <div className="h-3.5 bg-muted rounded w-3/4" />
                <div className="h-3 bg-muted rounded w-1/2" />
                <div className="flex gap-2 pt-1">
                  <div className="h-5 bg-muted rounded-full w-16" />
                  <div className="h-5 bg-muted rounded-full w-12" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
