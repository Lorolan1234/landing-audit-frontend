"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { HeroGeometric } from "@/components/ui/shape-landing-hero";
import { createAudit } from "@/lib/api";

export function Hero() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let normalizedUrl = url.trim();
    if (!normalizedUrl) {
      setError("Введите URL сайта");
      return;
    }
    if (!normalizedUrl.startsWith("http")) {
      normalizedUrl = "https://" + normalizedUrl;
    }
    try {
      new URL(normalizedUrl);
    } catch {
      setError("Введите корректный URL");
      return;
    }

    setLoading(true);
    try {
      const result = await createAudit(normalizedUrl);
      router.push(`/audit/${result.id}`);
    } catch (err: unknown) {
      setError(
        err instanceof Error ? err.message : "Не удалось запустить проверку"
      );
      setLoading(false);
    }
  };

  return (
    <HeroGeometric
      badge="Не просто аудит — готовый план правок"
      title1="Узнайте, почему ваш сайт"
      title2="не приносит конверсии"
      subtitle="Вставьте URL — получите конкретные рекомендации с готовыми текстами и приоритетами. Без воды и абстрактных советов."
    >
      {/* Форма аудита */}
      <form
        id="hero-form"
        onSubmit={handleSubmit}
        className="mx-auto max-w-xl mt-4"
      >
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
              <Search className="h-4 w-4 text-white/30" />
            </div>
            <input
              type="text"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                setError("");
              }}
              placeholder="https://example.com"
              disabled={loading}
              className={`w-full rounded-xl border bg-white/[0.05] backdrop-blur-sm py-3.5 pl-10 pr-4 text-sm text-white placeholder-white/30 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-transparent ${
                error
                  ? "border-red-400/50 ring-1 ring-red-400/50"
                  : "border-white/[0.1] hover:border-white/[0.2]"
              } disabled:opacity-60`}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-[#030303] transition-all disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Анализируем...
              </>
            ) : (
              <>
                Проверить бесплатно
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>
        </div>

        {error && (
          <p className="mt-2 text-sm text-red-400 text-left">{error}</p>
        )}

        <p className="mt-4 text-xs text-white/25">
          Первая проверка бесплатно · Без регистрации · Отчёт за 3–5 минут
        </p>
      </form>
    </HeroGeometric>
  );
}
