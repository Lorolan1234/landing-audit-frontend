"use client";

import { cn } from "@/lib/utils";
import type { SpeedData, SpeedMetrics as ISpeedMetrics } from "@/types/audit";

interface SpeedMetricsProps {
  data: SpeedData;
}

function MetricRow({ label, value, unit, good, warn }: {
  label: string; value: number; unit: string; good: number; warn: number;
}) {
  const isGood = value <= good;
  const isWarn = !isGood && value <= warn;
  const color = isGood ? "text-green-400" : isWarn ? "text-amber-400" : "text-red-400";
  const bg = isGood ? "bg-green-500/10" : isWarn ? "bg-amber-500/10" : "bg-red-500/10";

  return (
    <div className="flex items-center justify-between py-2 border-b border-white/[0.04] last:border-0">
      <span className="text-sm text-white/40">{label}</span>
      <span className={cn("text-sm font-semibold px-2 py-0.5 rounded-md", color, bg)}>
        {value}<span className="font-normal text-xs ml-0.5">{unit}</span>
      </span>
    </div>
  );
}

function StrategyBlock({ title, metrics }: { title: string; metrics: ISpeedMetrics }) {
  return (
    <div className="bg-white/[0.03] border border-white/[0.06] rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-white/60">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white/25">Score</span>
          <span className={cn("text-lg font-black",
            metrics.performance_score >= 90 ? "text-green-400" :
            metrics.performance_score >= 50 ? "text-amber-400" : "text-red-400",
          )}>
            {metrics.performance_score}
          </span>
        </div>
      </div>
      <MetricRow label="FCP" value={metrics.fcp} unit="с" good={1.8} warn={3.0} />
      <MetricRow label="LCP" value={metrics.lcp} unit="с" good={2.5} warn={4.0} />
      <MetricRow label="CLS" value={metrics.cls} unit="" good={0.1} warn={0.25} />
      <MetricRow label="TBT" value={metrics.tbt} unit="мс" good={200} warn={600} />
      <MetricRow label="Speed Index" value={metrics.speed_index} unit="с" good={3.4} warn={5.8} />
    </div>
  );
}

export function SpeedMetrics({ data }: SpeedMetricsProps) {
  if (!data.speed_data_available) {
    const reason = data.error_reason || "PageSpeed API не отвечал";
    return (
      <div className="space-y-2">
        <h2 className="text-base font-bold text-white/80">Скорость загрузки</h2>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-6 text-center text-sm">
          <p className="font-medium text-amber-400">Метрики скорости недоступны</p>
          <p className="mt-1 text-white/40">{reason}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-base font-bold text-white/80">Скорость загрузки</h2>

      {data.core_web_vitals_passed === false && (
        <div className="flex items-start gap-2 rounded-lg bg-red-500/5 border border-red-500/20 px-4 py-3">
          <span className="text-red-400 shrink-0 mt-0.5 text-sm">✗</span>
          <div>
            <p className="text-sm font-medium text-red-400">Core Web Vitals не пройдены</p>
            <p className="text-xs text-white/40 mt-0.5">
              Метрики скорости не соответствуют стандартам Google.
            </p>
          </div>
        </div>
      )}

      {data.core_web_vitals_passed === true && (
        <div className="flex items-start gap-2 rounded-lg bg-green-500/5 border border-green-500/20 px-4 py-3">
          <span className="text-green-400 shrink-0 mt-0.5 text-sm">✓</span>
          <div>
            <p className="text-sm font-medium text-green-400">Core Web Vitals пройдены</p>
            <p className="text-xs text-white/40 mt-0.5">Скорость загрузки соответствует стандартам Google.</p>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <StrategyBlock title="📱 Mobile" metrics={data.mobile} />
        <StrategyBlock title="🖥 Desktop" metrics={data.desktop} />
      </div>
    </div>
  );
}
