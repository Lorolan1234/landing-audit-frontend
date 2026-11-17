import { TrendingUp } from "lucide-react";
import type { PriorityItem } from "@/types/audit";
import { complexityLevel } from "./score";
import { cn } from "@/lib/utils";

function Dots({ level, label }: { level: number; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs text-white/55">
      Сложность
      <span className="flex gap-1" role="img" aria-label={`Сложность: ${label}`}>
        {[1, 2, 3].map((i) => (
          <span
            key={i}
            className={cn("h-1.5 w-1.5 rounded-full", i <= level ? "bg-indigo-300" : "bg-white/15")}
          />
        ))}
      </span>
    </span>
  );
}

export function StartHere({ items }: { items: (PriorityItem | string)[] }) {
  const list = items
    .map((it) => (typeof it === "string" ? { action: it, expected_effect: "" } : it))
    .filter((it) => it.action);

  return (
    <ol className="space-y-3">
      {list.map((it, i) => {
        const level = complexityLevel(it.complexity);
        return (
          <li key={i} className="flex gap-4 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-indigo-500/15 text-sm font-bold text-indigo-200 ring-1 ring-indigo-400/25">
              {i + 1}
            </span>
            <div className="min-w-0 flex-1">
              <p className="text-base font-semibold leading-snug text-white">{it.action}</p>
              {it.expected_effect && (
                <p className="mt-2 flex gap-2 text-sm leading-relaxed text-white/65">
                  <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                  {it.expected_effect}
                </p>
              )}
              {level && <div className="mt-3"><Dots level={level} label={it.complexity ?? ""} /></div>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
