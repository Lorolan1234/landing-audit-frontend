"use client";

import { useState } from "react";
import { Check, Copy, X } from "lucide-react";
import { toast } from "sonner";
import type { AIAnalysisResult, TextVariant } from "@/types/audit";
import { cn, quoted } from "@/lib/utils";

export interface Rewrite {
  label: string;
  before?: string;
  /** Варианты нового текста, лучший — первым */
  variants: TextVariant[];
  note?: string;
}

const clean = (s?: string) => (s ?? "").trim().replace(/^[«"“„']+|[»"”']+$/g, "").trim().toLowerCase();

/** Варианты из нового поля; для старых отчётов — единственный rewrite. */
function pickVariants(variants: TextVariant[] | undefined, fallback: string | undefined, current?: string): TextVariant[] {
  const seen = new Set<string>([clean(current)]);
  const out: TextVariant[] = [];
  const source = variants?.length ? variants : fallback ? [{ text: fallback }] : [];
  for (const v of source) {
    const key = clean(v?.text);
    if (!key || seen.has(key)) continue;
    seen.add(key);
    out.push({ text: v.text.trim(), angle: v.angle?.trim() || undefined });
  }
  return out;
}

export function collectRewrites(ai: AIAnalysisResult): Rewrite[] {
  const out: Rewrite[] = [];
  const add = (label: string, before: string | undefined, variants: TextVariant[], note?: string) => {
    if (variants.length) out.push({ label, before, variants, note });
  };
  const fs = ai.first_screen;
  if (fs) {
    add("Заголовок первого экрана", fs.headline_quote, pickVariants(fs.headline_variants, fs.headline_rewrite, fs.headline_quote), fs.headline_assessment);
  }
  const offer = ai.offer_clarity;
  if (offer) {
    add("Главный оффер", offer.main_offer_detected, pickVariants(offer.offer_variants, offer.offer_rewrite, offer.main_offer_detected));
  }
  for (const b of ai.cta_analysis?.cta_buttons_found ?? []) {
    add("Текст кнопки", b.text, pickVariants(b.variants, b.rewrite ?? undefined, b.text), b.assessment);
  }
  return out;
}

async function copy(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    toast.success("Текст скопирован");
  } catch {
    toast.error("Не удалось скопировать");
  }
}

function RewriteCard({ r }: { r: Rewrite }) {
  const [active, setActive] = useState(0);
  const current = r.variants[Math.min(active, r.variants.length - 1)];
  const multi = r.variants.length > 1;

  return (
    <div className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{r.label}</p>
      {r.before && (
        <div className="mt-3 flex items-start gap-2.5">
          <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15">
            <X className="h-3 w-3 text-red-400" aria-hidden />
          </span>
          <p className="text-sm text-white/55 line-through decoration-red-400/40">{quoted(r.before)}</p>
        </div>
      )}

      {multi && (
        <div role="tablist" aria-label={`Варианты: ${r.label}`} className="mt-4 flex flex-wrap gap-1.5">
          {r.variants.map((v, i) => (
            <button
              key={i}
              role="tab"
              aria-selected={i === active}
              onClick={() => setActive(i)}
              className={cn(
                "cursor-pointer rounded-full border px-2.5 py-1 text-xs font-medium transition-colors",
                i === active
                  ? "border-indigo-400/50 bg-indigo-500/15 text-indigo-200"
                  : "border-white/10 text-white/55 hover:border-white/20 hover:text-white/80",
              )}
            >
              {v.angle || `Вариант ${i + 1}`}
            </button>
          ))}
        </div>
      )}

      <div className="mt-3 flex items-start gap-2.5">
        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
          <Check className="h-3 w-3 text-emerald-400" aria-hidden />
        </span>
        <p className="text-base font-semibold leading-snug text-white" aria-live="polite">
          {quoted(current.text)}
        </p>
      </div>
      {multi && (
        <p className="mt-2 pl-[30px] text-xs text-white/40">
          Вариант {active + 1} из {r.variants.length}
          {active === 0 ? " · рекомендуем" : ""}
        </p>
      )}

      {r.note && <p className="mt-3 text-sm leading-relaxed text-white/60">{r.note}</p>}
      <button
        onClick={() => copy(quoted(current.text).slice(1, -1))}
        className="mt-4 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
      >
        <Copy className="h-3.5 w-3.5" aria-hidden />
        Скопировать
      </button>
    </div>
  );
}

export function ReadyRewrites({ items }: { items: Rewrite[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((r, i) => (
        <RewriteCard key={i} r={r} />
      ))}
    </div>
  );
}
