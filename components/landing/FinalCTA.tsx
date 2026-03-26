"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Search, ArrowRight, Loader2 } from "lucide-react";
import { createAudit } from "@/lib/api";

export function FinalCTA() {
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
    <section className="relative overflow-hidden bg-gray-900 py-16 sm:py-24">
      {/* Фоновый декор */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-600/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 w-[400px] h-[400px] rounded-full bg-brand-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Заголовок */}
        <motion.h2
          className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          Каждый день без диагностики —{" "}
          <span className="text-brand-400">
            это деньги, потерянные на рекламе
          </span>
        </motion.h2>

        {/* Подзаголовок */}
        <motion.p
          className="mt-4 text-lg text-gray-400"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Первая проверка бесплатно. Результат через 2 минуты.
        </motion.p>

        {/* Форма */}
        <motion.form
          onSubmit={handleSubmit}
          className="mt-8 mx-auto max-w-xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
                <Search className="h-4 w-4 text-gray-500" />
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
                className={`w-full rounded-xl border bg-white/10 backdrop-blur-sm py-3.5 pl-10 pr-4 text-sm text-white placeholder-gray-500 shadow-sm transition-all focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent ${
                  error
                    ? "border-red-400 ring-1 ring-red-400"
                    : "border-gray-700 hover:border-gray-600"
                } disabled:opacity-60`}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:ring-offset-2 focus:ring-offset-gray-900 transition-all disabled:opacity-60 disabled:cursor-not-allowed shrink-0"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Запускаем...
                </>
              ) : (
                <>
                  Проверить мой лендинг
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </div>

          {/* Ошибка */}
          {error && (
            <p className="mt-2 text-sm text-red-400 text-left">{error}</p>
          )}
        </motion.form>

        {/* Микротекст */}
        <motion.p
          className="mt-4 text-xs text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          Без регистрации · Полный отчёт · Скачайте в PDF
        </motion.p>
      </div>
    </section>
  );
}
