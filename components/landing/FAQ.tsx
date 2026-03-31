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
      "Полная диагностика занимает 3–5 минут. За это время система анализирует контент, структуру блоков, скорость загрузки и мобильную версию.",
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-4 py-5 text-left"
      >
        <span className="text-sm font-semibold text-white/80 sm:text-base">
          {question}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-white/25 transition-transform duration-200 ${
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
            <p className="pb-5 text-sm text-white/40 leading-relaxed">
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
    <section className="py-16 sm:py-24 bg-[#030303]">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Частые вопросы
          </h2>
        </motion.div>

        <motion.div
          className="rounded-2xl border border-white/[0.08] bg-white/[0.02] px-6"
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
