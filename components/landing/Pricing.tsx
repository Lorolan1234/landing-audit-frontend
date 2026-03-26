"use client";

import { motion } from "framer-motion";
import { Check, X, Star, ArrowRight } from "lucide-react";

interface PlanFeature {
  text: string;
  included: boolean;
}

interface Plan {
  name: string;
  badge?: string;
  price: string;
  period: string;
  description: string;
  cta: string;
  ctaStyle: "primary" | "secondary" | "outline";
  features: PlanFeature[];
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    name: "Free",
    price: "0 ₽",
    period: "",
    description: "Для быстрой проверки перед запуском рекламы",
    cta: "Начать бесплатно",
    ctaStyle: "secondary",
    features: [
      { text: "3 проверки в месяц", included: true },
      { text: "Индекс готовности 0–100", included: true },
      { text: "Топ-3 критичных проблемы", included: true },
      { text: "Стратегическая диагностика", included: true },
      { text: "Полный поблочный разбор", included: false },
      { text: "PDF-экспорт", included: false },
      { text: "История аудитов", included: false },
    ],
  },
  {
    name: "Pro",
    badge: "Популярный",
    price: "1 490 ₽",
    period: "/мес",
    description: "Полная диагностика для маркетологов и предпринимателей",
    cta: "14 дней бесплатно",
    ctaStyle: "primary",
    highlighted: true,
    features: [
      { text: "Безлимит проверок", included: true },
      { text: "Индекс готовности 0–100", included: true },
      { text: "Топ-3 критичных проблемы", included: true },
      { text: "Стратегическая диагностика", included: true },
      { text: "Полный поблочный разбор", included: true },
      { text: "PDF-экспорт", included: true },
      { text: "История аудитов", included: true },
    ],
  },
  {
    name: "Agency",
    price: "4 990 ₽",
    period: "/мес",
    description: "Для агентств и команд с клиентскими проектами",
    cta: "Связаться с нами",
    ctaStyle: "outline",
    features: [
      { text: "Безлимит проверок", included: true },
      { text: "Всё из тарифа Pro", included: true },
      { text: "Мониторинг изменений", included: true },
      { text: "API-доступ", included: true },
      { text: "Белый лейбл (ваш логотип)", included: true },
      { text: "Приоритетная поддержка", included: true },
      { text: "Командный доступ", included: true },
    ],
  },
];

const CTA_STYLES = {
  primary:
    "bg-brand-600 text-white hover:bg-brand-700 shadow-sm",
  secondary:
    "bg-gray-900 text-white hover:bg-gray-800 shadow-sm",
  outline:
    "bg-white text-gray-900 ring-1 ring-gray-200 hover:bg-gray-50",
};

export function Pricing() {
  const scrollToForm = () => {
    const el = document.querySelector("#hero-form");
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="pricing" className="py-16 sm:py-24 bg-gray-50/50">
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
            Тарифы
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Начните бесплатно. Масштабируйте когда нужно.
          </p>
        </motion.div>

        {/* Карточки тарифов */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={`relative rounded-2xl border p-6 lg:p-8 ${
                plan.highlighted
                  ? "border-brand-300 bg-white shadow-lg ring-1 ring-brand-200"
                  : "border-gray-200 bg-white shadow-sm"
              }`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Бейдж */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 rounded-full bg-brand-600 px-3 py-1 text-xs font-semibold text-white shadow-sm">
                    <Star className="h-3 w-3" />
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Название */}
              <h3 className="text-lg font-bold text-gray-900">{plan.name}</h3>
              <p className="mt-1 text-sm text-gray-500">{plan.description}</p>

              {/* Цена */}
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-gray-900">{plan.price}</span>
                {plan.period && (
                  <span className="text-sm text-gray-500">{plan.period}</span>
                )}
              </div>

              {/* CTA */}
              <button
                onClick={scrollToForm}
                className={`mt-6 w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-all ${
                  CTA_STYLES[plan.ctaStyle]
                }`}
              >
                {plan.cta}
                <ArrowRight className="h-4 w-4" />
              </button>

              {/* Разделитель */}
              <div className="mt-6 border-t border-gray-100 pt-6">
                <ul className="space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature.text} className="flex items-start gap-3">
                      {feature.included ? (
                        <Check className="h-4 w-4 text-brand-600 mt-0.5 shrink-0" />
                      ) : (
                        <X className="h-4 w-4 text-gray-300 mt-0.5 shrink-0" />
                      )}
                      <span
                        className={`text-sm ${
                          feature.included ? "text-gray-700" : "text-gray-400"
                        }`}
                      >
                        {feature.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
