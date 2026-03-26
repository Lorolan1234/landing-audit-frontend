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
    <div className="border rounded-lg overflow-hidden">
      {/* Заголовок */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 flex items-center justify-between hover:bg-gray-50"
      >
        <div className="flex items-center gap-3">
          <span className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium">
            {block.block_order}
          </span>
          <div className="text-left">
            <span className="font-semibold">{block.block_name}</span>
            {(block.current_content?.headline ?? block.heading_quote) && (
              <p className="text-sm text-gray-500 truncate max-w-[200px]">
                «{block.current_content?.headline ?? block.heading_quote}»
              </p>
            )}
          </div>
          {criticalCount > 0 && (
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded shrink-0">
              ⚠️ {criticalCount} крит.
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          {block.score != null && (
            <span
              className={`text-xl font-bold ${
                block.score <= 4
                  ? "text-red-500"
                  : block.score <= 6
                    ? "text-orange-500"
                    : "text-green-500"
              }`}
            >
              {block.score}
              <span className="text-sm text-gray-400">/10</span>
            </span>
          )}
        </div>
      </button>

      {isOpen && (
        <div className="border-t p-4 space-y-5">
          {/* Что сейчас на странице */}
          {(block.current_content?.headline ||
            block.current_content?.cta_text ||
            block.current_content?.subtitle ||
            block.current_content?.visual_description ||
            block.heading_quote) && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Сейчас на странице
              </h4>
              <div className="bg-gray-50 rounded-lg p-3 space-y-1 text-sm">
                {(block.current_content?.headline ?? block.heading_quote) && (
                  <p>
                    <span className="text-gray-400">Заголовок:</span> «
                    {block.current_content?.headline ?? block.heading_quote}»
                  </p>
                )}
                {block.current_content?.subtitle && (
                  <p>
                    <span className="text-gray-400">Подзаголовок:</span> «
                    {block.current_content.subtitle}»
                  </p>
                )}
                {block.current_content?.cta_text && (
                  <p>
                    <span className="text-gray-400">CTA:</span> [
                    {block.current_content.cta_text}]
                  </p>
                )}
                {(block.current_content?.visual_description ?? block.content_assessment) && (
                  <p>
                    <span className="text-gray-400">Визуал:</span>{" "}
                    {block.current_content?.visual_description ?? block.content_assessment}
                  </p>
                )}
              </div>
            </div>
          )}

          {/* Таблица проблем */}
          {problemList.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Проблемы
              </h4>
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b text-left">
                    <th className="py-2 pr-3 w-10">№</th>
                    <th className="py-2 pr-3">Проблема</th>
                    <th className="py-2">Почему это критично</th>
                  </tr>
                </thead>
                <tbody>
                  {problemList.map((p, i) => (
                    <tr key={p.id ?? i} className="border-b last:border-0">
                      <td className="py-2 pr-3 align-top">
                        <span
                          className={`text-xs px-1.5 py-0.5 rounded ${
                            p.severity === "critical"
                              ? "bg-red-100 text-red-700"
                              : p.severity === "major"
                                ? "bg-orange-100 text-orange-700"
                                : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {p.id || `${i + 1}`}
                        </span>
                      </td>
                      <td className="py-2 pr-3 align-top font-medium">{p.problem}</td>
                      <td className="py-2 align-top text-gray-600">
                        {p.why_critical || "—"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Рекомендации */}
          {recList.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-gray-400 uppercase mb-2">
                Рекомендации
              </h4>
              <div className="space-y-3">
                {recList.map((rec, i) => (
                  <div key={i} className="bg-green-50 rounded-lg p-4">
                    {rec.action ? (
                      <p className="text-sm font-medium text-green-900">→ {rec.action}</p>
                    ) : (
                      <p className="text-sm font-medium text-green-900">→ Предложение</p>
                    )}
                    {rec.rewrite_example && (
                      <div className="mt-2 bg-white rounded p-3 border border-green-200">
                        <p className="text-xs text-gray-500 mb-1">Готовый вариант:</p>
                        <p className="text-sm text-green-800 italic">
                          «{rec.rewrite_example}»
                        </p>
                      </div>
                    )}
                    {rec.expected_impact && (
                      <p className="text-xs text-green-600 mt-2">
                        Эффект: {rec.expected_impact}
                      </p>
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
