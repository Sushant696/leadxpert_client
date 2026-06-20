export function PipelineSkeleton() {
  return (
    <div className="flex flex-col h-full animate-pulse">
      <div className="shrink-0 px-6 pt-6 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-muted" />
          <div className="space-y-2">
            <div className="h-5 bg-muted rounded w-48" />
            <div className="h-3 bg-muted rounded w-72" />
            <div className="flex gap-1.5">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-5 w-16 bg-muted rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="shrink-0 px-6 py-4 border-b border-border">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="h-20 bg-muted rounded-xl" />
          ))}
        </div>
      </div>
      <div className="flex gap-4 p-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="w-72 h-120 bg-muted rounded-xl shrink-0" />
        ))}
      </div>
    </div>
  );
}
