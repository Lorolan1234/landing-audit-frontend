"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Building2, Code2 } from "lucide-react";

const PERSONAS = [
  {
    icon: <User className="h-6 w-6" />,
    title: "Маркетолог",
    description:
      "Проверяешь лендинг перед запуском рекламы. Экономишь бюджет клиента и своё время на ручной аудит.",
    color: "text-brand-600",
    bg: "bg-brand-50",
    ring: "ring-brand-100",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Предприниматель",
    description:
      "Понимаешь, почему реклама не окупается, без глубоких технических знаний. Получаешь конкретный план действий.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-100",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Агентство",
    description:
      "Включаешь отчёт ConversionPulse в аудит для клиента. Профессиональный PDF со скором и рекомендациями.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    ring: "ring-violet-100",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Разработчик / Дизайнер",
    description:
      "Получаешь конкретный чек-лист что исправить, с готовыми текстами — без долгих обсуждений с маркетологом.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
  },
];

export function ForWhom() {
  return (
    <section className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            ConversionPulse создан для тех, кто хочет{" "}
            <span className="text-brand-600">эффективно тратить бюджет</span>{" "}
            на привлечение клиентов
          </h2>
        </motion.div>

        {/* Сетка 2×2 */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {PERSONAS.map((persona, i) => (
            <motion.div
              key={persona.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                {/* Иконка */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${persona.bg} ${persona.color} ring-1 ${persona.ring}`}
                >
                  {persona.icon}
                </div>

                {/* Текст */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {persona.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
