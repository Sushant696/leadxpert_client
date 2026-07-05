"use client";

import useGetConfusionMatrix from "../hooks/useGetConfusionMatrix";

const tierLabel: Record<string, string> = { HIGH: "High", MEDIUM: "Medium", LOW: "Low" };

function StatTile({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-muted/20 p-3 text-center">
      <p className="text-xl font-bold text-foreground leading-none">{value}</p>
      <p className="text-[11px] text-muted-foreground mt-1">{label}</p>
    </div>
  );
}

export function ConfusionMatrixCard({ workspaceId }: { workspaceId: string }) {
  const { data, isLoading } = useGetConfusionMatrix(workspaceId);

  if (isLoading) {
    return <p className="text-sm text-muted-foreground">Loading confusion matrix…</p>;
  }
  if (!data) return null;

  const { grid, binary, note } = data;

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        <StatTile label="Precision" value={`${binary.precision}%`} />
        <StatTile label="Recall" value={`${binary.recall}%`} />
        <StatTile label="F1 score" value={`${binary.f1}%`} />
        <StatTile label="Accuracy" value={`${binary.accuracy}%`} />
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-xs">
          <thead>
            <tr className="border-b border-border text-muted-foreground">
              <th className="text-left font-medium py-1.5">Predicted tier</th>
              <th className="text-right font-medium py-1.5">Converted</th>
              <th className="text-right font-medium py-1.5">Lost</th>
              <th className="text-right font-medium py-1.5">Total</th>
            </tr>
          </thead>
          <tbody>
            {grid.map((row) => (
              <tr key={row.tier} className="border-b border-border/50 last:border-0">
                <td className="py-1.5 font-medium text-foreground">{tierLabel[row.tier]}</td>
                <td className="py-1.5 text-right text-foreground">{row.converted}</td>
                <td className="py-1.5 text-right text-foreground">{row.lost}</td>
                <td className="py-1.5 text-right text-foreground">{row.total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">
        Positive class: <span className="font-medium">{binary.positiveClass}</span>.{" "}
        {note}
      </p>
    </div>
  );
}
