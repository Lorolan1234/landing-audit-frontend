"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Layers,
  ChevronDown,
  CheckCircle2,
  XCircle,
  Zap,
  Smartphone,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { UrlForm } from "./UrlForm";

const MOCK_BLOCKS = [
  { name: "Первый экран", score: 4, problems: 3, color: "text-red-400" },
  { name: "Блок преимуществ", score: 3, problems: 2, color: "text-red-400" },
  { name: "Социальные доказательства", score: 5, problems: 2, color: "text-amber-400" },
  { name: "Призыв к действию", score: 4, problems: 2, color: "text-red-400" },
  { name: "Тарифы и цены", score: 3, problems: 3, color: "text-red-400" },
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
    complexityColor: "bg-green-500/20 text-green-400",
  },
  {
    action: "Добавить сравнительную таблицу «без продукта / с продуктом» рядом с тарифами",
    effect: "Повышение понимания ценности и ускорение принятия решения",
    complexity: "Средняя",
    complexityColor: "bg-amber-500/20 text-amber-400",
  },
  {
    action: "Заменить текст CTA с общего «Оставить заявку» на ценностный «Рассчитать мою выгоду»",
    effect: "Увеличение кликабельности CTA",
    complexity: "Низкая",
    complexityColor: "bg-green-500/20 text-green-400",
  },
];

const MOCK_MISSING = [
  { label: "Критично", element: "Сравнение «без продукта / с продуктом»", color: "bg-red-500/10 border-red-500/20" },
  { label: "Важно", element: "Отзывы клиентов с конкретными результатами", color: "bg-amber-500/10 border-amber-500/20" },
  { label: "Важно", element: "FAQ / снятие основных возражений", color: "bg-amber-500/10 border-amber-500/20" },
];

