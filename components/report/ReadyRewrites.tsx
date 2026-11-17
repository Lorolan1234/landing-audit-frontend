"use client";

import { Check, Copy, X } from "lucide-react";
import { toast } from "sonner";
import type { AIAnalysisResult } from "@/types/audit";
import { quoted } from "@/lib/utils";

export interface Rewrite {
  label: string;
  before?: string;
  after: string;
  note?: string;
}

export function collectRewrites(ai: AIAnalysisResult): Rewrite[] {
  const out: Rewrite[] = [];
  const fs = ai.first_screen;
  if (fs?.headline_rewrite) {
    out.push({ label: "Заголовок первого экрана", before: fs.headline_quote, after: fs.headline_rewrite, note: fs.headline_assessment });
  }
  const offer = ai.offer_clarity;
  if (offer?.offer_rewrite) {
    out.push({ label: "Главный оффер", before: offer.main_offer_detected, after: offer.offer_rewrite });
  }
  for (const b of ai.cta_analysis?.cta_buttons_found ?? []) {
    if (b.rewrite && b.rewrite.trim() !== b.text?.trim()) {
      out.push({ label: "Текст кнопки", before: b.text, after: b.rewrite, note: b.assessment });
    }
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

export function ReadyRewrites({ items }: { items: Rewrite[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((r, i) => (
        <div key={i} className="flex flex-col rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-white/50">{r.label}</p>
          {r.before && (
            <div className="mt-3 flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15">
                <X className="h-3 w-3 text-red-400" aria-hidden />
              </span>
              <p className="text-sm text-white/55 line-through decoration-red-400/40">{quoted(r.before)}</p>
            </div>
          )}
          <div className="mt-3 flex items-start gap-2.5">
            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
              <Check className="h-3 w-3 text-emerald-400" aria-hidden />
            </span>
            <p className="text-base font-semibold leading-snug text-white">{quoted(r.after)}</p>
          </div>
          {r.note && <p className="mt-3 text-sm leading-relaxed text-white/60">{r.note}</p>}
          <button
            onClick={() => copy(quoted(r.after).slice(1, -1))}
            className="mt-4 inline-flex w-fit cursor-pointer items-center gap-1.5 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/75 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Copy className="h-3.5 w-3.5" aria-hidden />
            Скопировать
          </button>
        </div>
      ))}
    </div>
  );
}
