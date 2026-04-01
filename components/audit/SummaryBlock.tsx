"use client";

import { CheckCircle2, XCircle, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import type { OverallSummary, PriorityItem } from "@/types/audit";

interface SummaryBlockProps {
  summary: OverallSummary;
}

const COMPLEXITY_COLORS: Record<string, string> = {
  "Низкая": "bg-green-500/20 text-green-400",
  "Средняя": "bg-amber-500/20 text-amber-400",
  "Высокая": "bg-red-500/20 text-red-400",
};

function isPriorityItem(item: PriorityItem | string): item is PriorityItem {
  return typeof item === "object" && item !== null && "action" in item;
}

export function SummaryBlock({ summary }: SummaryBlockProps) {
  return (
    <div className="space-y-6">
      {/* Главный вывод */}
      {(summary.main_conclusion || summary.conversion_score != null) && (
        <div className="rounded-2xl border border-indigo-500/20 bg-indigo-500/5 px-5 py-4">
          {summary.conversion_score != null && (
            <p className="text-xs font-semibold text-indigo-400 mb-1">
              Оценка конверсионного потенциала: {summary.conversion_score}/10
            </p>
          )}
          {summary.main_conclusion && (
            <p className="text-sm font-medium text-white/70">{summary.main_conclusion}</p>
          )}
        </div>
      )}

      {/* Сильные и слабые стороны */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-green-500/20 bg-green-500/5 p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-green-400 mb-3">
            <CheckCircle2 className="h-4 w-4" />
            Сильные стороны
          </h3>
          <ul className="space-y-2">
            {summary.strengths.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-2 text-sm text-white/60"
              >
                <span className="text-green-400 mt-0.5 shrink-0">✓</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-red-500/20 bg-red-500/5 p-5">
          <h3 className="flex items-center gap-2 text-sm font-bold text-red-400 mb-3">
            <XCircle className="h-4 w-4" />
            Слабые стороны
          </h3>
          <ul className="space-y-2">
            {summary.weaknesses.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                className="flex gap-2 text-sm text-white/60"
              >
                <span className="text-red-400 mt-0.5 shrink-0">✗</span>
                {item}
              </motion.li>
            ))}
          </ul>
        </div>
      </div>

      {/* Топ-3 приоритета */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-bold text-white/80 mb-3">
          <ArrowRight className="h-4 w-4 text-indigo-400" />
          Топ-3 приоритета для исправления
        </h3>
        <div className="space-y-2.5">
          {summary.top_3_priorities.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.1 }}
              className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 px-4 py-3"
            >
              {isPriorityItem(item) ? (
                <div className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white/80">{item.action}</p>
                    {item.expected_effect && (
                      <p className="text-xs text-white/40 mt-1">Эффект: {item.expected_effect}</p>
                    )}
                    {item.complexity && (
                      <span
                        className={`inline-block mt-1.5 text-xs font-medium px-2 py-0.5 rounded-full ${COMPLEXITY_COLORS[item.complexity] ?? "bg-white/[0.05] text-white/40"}`}
                      >
                        Сложность: {item.complexity}
                      </span>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex gap-4">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-xs font-bold">
                    {i + 1}
                  </span>
                  <p className="text-sm text-white/60">{item}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Прогноз влияния */}
      {summary.estimated_conversion_impact && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex gap-3 rounded-2xl border border-amber-500/20 bg-amber-500/5 px-5 py-4"
        >
          <Sparkles className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-amber-400 mb-1">Прогноз влияния исправлений</p>
            <p className="text-sm text-white/60">{summary.estimated_conversion_impact}</p>
          </div>
        </motion.div>
      )}
    </div>
  );
}
