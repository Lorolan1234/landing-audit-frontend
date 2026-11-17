export function tone10(score: number | null | undefined) {
  if (score == null) return { text: "text-white/40", bar: "bg-white/20", hex: "rgba(255,255,255,0.2)" };
  if (score >= 8) return { text: "text-emerald-400", bar: "bg-emerald-400", hex: "#34d399" };
  if (score >= 6) return { text: "text-lime-400", bar: "bg-lime-400", hex: "#a3e635" };
  if (score >= 4) return { text: "text-amber-400", bar: "bg-amber-400", hex: "#fbbf24" };
  return { text: "text-red-400", bar: "bg-red-400", hex: "#f87171" };
}

export function tone100(index: number) {
  return tone10(index / 10);
}

const COMPLEXITY_LEVEL: Record<string, number> = { низкая: 1, средняя: 2, высокая: 3 };

export function complexityLevel(value?: string): number | null {
  if (!value) return null;
  return COMPLEXITY_LEVEL[value.trim().toLowerCase()] ?? null;
}
