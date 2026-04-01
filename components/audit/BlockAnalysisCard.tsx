"use client";

import { useState } from "react";
import type { PageBlockAnalysis } from "@/types/audit";

interface ProblemItem {
  id?: string;
  problem: string;
  why_critical?: string;
  severity?: string;
}

interface RecommendationItem {
  action: string;
  rewrite_example?: string;
  expected_impact?: string;
}

export function BlockAnalysisCard({ block }: { block: PageBlockAnalysis }) {
  const [isOpen, setIsOpen] = useState(false);

  const rawProblems =
    (block.problem_items?.length ? block.problem_items : block.problems) ?? [];
  const problemList: ProblemItem[] = rawProblems.map((p) =>
    typeof p === "string" ? { problem: p, severity: "major" } : p
  );

  const recommendations: RecommendationItem[] =
    (block.recommendation_items?.length ? block.recommendation_items : block.recommendations) ?? [];
  const recList = block.rewrite_suggestion && !recommendations.length
    ? [{ action: "", rewrite_example: block.rewrite_suggestion }]
    : recommendations;

  const criticalCount = problemList.filter((p) => p.severity === "critical").length;

  return (
    <div className="border border-white/[0.08] rounded-lg overflow-hidden bg-white/[0.02]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-white/[0.03] transition-colors"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-white/[0.06] flex items-center justify-center text-sm font-medium text-white/50">
            {block.block_order}
          </span>
          <div className="text-left">
            <span className="font-semibold text-white/80">{block.block_name}</span>
            {(block.current_content?.headline ?? block.heading_quote) && (
              <p className="text-sm text-white/30 truncate max-w-[200px]">
                «{block.current_content?.headline ?? block.heading_quote}»
              </p>
            )}
          </div>
          {criticalCount > 0 && (
            <span className="text-xs bg-red-500/20 text-red-400 px-2 py-0.5 rounded shrink-0">
              ⚠️ {criticalCount} крит.
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {block.score != null && (
            <span
              className={`text-xl font-bold ${
                block.score <= 4
                  ? "text-red-400"
                  : block.score <= 6
                    ? "text-orange-400"
                    : "text-green-400"
              }`}
            >
              {block.score}
              <span className="text-sm text-white/20">/10</span>
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="border-t border-white/[0.06] p-4 space-y-5">
          {(block.current_content?.headline ||
            block.current_content?.cta_text ||
            block.current_content?.subtitle ||
            block.current_content?.visual_description ||
            block.heading_quote) && (
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase mb-2">Сейчас на странице</h4>
              <div className="bg-white/[0.03] border border-white/[0.06] rounded-lg p-3 space-y-1 text-sm">
                {(block.current_content?.headline ?? block.heading_quote) && (
                  <p className="text-white/50">
                    <span className="text-white/25">Заголовок:</span> «{block.current_content?.headline ?? block.heading_quote}»
                  </p>
                )}
                {block.current_content?.subtitle && (
                  <p className="text-white/50">
                    <span className="text-white/25">Подзаголовок:</span> «{block.current_content.subtitle}»
                  </p>
                )}
                {block.current_content?.cta_text && (
                  <p className="text-white/50">
                    <span className="text-white/25">CTA:</span> [{block.current_content.cta_text}]
                  </p>
                )}
                {(block.current_content?.visual_description ?? block.content_assessment) && (
                  <p className="text-white/50">
                    <span className="text-white/25">Визуал:</span> {block.current_content?.visual_description ?? block.content_assessment}
                  </p>
                )}
              </div>
            </div>
          )}

          {problemList.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase mb-2">Проблемы</h4>
              <div className="space-y-2">
                {problemList.map((p, i) => (
                  <div key={p.id ?? i} className="flex gap-3 text-sm border-b border-white/[0.04] pb-2 last:border-0">
                    <span
                      className={`text-xs px-1.5 py-0.5 rounded shrink-0 mt-0.5 ${
                        p.severity === "critical"
                          ? "bg-red-500/20 text-red-400"
                          : p.severity === "major"
                            ? "bg-orange-500/20 text-orange-400"
                            : "bg-yellow-500/20 text-yellow-400"
                      }`}
                    >
                      {p.id || `${i + 1}`}
                    </span>
                    <div>
                      <p className="font-medium text-white/70">{p.problem}</p>
                      {p.why_critical && (
                        <p className="text-xs text-white/40 mt-0.5">{p.why_critical}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {recList.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-white/30 uppercase mb-2">Рекомендации</h4>
              <div className="space-y-3">
                {recList.map((rec, i) => (
                  <div key={i} className="bg-green-500/5 border border-green-500/15 rounded-lg p-4">
                    <p className="text-sm font-medium text-green-400">
                      → {rec.action || "Предложение"}
                    </p>
                    {rec.rewrite_example && (
                      <div className="mt-2 bg-green-500/10 rounded p-3 border border-green-500/20">
                        <p className="text-xs text-white/40 mb-1">Готовый вариант:</p>
                        <p className="text-sm text-green-300 italic">«{rec.rewrite_example}»</p>
                      </div>
                    )}
                    {rec.expected_impact && (
                      <p className="text-xs text-green-400/60 mt-2">Эффект: {rec.expected_impact}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
