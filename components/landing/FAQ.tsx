"use client";

import { useState } from "react";
import { motion } from "framer-motion";
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
      "Обычно 2–3 минуты. За это время система анализирует контент, структуру блоков, скорость загрузки и мобильную версию.",
  },
  {
    question: "Сколько это стоит?",
    answer:
      "Первая проверка бесплатная: оценка, главная проблема и топ-3 правки. Полный поблочный разбор с текстами замены и PDF — в платных тарифах, условия выше в разделе «Тарифы».",
  },
  {
    question: "Что, если отчёт не поможет?",
    answer:
      "Если в платном отчёте не окажется ни одной полезной для вас правки — напишите нам в течение 14 дней, и мы вернём деньги.",
  },
];

function FAQItem({ id, question, answer }: { id: string; question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-white/[0.06] last:border-0">
      <h3>
        <button
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-controls={id}
          className="flex w-full cursor-pointer items-start justify-between gap-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400/60 rounded-md"
        >
          <span className="text-sm font-semibold text-white/90 sm:text-base">
            {question}
          </span>
          <ChevronDown
            aria-hidden
            className={`h-5 w-5 shrink-0 text-white/50 transition-transform duration-200 ${
              open ? "rotate-180" : ""
            }`}
          />
        </button>
      </h3>
      {/* Ответ всегда в разметке: его видят поисковики и анализаторы */}
      <div
        id={id}
        className={`grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none ${
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <p className="pb-5 text-sm text-white/70 leading-relaxed">{answer}</p>
        </div>
      </div>
    </div>
  );
}

export function FAQ() {
  return (
    <section id="faq" className="py-16 sm:py-24 bg-[#07070a]">
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
          {QUESTIONS.map((q, i) => (
            <FAQItem key={q.question} id={`faq-${i}`} question={q.question} answer={q.answer} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
