"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const QUESTIONS = [
  {
    question: "Чем ConversionPulse отличается от Google PageSpeed?",
    answer:
      "PageSpeed проверяет техническую скорость загрузки. ConversionPulse анализирует конверсионные элементы страницы: оффер, доверие, структуру воронки, CTA — то, что непосредственно влияет на количество заявок с рекламы. Мы также проверяем скорость, но это лишь одна из 15+ категорий анализа.",
  },
  {
    question: "Подходит ли для интернет-магазинов, а не только лендингов?",
    answer:
      "Да. Система анализирует любую посадочную страницу, на которую вы ведёте рекламный трафик — лендинг, карточку товара, страницу услуги, подписочную страницу. Анализ автоматически адаптируется под тип бизнеса.",
  },
  {
    question: "Насколько можно доверять рекомендациям?",
    answer:
      "Методология основана на принципах CRO (Conversion Rate Optimization) и проверена на реальных аудитах. Каждая рекомендация содержит готовый текст замены и объяснение, почему это улучшит конверсию. Финальное решение всегда за вами и вашим маркетологом.",
  },
  {
    question: "Мои данные в безопасности?",
    answer:
      "Мы анализируем только публично доступную информацию на вашей странице — то же, что видит любой посетитель. Результаты аудита доступны только вам. Мы не передаём данные третьим лицам.",
  },
  {
    question: "Как долго длится анализ?",
    answer:
      "Полная диагностика занимает около 2–3 минут. За это время система анализирует контент, структуру блоков, скорость загрузки, мобильную версию и делает скриншоты на разных устройствах.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-gray-900 sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm text-gray-600 leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            Частые вопросы
          </h2>
        </motion.div>

        {/* Аккордеон */}
        <motion.div
          className="rounded-2xl border border-gray-200 bg-white px-6 shadow-sm"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {QUESTIONS.map((q) => (
            <FAQItem key={q.question} question={q.question} answer={q.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
