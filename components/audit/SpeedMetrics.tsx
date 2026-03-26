"use client";

import { cn } from "@/lib/utils";
import type { SpeedData, SpeedMetrics as ISpeedMetrics } from "@/types/audit";

interface SpeedMetricsProps {
  data: SpeedData;
}

function MetricRow({
  label,
  value,
  unit,
  good,
  warn,
}: {
  label: string;
  value: number;
  unit: string;
  good: number;
  warn: number;
}) {
  const isGood = value <= good;
  const isWarn = !isGood && value <= warn;
  const color = isGood ? "text-green-600" : isWarn ? "text-amber-600" : "text-red-600";
  const bg = isGood ? "bg-green-50" : isWarn ? "bg-amber-50" : "bg-red-50";

  return (
    <div className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
      <span className="text-sm text-gray-500">{label}</span>
      <span className={cn("text-sm font-semibold px-2 py-0.5 rounded-md", color, bg)}>
        {value}
        <span className="font-normal text-xs ml-0.5">{unit}</span>
      </span>
    </div>
  );
}

function StrategyBlock({ title, metrics }: { title: string; metrics: ISpeedMetrics }) {
  return (
    <div className="bg-gray-50 rounded-2xl p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-700">{title}</h3>
        <div className="flex items-center gap-2">
          <span className="text-xs text-gray-400">Score</span>
          <span
            className={cn(
              "text-lg font-black",
              metrics.performance_score >= 90
                ? "text-green-500"
                : metrics.performance_score >= 50
                  ? "text-amber-500"
                  : "text-red-500",
            )}
          >
            {metrics.performance_score}
          </span>
        </div>
      </div>

      <MetricRow label="FCP" value={metrics.fcp}   unit="с"  good={1.8} warn={3.0} />
      <MetricRow label="LCP" value={metrics.lcp}   unit="с"  good={2.5} warn={4.0} />
      <MetricRow label="CLS" value={metrics.cls}   unit=""   good={0.1} warn={0.25} />
      <MetricRow label="TBT" value={metrics.tbt}   unit="мс" good={200} warn={600} />
      <MetricRow label="Speed Index" value={metrics.speed_index} unit="с" good={3.4} warn={5.8} />
    </div>
  );
}

export function SpeedMetrics({ data }: SpeedMetricsProps) {
  if (!data.speed_data_available) {
    const reason = data.error_reason || "PageSpeed API не отвечал";
    const is400 = reason.includes("400") || reason.includes("Bad Request");
    const isKeyError = reason.includes("GOOGLE_PAGESPEED_KEY") || reason.includes("API key") || reason.includes("invalid");
    return (
      <div className="space-y-2">
        <h2 className="text-base font-bold text-gray-900">Скорость загрузки</h2>
        <div className="rounded-2xl border border-amber-200 bg-amber-50/50 p-6 text-center text-sm text-gray-600">
          <p className="font-medium text-amber-800">Метрики скорости недоступны</p>
          <p className="mt-1 text-gray-500">{reason}</p>
          {isKeyError && (
            <p className="mt-2 text-xs text-gray-400">
              Добавьте ключ в <code className="bg-gray-100 px-1 rounded">.env</code> и перезапустите бэкенд
            </p>
          )}
          {is400 && !isKeyError && (
            <p className="mt-2 text-xs text-gray-400">
              Проверьте: включён ли PageSpeed Insights API в Google Cloud Console, сняты ли ограничения с ключа (IP/Referrer)
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-base font-bold text-gray-900">Скорость загрузки</h2>
      </div>

      {data.core_web_vitals_passed === false && (
        <div className="flex items-start gap-2 rounded-lg bg-red-50 border border-red-100 px-4 py-3">
          <span className="text-red-500 shrink-0 mt-0.5 text-sm">✗</span>
          <div>
            <p className="text-sm font-medium text-red-700">
              Core Web Vitals не пройдены
            </p>
            <p className="text-xs text-red-600/80 mt-0.5">
              Метрики скорости не соответствуют стандартам Google.
              Это может снижать позиции в поиске и увеличивать отказы на мобильных.
            </p>
          </div>
        </div>
      )}

      {data.core_web_vitals_passed === true && (
        <div className="flex items-start gap-2 rounded-lg bg-green-50 border border-green-100 px-4 py-3">
          <span className="text-green-500 shrink-0 mt-0.5 text-sm">✓</span>
          <div>
            <p className="text-sm font-medium text-green-700">
              Core Web Vitals пройдены
            </p>
            <p className="text-xs text-green-600/80 mt-0.5">
              Скорость загрузки соответствует стандартам Google.
            </p>
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
