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

function getScoreHex(score: number): string {
  if (score >= 8) return "#22c55e";
  if (score >= 6) return "#f59e0b";
  if (score >= 4) return "#f97316";
  return "#ef4444";
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
        "rounded-2xl border bg-white/[0.02] transition-all duration-200",
        hasCritical ? "border-red-500/30" : "border-white/[0.08]",
        open ? "shadow-lg shadow-black/20" : "hover:bg-white/[0.04]",
      )}
    >
      <button
        className="w-full flex items-center gap-4 p-5 text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.05] text-white/40">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold text-white/80 truncate">{title}</h3>
            {hasCritical && (
              <span className="shrink-0 inline-flex items-center gap-1 text-xs text-red-400 font-medium bg-red-500/10 px-1.5 py-0.5 rounded-md">
                <AlertTriangle className="h-3 w-3" />
                {criticalList.length}
              </span>
            )}
          </div>
          <p className="text-xs text-white/30 mt-0.5">{data.verdict} · вес {weight}%</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <div className="text-right">
            <span className={cn("text-2xl font-black", getScoreColor(data.score))}>
              {data.score}
            </span>
            <span className="text-xs text-white/20">/10</span>
          </div>
          <div className="w-1.5 h-10 bg-white/[0.06] rounded-full overflow-hidden">
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
            <ChevronUp className="h-4 w-4 text-white/30" />
          ) : (
            <ChevronDown className="h-4 w-4 text-white/30" />
          )}
        </div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-5 space-y-4 border-t border-white/[0.06] pt-4">
              {hasHeadlineRewrite && (
                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-3">
                  {firstScreen.headline_quote && (
                    <div>
                      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Quote className="h-3 w-3" /> Текущий заголовок
                      </p>
                      <p className="text-sm text-white/60 italic">«{firstScreen.headline_quote}»</p>
                      {firstScreen.headline_assessment && (
                        <p className="text-xs text-white/40 mt-1">{firstScreen.headline_assessment}</p>
                      )}
                    </div>
                  )}
                  {firstScreen.headline_rewrite && (
                    <div>
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Wand2 className="h-3 w-3" /> Готовый вариант
                      </p>
                      <p className="text-sm font-medium text-white/80 bg-green-500/10 rounded-lg px-3 py-2 border border-green-500/20">
                        {firstScreen.headline_rewrite}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {(offerClarity.main_offer_detected || hasOfferRewrite) && (
                <div className="rounded-xl border border-violet-500/20 bg-violet-500/5 p-4 space-y-3">
                  {offerClarity.main_offer_detected && (
                    <div>
                      <p className="text-xs font-semibold text-violet-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Quote className="h-3 w-3" /> Текущий оффер
                      </p>
                      <p className="text-sm text-white/60 italic">«{offerClarity.main_offer_detected}»</p>
                    </div>
                  )}
                  {hasOfferRewrite && (
                    <div>
                      <p className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-1.5 flex items-center gap-1.5">
                        <Wand2 className="h-3 w-3" /> Улучшенный оффер
                      </p>
                      <p className="text-sm font-medium text-white/80 bg-green-500/10 rounded-lg px-3 py-2 border border-green-500/20">
                        {offerClarity.offer_rewrite}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {hasCTAButtons && (
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">
                    Найденные CTA-кнопки
                  </h4>
                  <div className="space-y-2">
                    {ctaAnalysis.cta_buttons_found.map((btn, i) => (
                      <div key={i} className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-3 py-2.5">
                        <span className="text-sm font-medium text-white/70">«{btn.text}»</span>
                        <p className="text-xs text-white/40 mt-1">{btn.assessment}</p>
                        {btn.rewrite && (
                          <p className="text-xs font-medium text-green-400 mt-1.5 flex items-center gap-1">
                            <ArrowRight className="h-3 w-3 shrink-0" />
                            {btn.rewrite}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {hasPhrases && (
                <div className="grid grid-cols-1 gap-3">
                  {(contentQuality.strong_phrases_found?.length ?? 0) > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Сильные фразы</h4>
                      <ul className="space-y-1">
                        {contentQuality.strong_phrases_found!.map((phrase, i) => (
                          <li key={i} className="text-sm text-white/60 bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-1.5 italic">
                            «{phrase}»
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {(contentQuality.weak_phrases_found?.length ?? 0) > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-orange-400 uppercase tracking-wide mb-2">Слабые фразы</h4>
                      <ul className="space-y-1">
                        {contentQuality.weak_phrases_found!.map((phrase, i) => (
                          <li key={i} className="text-sm text-white/60 bg-orange-500/5 border border-orange-500/10 rounded-lg px-3 py-1.5 italic">
                            «{phrase}»
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {criticalList.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-red-400 uppercase tracking-wide mb-2">Критичные проблемы</h4>
                  <ul className="space-y-1.5">
                    {criticalList.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-red-300 bg-red-500/5 border border-red-500/10 rounded-lg px-3 py-2">
                        <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.findings?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-white/40 uppercase tracking-wide mb-2">Наблюдения</h4>
                  <ul className="space-y-1.5">
                    {data.findings.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/50">
                        <span className="text-white/20 mt-0.5">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {data.recommendations?.length > 0 && (
                <div>
                  <h4 className="text-xs font-semibold text-green-400 uppercase tracking-wide mb-2">Рекомендации</h4>
                  <ul className="space-y-1.5">
                    {data.recommendations.map((item, i) => (
                      <li key={i} className="flex gap-2 text-sm text-white/60 bg-green-500/5 border border-green-500/10 rounded-lg px-3 py-2">
                        <ArrowRight className="h-4 w-4 shrink-0 text-green-400 mt-0.5" />
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
