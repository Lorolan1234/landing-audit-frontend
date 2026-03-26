"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, AlertTriangle, ArrowRight, Quote, Wand2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, getScoreColor } from "@/lib/utils";
import type {
  CategoryResult,
  FirstScreen,
  OfferClarity,
  ContentQuality,
  CTAAnalysis,
} from "@/types/audit";

type AnyCategory = CategoryResult | FirstScreen | OfferClarity | ContentQuality | CTAAnalysis;

interface CategoryCardProps {
  title: string;
  icon: React.ReactNode;
  data: AnyCategory;
  weight: number;
  defaultOpen?: boolean;
}

export function CategoryCard({ title, icon, data, weight, defaultOpen = false }: CategoryCardProps) {
  const [open, setOpen] = useState(defaultOpen);

  const hasCritical = data.critical_issues?.some((i) => i && i.trim());
  const criticalList = data.critical_issues?.filter((i) => i && i.trim()) ?? [];

  const firstScreen = data as FirstScreen;
  const offerClarity = data as OfferClarity;
  const contentQuality = data as ContentQuality;
  const ctaAnalysis = data as CTAAnalysis;

  const hasHeadlineRewrite = firstScreen.headline_quote || firstScreen.headline_rewrite;
  const hasOfferRewrite = offerClarity.offer_rewrite;
  const hasPhrases =
    (contentQuality.weak_phrases_found?.length ?? 0) > 0 ||
    (contentQuality.strong_phrases_found?.length ?? 0) > 0;
  const hasCTAButtons = (ctaAnalysis.cta_buttons_found?.length ?? 0) > 0;

  return (
    <div
      className={cn(
        "rounded-2xl border bg-white transition-shadow duration-200",
        hasCritical ? "border-red-200" : "border-gray-100",
        open ? "shadow-md" : "shadow-sm hover:shadow-md",
      )}
    >
      {/* Заголовок */}
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gray-50 text-gray-500">
          {icon}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-gray-900 truncate">{title}</h3>
            {hasCritical && (
              <span className="shrink-0 inline-flex items-center gap-1 text-xs text-red-600 font-medium bg-red-50 px-1.5 py-0.5 rounded-md">
                <AlertTriangle className="h-3 w-3" />
                {criticalList.length}
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{data.verdict} · вес {weight}%</p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className={cn("text-2xl font-black", getScoreColor(data.score))}>
              {data.score}
            </span>
            <span className="text-xs text-gray-300">/10</span>
          </div>

          <div className="w-1.5 h-10 bg-gray-100 rounded-full overflow-hidden">
            <div
              className="w-full rounded-full transition-all duration-700"
              style={{
                height: `${data.score * 10}%`,
                backgroundColor: getScoreHex(data.score),
                marginTop: `${100 - data.score * 10}%`,
              }}
            />
          </div>

          {open ? (
            <ChevronUp className="h-4 w-4 text-gray-400" />
          ) : (
            <ChevronDown className="h-4 w-4 text-gray-400" />
          )}
        </div>
      </button>

      {/* Раскрывающееся содержимое */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-gray-50 pt-4">

              {/* Цитата заголовка + готовый вариант (First Screen) */}
              {hasHeadlineRewrite && (
                <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4 space-y-3">
                  {firstScreen.headline_quote && (
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Quote className="h-3 w-3" />
                        Текущий заголовок
                      </p>
                      <p className="text-sm text-gray-700 italic">«{firstScreen.headline_quote}»</p>
                      {firstScreen.headline_assessment && (
                        <p className="text-xs text-gray-500 mt-1">{firstScreen.headline_assessment}</p>
                      )}
                    </div>
                  )}
                  {firstScreen.headline_rewrite && (
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Wand2 className="h-3 w-3" />
                        Готовый вариант
                      </p>
                      <p className="text-sm font-medium text-gray-800 bg-white rounded-lg px-3 py-2 border border-green-200">
                        {firstScreen.headline_rewrite}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* Оффер + готовый вариант (Offer Clarity) */}
              {(offerClarity.main_offer_detected || hasOfferRewrite) && (
                <div className="rounded-xl border border-purple-100 bg-purple-50/50 p-4 space-y-3">
                  {offerClarity.main_offer_detected && (
                    <div>
                      <p className="text-xs font-semibold text-purple-600 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Quote className="h-3 w-3" />
                        Текущий оффер
                      </p>
                      <p className="text-sm text-gray-700 italic">«{offerClarity.main_offer_detected}»</p>
                    </div>
                  )}
                  {hasOfferRewrite && (
                    <div>
                      <p className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Wand2 className="h-3 w-3" />
                        Улучшенный оффер
                      </p>
                      <p className="text-sm font-medium text-gray-800 bg-white rounded-lg px-3 py-2 border border-green-200">
                        {offerClarity.offer_rewrite}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {/* CTA-кнопки с оценкой и переписанными вариантами */}
              {hasCTAButtons && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Найденные CTA-кнопки
                  </h4>
                  <div className="space-y-2">
                    {ctaAnalysis.cta_buttons_found.map((btn, i) => (
                      <div key={i} className="rounded-lg border border-gray-100 bg-gray-50 px-3 py-2.5">
                        <div className="flex items-start justify-between gap-2">
                          <span className="text-sm font-medium text-gray-800">«{btn.text}»</span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{btn.assessment}</p>
                        {btn.rewrite && (
                          <p className="text-xs font-medium text-green-700 mt-1.5 flex items-center gap-1">
                            <ArrowRight className="h-3 w-3 shrink-0" />
                            {btn.rewrite}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Слабые и сильные фразы (Content Quality) */}
              {hasPhrases && (
                <div className="grid grid-cols-1 gap-3">
                  {(contentQuality.strong_phrases_found?.length ?? 0) > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
                        Сильные фразы
                      </h4>
                      <ul className="space-y-1">
                        {contentQuality.strong_phrases_found!.map((phrase, i) => (
                          <li key={i} className="text-sm text-gray-700 bg-green-50 rounded-lg px-3 py-1.5 italic">
                            «{phrase}»
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(contentQuality.weak_phrases_found?.length ?? 0) > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-orange-500 uppercase tracking-wide mb-2">
                        Слабые фразы — нужно улучшить
                      </h4>
                      <ul className="space-y-1">
                        {contentQuality.weak_phrases_found!.map((phrase, i) => (
                          <li key={i} className="text-sm text-gray-700 bg-orange-50 rounded-lg px-3 py-1.5 italic">
                            «{phrase}»
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Критичные проблемы */}
              {criticalList.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-red-600 uppercase tracking-wide mb-2">
                    Критичные проблемы
                  </h4>
                  <ul className="space-y-1.5">
                    {criticalList.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-red-700 bg-red-50 rounded-lg px-3 py-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Наблюдения */}
              {data.findings?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                    Наблюдения
                  </h4>
                  <ul className="space-y-1.5">
                    {data.findings.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-600">
                        <span className="text-gray-300 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Рекомендации */}
              {data.recommendations?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-green-600 uppercase tracking-wide mb-2">
                    Рекомендации
                  </h4>
                  <ul className="space-y-1.5">
                    {data.recommendations.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-gray-700 bg-green-50 rounded-lg px-3 py-2">
                        <ArrowRight className="h-4 w-4 shrink-0 text-green-500 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function getScoreHex(score: number): string {
  if (score >= 8) return "#22c55e";
  if (score >= 6) return "#f59e0b";
  if (score >= 4) return "#f97316";
  return "#ef4444";
}
