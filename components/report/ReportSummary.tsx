"use client";

import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import type { AIAnalysisResult, ScoredCategory } from "@/types/audit";
import { CATEGORY_META } from "@/types/audit";
import { tone10, tone100 } from "./score";
import { cn, stripLeadingSymbols } from "@/lib/utils";

const R = 52;
const CIRC = 2 * Math.PI * R;

function ScoreRing({ index, label }: { index: number; label: string }) {
  const reduce = useReducedMotion();
  const tone = tone100(index);
  return (
    <div className="flex flex-col items-center">
      <div className="relative h-36 w-36">
        <svg viewBox="0 0 120 120" className="h-36 w-36 -rotate-90" aria-hidden>
          <circle cx="60" cy="60" r={R} fill="none" stroke="rgba(255,255,255,0.07)" strokeWidth="10" />
          <motion.circle
            cx="60" cy="60" r={R} fill="none" stroke={tone.hex} strokeWidth="10" strokeLinecap="round"
            strokeDasharray={CIRC}
            initial={reduce ? false : { strokeDashoffset: CIRC }}
            animate={{ strokeDashoffset: CIRC * (1 - index / 100) }}
            transition={{ duration: 1.1, ease: "easeOut" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className={cn("text-4xl font-extrabold tabular-nums", tone.text)}>{index}</span>
          <span className="text-xs text-white/50">из 100</span>
        </div>
      </div>
      {label && <p className="mt-2 max-w-[11rem] text-center text-sm font-medium text-white/80">{stripLeadingSymbols(label)}</p>}
    </div>
  );
}

function CategoryTile({ id, data }: { id: ScoredCategory; data: { score: number | null; verdict: string } }) {
  const meta = CATEGORY_META[id];
  const tone = tone10(data.score);
  const go = () =>
    (document.getElementById(`cat-${id}`) ?? document.getElementById("blocks"))?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  return (
    <button
      onClick={go}
      className="group cursor-pointer rounded-xl p-3 text-left transition-colors hover:bg-white/[0.04] focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60"
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-sm font-medium text-white/90">{meta.title}</span>
        {data.score == null ? (
          <span className="text-xs text-white/40">нет данных</span>
        ) : (
          <span className={cn("text-lg font-bold tabular-nums", tone.text)}>
            {data.score}
            <span className="text-xs font-normal text-white/40">/10</span>
          </span>
        )}
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/[0.07]">
        <div className={cn("h-1.5 rounded-full", tone.bar)} style={{ width: `${(data.score ?? 0) * 10}%` }} />
      </div>
      {data.verdict && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/60 group-hover:text-white/75">
          {data.verdict}
        </p>
      )}
    </button>
  );
}

export function ReportSummary({
  ai,
  index,
  category,
  criticalCount,
}: {
  ai: AIAnalysisResult;
  index: number;
  category: string;
  criticalCount: number;
}) {
  const headline = ai.strategic_diagnosis?.headline;
  const conclusion = ai.overall_summary?.main_conclusion;
  const keys = (Object.keys(CATEGORY_META) as ScoredCategory[]).filter((k) => ai[k]);

  return (
    <section id="summary" className="scroll-mt-24 rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-white/[0.015] p-5 sm:p-8">
      <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-start sm:gap-8">
        <ScoreRing index={index} label={category} />
        <div className="min-w-0 flex-1 text-left">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Главный вывод</p>
          {headline && (
            <h2 className="mt-2 text-xl font-bold leading-snug text-white text-balance sm:text-2xl">{headline}</h2>
          )}
          {conclusion && <p className="mt-3 text-base leading-relaxed text-white/70">{conclusion}</p>}
          {criticalCount > 0 && (
            <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-red-500/10 px-3 py-1 text-sm text-red-300 ring-1 ring-red-400/20">
              <AlertTriangle className="h-4 w-4" aria-hidden />
              Критичных проблем: {criticalCount}
            </p>
          )}
        </div>
      </div>

      {keys.length > 0 && (
        <div className="mt-8 grid gap-1 border-t border-white/[0.07] pt-6 sm:grid-cols-2 lg:grid-cols-3">
          {keys.map((k) => (
            <CategoryTile key={k} id={k} data={ai[k] as { score: number | null; verdict: string }} />
          ))}
        </div>
      )}
    </section>
  );
}