export function ReportPreview() {
  return (
    <section className="py-16 sm:py-24 bg-[#0c0c11]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Не просто оценка —{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-violet-300">
              готовый план действий
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/65">
            Стратегическая диагностика, поблочный разбор с готовыми текстами,
            метрики скорости и приоритизированные рекомендации.
          </p>
        </motion.div>

        <motion.div
          className="mx-auto max-w-3xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] shadow-2xl overflow-hidden">
            {/* Шапка браузера */}
            <div className="bg-white/[0.03] border-b border-white/[0.06] px-6 py-4 flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500/60" />
                <div className="h-3 w-3 rounded-full bg-amber-500/60" />
                <div className="h-3 w-3 rounded-full bg-green-500/60" />
              </div>
              <div className="flex-1 mx-4">
                <div className="bg-white/[0.05] rounded-md border border-white/[0.08] px-3 py-1 text-xs text-white/55 max-w-xs">
                  conversionpulse.ru/audit · пример
                </div>
              </div>
            </div>

            <div className="p-6 space-y-5">
              {/* Скор */}
              <div className="flex items-center gap-5">
                <div className="flex flex-col items-center shrink-0">
                  <div className="relative h-20 w-20">
                    <svg className="h-20 w-20 -rotate-90" viewBox="0 0 80 80">
                      <circle cx="40" cy="40" r="34" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="6" />
                      <circle cx="40" cy="40" r="34" fill="none" stroke="#f59e0b" strokeWidth="6"
                        strokeDasharray={`${48 * 2.14} ${214 - 48 * 2.14}`} strokeLinecap="round" />
                    </svg>
                    <span className="absolute inset-0 flex items-center justify-center text-2xl font-bold text-white">48</span>
                  </div>
                  <span className="text-xs text-white/55 mt-1">из 100</span>
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-white">ваш-сайт.ru/landing</p>
                  <p className="text-xs text-amber-400 font-medium mt-1">Условно готов, нужны доработки</p>
                  <p className="text-xs text-white/55 mt-2">12 проблем · 5 блоков проверено · 195с</p>
                </div>
              </div>

              {/* Стратегическая проблема */}
              <div className="rounded-xl bg-amber-500/10 border border-amber-500/20 p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <div>
                    <p className="text-xs font-semibold text-amber-400 uppercase tracking-wide">Стратегическая проблема</p>
                    <p className="text-sm font-bold text-amber-300 mt-1">
                      Посетитель не понимает, какую выгоду он получит
                    </p>
                    <p className="text-xs text-amber-400/70 mt-1">
                      Страница рассказывает о продукте, но не объясняет, как он решит
                      проблему клиента. Это главная причина высокого показателя отказов.
                    </p>
                  </div>
                </div>
              </div>

              {/* Сильные / Слабые */}
              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-green-500/10 border border-green-500/20 p-3">
                  <p className="text-xs font-semibold text-green-400 mb-2 flex items-center gap-1">
                    <CheckCircle2 className="h-3.5 w-3.5" /> Сильные стороны
                  </p>
                  {MOCK_STRENGTHS.map((s, i) => (
                    <p key={i} className="text-xs text-white/70 mt-1 flex gap-1.5">
                      <span className="text-green-400 shrink-0">✓</span>
                      <span className="line-clamp-2">{s}</span>
                    </p>
                  ))}
                </div>
                <div className="rounded-xl bg-red-500/10 border border-red-500/20 p-3">
                  <p className="text-xs font-semibold text-red-400 mb-2 flex items-center gap-1">
                    <XCircle className="h-3.5 w-3.5" /> Слабые стороны
                  </p>
                  {MOCK_WEAKNESSES.slice(0, 2).map((w, i) => (
                    <p key={i} className="text-xs text-white/70 mt-1 flex gap-1.5">
                      <span className="text-red-400 shrink-0">✕</span>
                      <span className="line-clamp-2">{w}</span>
                    </p>
                  ))}
                </div>
              </div>

              {/* Топ-3 приоритета */}
              <div>
                <p className="text-xs font-semibold text-white/65 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5" /> Топ-3 приоритета
                </p>
                <div className="space-y-2">
                  {MOCK_PRIORITIES.map((p, i) => (
                    <div key={i} className="rounded-lg border border-indigo-500/20 bg-indigo-500/10 px-3 py-2">
                      <div className="flex gap-2">
                        <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-xs font-bold mt-0.5">
                          {i + 1}
                        </span>
                        <div className="min-w-0">
                          <p className="text-xs font-medium text-white/80 line-clamp-2">{p.action}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-white/65">{p.effect}</span>
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

              {/* Отсутствующие элементы */}
              <div>
                <p className="text-xs font-semibold text-white/65 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <AlertCircle className="h-3.5 w-3.5" /> Отсутствующие элементы
                </p>
                <div className="space-y-1.5">
                  {MOCK_MISSING.map((m, i) => (
                    <div key={i} className={`rounded-lg border px-3 py-2 ${m.color}`}>
                      <p className="text-xs text-white/60">
                        <span className="font-semibold text-white/80">{m.label}:</span> {m.element}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Поблочный разбор */}
              <div>
                <p className="text-xs font-semibold text-white/65 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Layers className="h-3.5 w-3.5" /> Поблочный разбор
                </p>
                <div className="space-y-1.5">
                  {MOCK_BLOCKS.map((block, idx) => (
                    <div key={block.name} className="flex items-center justify-between rounded-lg border border-white/[0.06] bg-white/[0.02] px-3 py-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-white/50 w-4">{idx + 1}</span>
                        <span className="text-sm font-medium text-white/80">{block.name}</span>
                        <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">
                          {block.problems} пробл.
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`text-base font-bold ${block.color}`}>
                          {block.score}<span className="text-xs text-white/50">/10</span>
                        </span>
                        <ChevronDown className="h-3.5 w-3.5 text-white/20" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Раскрытый блок */}
              <div className="rounded-xl border border-indigo-500/20 bg-indigo-500/5 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-indigo-500/10">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-white/50">1</span>
                    <span className="text-sm font-semibold text-white">Первый экран</span>
                    <span className="text-xs bg-red-500/20 text-red-400 px-1.5 py-0.5 rounded">3 пробл.</span>
                  </div>
                  <span className="text-base font-bold text-red-400">4<span className="text-xs text-white/50">/10</span></span>
                </div>
                <div className="px-4 py-4 space-y-3">
                  <div className="bg-white/[0.03] rounded-lg p-3 text-xs text-white/70 space-y-1">
                    <p><span className="text-white/50">Заголовок:</span> «Название вашего продукта»</p>
                    <p><span className="text-white/50">Подзаголовок:</span> «Описание функций и возможностей»</p>
                    <p><span className="text-white/50">CTA:</span> [Оставить заявку]</p>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-red-400 shrink-0 mt-0.5">✕</span>
                    <div>
                      <p className="text-sm font-semibold text-white/80">Заголовок описывает продукт, а не результат для клиента</p>
                      <p className="text-xs text-white/65 mt-0.5">
                        Посетитель из рекламы ищет решение своей проблемы, а не название продукта.
                      </p>
                    </div>
                  </div>
                  <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                    <p className="text-xs font-semibold text-green-400 mb-1">→ Готовый вариант заголовка:</p>
                    <p className="text-sm text-green-300 font-medium italic">
                      «[Результат для клиента] за [время] — без [главная боль]»
                    </p>
                    <p className="text-xs text-green-400/60 mt-1">Эффект: Снижение bounce rate, рост вовлечённости</p>
                  </div>
                  <div className="rounded-lg bg-green-500/10 border border-green-500/20 p-3">
                    <p className="text-xs font-semibold text-green-400 mb-1">→ CTA: заменить «Оставить заявку» на:</p>
                    <p className="text-sm text-green-300 font-medium italic">
                      «Рассчитать мою выгоду» или «Получить персональное предложение»
                    </p>
                    <p className="text-xs text-green-400/60 mt-1">Эффект: Снижение порога входа, рост конверсии CTA</p>
                  </div>
                </div>
              </div>

              {/* Скорость загрузки */}
              <div>
                <p className="text-xs font-semibold text-white/65 uppercase tracking-wide mb-2 flex items-center gap-1.5">
                  <Zap className="h-3.5 w-3.5" /> Скорость загрузки
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <Smartphone className="h-3.5 w-3.5 text-white/55" />
                      <span className="text-xs font-medium text-white/60">Mobile</span>
                      <span className="text-sm font-bold text-amber-400 ml-auto">Score 62</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-white/55">LCP</span><span className="text-red-400 font-medium">4.2 с</span></div>
                      <div className="flex justify-between"><span className="text-white/55">CLS</span><span className="text-green-400 font-medium">0.05</span></div>
                      <div className="flex justify-between"><span className="text-white/55">TBT</span><span className="text-amber-400 font-medium">320 мс</span></div>
                    </div>
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xs">🖥</span>
                      <span className="text-xs font-medium text-white/60">Desktop</span>
                      <span className="text-sm font-bold text-green-400 ml-auto">Score 89</span>
                    </div>
                    <div className="space-y-1 text-xs">
                      <div className="flex justify-between"><span className="text-white/55">LCP</span><span className="text-green-400 font-medium">1.2 с</span></div>
                      <div className="flex justify-between"><span className="text-white/55">CLS</span><span className="text-green-400 font-medium">0.01</span></div>
                      <div className="flex justify-between"><span className="text-white/55">TBT</span><span className="text-green-400 font-medium">150 мс</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Градиентное затемнение */}
              <div className="relative -mx-6 -mb-6 h-12">
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c11] via-[#0c0c11]/80 to-transparent" />
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
          <UrlForm id="preview-form" buttonLabel="Проверить свой сайт" className="mx-auto max-w-xl" />
        </motion.div>
      </div>
    </section>
  );
}
