"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
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
      setError(err instanceof Error ? err.message : "Не удалось запустить проверку");
      setLoading(false);
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-white pt-28 pb-16 sm:pt-36 sm:pb-24">
      {/* Фоновый декор */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-brand-100/40 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-blue-100/30 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Бейдж */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-100/80 px-4 py-1.5 text-sm font-medium text-brand-700 ring-1 ring-brand-200/50">
            <Search className="h-3.5 w-3.5" />
            Диагностика конверсии за 2 минуты
          </span>
        </motion.div>

        {/* Заголовок */}
        <motion.h1
          className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-gray-900 leading-[1.1]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Узнайте, почему ваш сайт{" "}
          <span className="text-brand-600">не приносит конверсии</span>
        </motion.h1>

        {/* Подзаголовок */}
        <motion.p
          className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          ConversionPulse показывает конкретные проблемы вашей посадочной страницы
          и даёт готовые правки с приоритетами — от критичных до косметических.
        </motion.p>

        {/* Форма */}
        <motion.form
          id="hero-form"
          onSubmit={handleSubmit}
          className="mt-10 mx-auto max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-gray-400" />
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
                className={`w-full rounded-xl border bg-white py-3.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  error
                    ? "border-red-300 ring-1 ring-red-300"
                    : "border-gray-200 hover:border-gray-300"
                } disabled:opacity-60`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Запускаем...
                </>
              ) : (
                <>
                  Проверить бесплатно
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Ошибка */}
          {error && (
            <p className="mt-2 text-sm text-red-600 text-left">{error}</p>
          )}

          {/* Микротекст */}
          <p className="mt-3 text-xs text-gray-400">
            Первая проверка бесплатно · Без регистрации · Отчёт за 2 минуты
          </p>
        </motion.form>
      </div>
    </section>
  );
}
