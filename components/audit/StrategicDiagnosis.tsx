import { TrendingDown } from "lucide-react";

export function StrategicDiagnosis({
  data,
}: {
  data: { headline: string; description: string; conversion_impact: string };
}) {
  if (!data?.description && !data?.conversion_impact) return null;

  return (
    <div className="rounded-2xl border border-amber-400/20 bg-amber-500/[0.04] p-5 sm:p-6">
      {data.description && <p className="text-base leading-relaxed text-white/80">{data.description}</p>}
      {data.conversion_impact && (
        <div className="mt-5 flex gap-3 border-t border-amber-400/15 pt-4">
          <TrendingDown className="mt-0.5 h-5 w-5 shrink-0 text-amber-400" aria-hidden />
          <p className="text-sm leading-relaxed text-white/70">
            <span className="font-semibold text-amber-300">Как это влияет на заявки: </span>
            {data.conversion_impact}
          </p>
        </div>
      )}
    </div>
  );
}
