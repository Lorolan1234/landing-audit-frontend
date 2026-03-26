"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import {
  ArrowRight,
  AlertTriangle,
  Layers,
  Search,
  Loader2,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Zap,
  Smartphone,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { createAudit } from "@/lib/api";

const MOCK_BLOCKS = [
  { name: "Первый экран", score: 4, problems: 3, color: "text-red-500" },
  { name: "Блок преимуществ", score: 3, problems: 2, color: "text-red-500" },
  { name: "Социальные доказательства", score: 5, problems: 2, color: "text-amber-500" },
  { name: "Призыв к действию", score: 4, problems: 2, color: "text-red-500" },
  { name: "Тарифы и цены", score: 3, problems: 3, color: "text-red-500" },
];

const MOCK_STRENGTHS = [
  "Понятная структура страницы с логичной последовательностью блоков",
  "Наличие конкретных цифр и примеров в описании продукта",
];

const MOCK_WEAKNESSES = [
  "Заголовок описывает продукт, а не результат для клиента",
  "CTA-кнопка не мотивирует к действию и не объясняет выгоду",
  "Нет сравнения «до/после» или «без продукта / с продуктом»",
];

const MOCK_PRIORITIES = [
  {
    action: "Переписать заголовок: вместо названия продукта — конкретная выгода с цифрой результата",
    effect: "Снижение показателя отказов на первом экране",
    complexity: "Низкая",
    complexityColor: "bg-green-100 text-green-700",
  },
  {
    action: "Добавить сравнительную таблицу «без продукта / с продуктом» рядом с тарифами",
    effect: "Повышение понимания ценности и ускорение принятия решения",
    complexity: "Средняя",
    complexityColor: "bg-amber-100 text-amber-700",
  },
  {
    action: "Заменить текст CTA с общего «Оставить заявку» на ценностный «Рассчитать мою выгоду»",
    effect: "Увеличение кликабельности CTA",
    complexity: "Низкая",
    complexityColor: "bg-green-100 text-green-700",
  },
];

const MOCK_MISSING = [
  { label: "Критично", element: "Сравнение «без продукта / с продуктом»", color: "bg-red-100 border-red-200" },
  { label: "Важно", element: "Отзывы клиентов с конкретными результатами", color: "bg-amber-100 border-amber-200" },
  { label: "Важно", element: "FAQ / снятие основных возражений", color: "bg-amber-100 border-amber-200" },
];

