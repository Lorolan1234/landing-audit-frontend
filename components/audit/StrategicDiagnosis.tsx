"use client";

export function StrategicDiagnosis({
  data,
}: {
  data: { headline: string; description: string; conversion_impact: string };
}) {
  if (!data?.headline) return null;

  return (
    <div className="rounded-xl bg-amber-500/10 border-2 border-amber-500/30 p-6">
      <div className="flex items-start gap-3">
        <span className="text-3xl">⚠️</span>
        <div>
          <p className="text-sm font-semibold text-amber-400 uppercase tracking-wide">
            Стратегическая проблема
          </p>
          <h3 className="text-xl font-bold text-amber-300 mt-1">{data.headline}</h3>
          <p className="text-amber-200/70 mt-3 leading-relaxed">{data.description}</p>
          <div className="mt-4 bg-amber-500/10 rounded-lg p-3 border border-amber-500/20">
            <p className="text-sm">
              <span className="font-semibold text-amber-300">Влияние на конверсию: </span>
              <span className="text-amber-200/70">{data.conversion_impact}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
