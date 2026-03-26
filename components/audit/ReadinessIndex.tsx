"use client";

import { motion } from "framer-motion";
import { cn, getIndexColor } from "@/lib/utils";

interface ReadinessIndexProps {
  index: number;
  category: string;
  criticalCount: number;
  hasBlockers: boolean;
  processingTime?: number | null;
  className?: string;
}

export function ReadinessIndex({
  index,
  category,
  criticalCount,
  hasBlockers,
  processingTime,
  className,
}: ReadinessIndexProps) {
  // Цвет дуги по значению
  const getStrokeColor = (val: number) => {
    if (val >= 86) return "#22c55e";
    if (val >= 71) return "#84cc16";
    if (val >= 51) return "#f59e0b";
    if (val >= 31) return "#f97316";
    return "#ef4444";
  };

  const r = 56;
  const circumference = 2 * Math.PI * r;
  const strokeDashoffset = circumference - (index / 100) * circumference;
  const strokeColor = getStrokeColor(index);

  return (
    <div className={cn("text-center", className)}>
      {/* Круговой gauge */}
      <div className="relative inline-flex items-center justify-center">
        <svg width="160" height="160" viewBox="0 0 160 160" className="-rotate-90">
          {/* Трек */}
          <circle
            cx="80" cy="80" r={r}
            fill="none"
            stroke="#f3f4f6"
            strokeWidth="12"
          />
          {/* Прогресс */}
          <motion.circle
            cx="80" cy="80" r={r}
            fill="none"
            stroke={strokeColor}
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            initial={{ strokeDashoffset: circumference }}
            animate={{ strokeDashoffset }}
            transition={{ duration: 1.2, ease: "easeOut" }}
          />
        </svg>

        {/* Цифра в центре */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <motion.span
            className={cn("text-4xl font-black leading-none", getIndexColor(index))}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            {index}
          </motion.span>
          <span className="text-xs text-gray-400 mt-0.5">из 100</span>
        </div>
      </div>

      {/* Категория */}
      <motion.p
        className="mt-3 text-base font-semibold text-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {category}
      </motion.p>

      {/* Метаданные */}
      <div className="mt-4 flex justify-center gap-6 text-sm">
        <div className="text-center">
          <span className="block text-xl font-bold text-red-500">{criticalCount}</span>
          <span className="text-xs text-gray-400">критичных проблем</span>
        </div>
        {processingTime && (
          <div className="text-center">
            <span className="block text-xl font-bold text-gray-700">
              {Math.round(processingTime)}с
            </span>
            <span className="text-xs text-gray-400">время анализа</span>
          </div>
        )}
      </div>

      {/* Баннер блокера */}
      {hasBlockers && (
        <motion.div
          className="mt-4 rounded-xl bg-red-50 border border-red-200 px-4 py-2.5 text-sm text-red-700 font-medium"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
        >
          ⚠ Обнаружены стоп-факторы для запуска трафика
        </motion.div>
      )}
    </div>
  );
}
