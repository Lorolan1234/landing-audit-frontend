import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Цвет для оценки категории (0-10). */
export function getScoreColor(score: number): string {
  if (score >= 8) return "text-green-500";
  if (score >= 6) return "text-amber-500";
  if (score >= 4) return "text-orange-500";
  return "text-red-500";
}

/** Цвет фона для оценки категории (0-10). */
export function getScoreBg(score: number): string {
  if (score >= 8) return "bg-green-50 border-green-200";
  if (score >= 6) return "bg-amber-50 border-amber-200";
  if (score >= 4) return "bg-orange-50 border-orange-200";
  return "bg-red-50 border-red-200";
}

/** Цвет для индекса готовности (0-100). */
export function getIndexColor(index: number): string {
  if (index >= 86) return "text-green-500";
  if (index >= 71) return "text-lime-500";
  if (index >= 51) return "text-amber-500";
  if (index >= 31) return "text-orange-500";
  return "text-red-500";
}

/** HEX-цвет для recharts-графика. */
export function getScoreHex(score: number): string {
  if (score >= 8) return "#22c55e";
  if (score >= 6) return "#f59e0b";
  if (score >= 4) return "#f97316";
  return "#ef4444";
}

/** Форматирует дату на русском. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("ru-RU", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

/** Сокращает URL для отображения (убирает протокол, обрезает). */
export function shortUrl(url: string, maxLength = 50): string {
  const clean = url.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return clean.length > maxLength ? clean.slice(0, maxLength) + "…" : clean;
}

/** Форматирует время обработки. */
export function formatDuration(seconds: number | null): string {
  if (!seconds) return "—";
  if (seconds < 60) return `${Math.round(seconds)} сек`;
  return `${Math.floor(seconds / 60)} мин ${Math.round(seconds % 60)} сек`;
}
