"use client";

import { motion } from "framer-motion";
import { User, Briefcase, Building2, Code2 } from "lucide-react";

const PERSONAS = [
  {
    icon: <User className="h-6 w-6" />,
    title: "Маркетолог",
    description:
      "Проверяешь лендинг перед запуском рекламы. Экономишь бюджет клиента и своё время на ручной аудит.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    ring: "ring-indigo-500/20",
  },
  {
    icon: <Briefcase className="h-6 w-6" />,
    title: "Предприниматель",
    description:
      "Понимаешь, почему реклама не окупается, без глубоких технических знаний. Получаешь конкретный план действий.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
  },
  {
    icon: <Building2 className="h-6 w-6" />,
    title: "Агентство",
    description:
      "Включаешь отчёт ConversionPulse в аудит для клиента. Профессиональный PDF со скором и рекомендациями.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    ring: "ring-violet-500/20",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Разработчик / Дизайнер",
    description:
      "Получаешь конкретный чек-лист что исправить, с готовыми текстами — без долгих обсуждений с маркетологом.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
  },
];

export function ForWhom() {
  return (
    <section className="py-16 sm:py-24 bg-[#030303]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-3xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            ConversionPulse создан для тех, кто хочет{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
              эффективно тратить бюджет
            </span>{" "}
            на привлечение клиентов
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {PERSONAS.map((persona, i) => (
            <motion.div
              key={persona.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 hover:bg-white/[0.04] transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${persona.bg} ${persona.color} ring-1 ${persona.ring}`}
                >
                  {persona.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {persona.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
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