export function ReportPreview() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    let normalizedUrl = url.trim();
    if (!normalizedUrl) return;
    if (!normalizedUrl.startsWith("http")) {
      normalizedUrl = "https://" + normalizedUrl;
    }
    setLoading(true);
    try {
      const result = await createAudit(normalizedUrl);
      router.push(`/audit/${result.id}`);
    } catch {
      setLoading(false);
    }
  };

  return (
    <section className="py-16 sm:py-24 bg-gray-50/50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Не просто оценка —{" "}
            <span className="text-brand-600">готовый план действий</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Стратегическая диагностика, поблочный разбор с готовыми текстами, метрики скорости
            и приоритизированные рекомендации.
          </p>
        </motion.div>

        {/* Мокап отчёта */}
        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-gray-200 bg-white shadow-lg overflow-hidden">
            {/* Шапка браузера */}
            <div className="bg-gray-50 border-b border-gray-100 px-6 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-300" />
                <div className="h-3 w-3 rounded-full bg-amber-300" />
                <div className="h-3 w-3 rounded-full bg-green-300" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white rounded-md border border-gray-200 px-3 py-1 text-xs text-gray-400 max-w-xs">
                  conversionpulse.ru/audit/результат
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* ── Скор ── */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative h-20 w-20">
                    <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#f3f4f6" strokeWidth="6" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#f59e0b" strokeWidth="6"
                        strokeDasharray={`${48 * 2.14} ${214 - 48 * 2.14}`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-gray-900">48</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">из 100</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-gray-900">ваш-сайт.ru/landing</p>
                  <p className="text-xs text-amber-600 font-medium mt-1">Условно готов, нужны доработки</p>
                  <p className="text-xs text-gray-400 mt-2">12 проблем · 5 блоков проверено · 195с</p>
                </div>
              </div>

              {/* ── Стратегическая проблема ── */}
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-700 uppercase tracking-wide">Стратегическая проблема</p>
                    <p className="text-sm font-bold text-amber-900 mt-1">
                      Посетитель не понимает, какую выгоду он получит
                    </p>
                    <p className="text-xs text-amber-700 mt-1">
                      Страница рассказывает о продукте, но не объясняет, как он решит
                      проблему клиента. Это главная причина высокого показателя отказов.
                    </p>
                  </div>
                </div>
              </div>

              {/* ── Сильные / Слабые ── */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-50 border border-green-100 p-3">
                  <p className="text-xs font-semibold text-green-700 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Сильные стороны
                  </p>
                  {MOCK_STRENGTHS.map((s, i) => (
                    <p key={i} className="text-xs text-gray-600 mt-1 flex gap-1.5">
                      <span className="text-green-400 shrink-0">✓</span>
                      <span className="line-clamp-2">{s}</span>
                    </p>
                  ))}
                </div>
                <div className="rounded-xl bg-red-50 border border-red-100 p-3">
                  <p className="text-xs font-semibold text-red-700 mb-2 flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5" /> Слабые стороны
                  </p>
                  {MOCK_WEAKNESSES.slice(0, 2).map((w, i) => (
                    <p key={i} className="text-xs text-gray-600 mt-1 flex gap-1.5">
                      <span className="text-red-400 shrink-0">✕</span>
                      <span className="line-clamp-2">{w}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* ── Топ-3 приоритета ── */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" /> Топ-3 приоритета
                </p>
                <div className="space-y-2">
                  {MOCK_PRIORITIES.map((p, i) => (
                    <div key={i} className="rounded-lg border border-blue-100 bg-blue-50/60 px-3 py-2">
                      <div className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-600 text-white text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-gray-800 line-clamp-2">{p.action}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-500">{p.effect}</span>
                            <span className={`text-xs font-medium px-1.5 py-0.5 rounded-full ${p.complexityColor}`}>
                              {p.complexity}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Отсутствующие элементы ── */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" /> Отсутствующие элементы
                </p>
                <div className="space-y-1.5">
                  {MOCK_MISSING.map((m, i) => (
                    <div key={i} className={`rounded-lg border px-3 py-2 ${m.color}`}>
                      <p className="text-xs text-gray-700">
                        <span className="font-semibold">{m.label}:</span> {m.element}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Поблочный разбор ── */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Поблочный разбор
                </p>
                <div className="space-y-1.5">
                  {MOCK_BLOCKS.map((block, idx) => (
                    <div key={block.name}
                      className="flex items-center justify-between rounded-lg border border-gray-100 px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400 w-4">{idx + 1}</span>
                        <span className="text-sm font-medium text-gray-800">{block.name}</span>
                        <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">
                          {block.problems} пробл.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${block.color}`}>
                          {block.score}<span className="text-xs text-gray-400">/10</span>
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 text-gray-300" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Раскрытый блок с рекомендацией ── */}
              <div className="rounded-xl border border-brand-200 bg-brand-50/40 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-brand-100">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-gray-400">1</span>
                    <span className="text-sm font-semibold text-gray-900">Первый экран</span>
                    <span className="text-xs bg-red-100 text-red-600 px-1.5 py-0.5 rounded">3 пробл.</span>
                  </div>
                  <span className="text-base font-bold text-red-500">4<span className="text-xs text-gray-400">/10</span></span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div className="bg-gray-50 rounded-lg p-3 text-xs text-gray-600 space-y-1">
                    <p><span className="text-gray-400">Заголовок:</span> «Название вашего продукта»</p>
                    <p><span className="text-gray-400">Подзаголовок:</span> «Описание функций и возможностей»</p>
                    <p><span className="text-gray-400">CTA:</span> [Оставить заявку]</p>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">Заголовок описывает продукт, а не результат для клиента</p>
                      <p className="text-xs text-gray-500 mt-0.5">
                        Посетитель из рекламы ищет решение своей проблемы, а не название продукта.
                        Заголовок должен отвечать на вопрос «что я получу», а не «как это называется».
                      </p>
                    </div>
                  </div>

                  <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                    <p className="text-xs font-semibold text-green-700 mb-1">→ Готовый вариант заголовка:</p>
                    <p className="text-sm text-green-800 font-medium italic">
                      «[Результат для клиента] за [время] — без [главная боль]»
                    </p>
                    <p className="text-xs text-green-600 mt-1">Эффект: Снижение bounce rate, рост вовлечённости</p>
                  </div>

                  <div className="rounded-lg bg-green-50 border border-green-200 p-3">
                    <p className="text-xs font-semibold text-green-700 mb-1">→ CTA: заменить «Оставить заявку» на:</p>
                    <p className="text-sm text-green-800 font-medium italic">
                      «Рассчитать мою выгоду» или «Получить персональное предложение»
                    </p>
                    <p className="text-xs text-green-600 mt-1">Эффект: Снижение порога входа, рост конверсии CTA</p>
                  </div>
                </div>
              </div>

              {/* ── Скорость загрузки ── */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> Скорость загрузки
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="h-3.5 w-3.5 text-gray-400" />
                      <span className="text-xs font-medium text-gray-700">Mobile</span>
                      <span className="text-sm font-bold text-amber-600 ml-auto">Score 62</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">LCP</span>
                        <span className="text-red-600 font-medium">4.2 с</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CLS</span>
                        <span className="text-green-600 font-medium">0.05</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">TBT</span>
                        <span className="text-amber-600 font-medium">320 мс</span>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-gray-100 p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">🖥</span>
                      <span className="text-xs font-medium text-gray-700">Desktop</span>
                      <span className="text-sm font-bold text-green-600 ml-auto">Score 89</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between">
                        <span className="text-gray-500">LCP</span>
                        <span className="text-green-600 font-medium">1.2 с</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">CLS</span>
                        <span className="text-green-600 font-medium">0.01</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-500">TBT</span>
                        <span className="text-green-600 font-medium">150 мс</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Градиентное затемнение */}
              <div className="relative -mx-6 -mb-6 h-12">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-transparent" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <form onSubmit={handleSubmit} className="inline-flex flex-col sm:flex-row gap-3 mx-auto max-w-md">
            <div className="relative flex-1">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://ваш-сайт.ru"
                disabled={loading}
                className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 shadow-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent disabled:opacity-60"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 transition-all disabled:opacity-60 shrink-0"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <>
                  Проверить свой сайт
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
}