"use client";

import { motion } from "framer-motion";
import { LinkIcon, Clock, FileText } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Вставьте URL",
    description:
      "Укажите адрес лендинга — это всё, что требуется от вас. Никаких настроек, доступов или установки кода.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    ring: "ring-indigo-500/20",
  },
  {
    number: "02",
    icon: <Clock className="h-6 w-6" />,
    title: "Подождите 3–5 минут",
    description:
      "Система проведёт комплексную диагностику: проанализирует контент, структуру, скорость, мобильную версию.",
    color: "text-amber-400",
    bg: "bg-amber-500/10",
    ring: "ring-amber-500/20",
  },
  {
    number: "03",
    icon: <FileText className="h-6 w-6" />,
    title: "Получите отчёт",
    description:
      "Индекс готовности, поблочный разбор с готовыми текстами замены и приоритизированный план действий. Можно скачать в PDF.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-[#030303]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            3 шага до готового{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
              списка правок
            </span>
          </h2>
        </motion.div>

        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5">
            <div className="h-full bg-gradient-to-r from-indigo-500/30 via-amber-500/30 to-emerald-500/30 rounded-full" />
          </div>

          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              className="relative text-center"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} ${step.color} ring-1 ${step.ring}`}
                >
                  {step.icon}
                  <span
                    className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-[#0a0a0a] text-xs font-bold ${step.color} ring-2 ${step.ring}`}
                  >
                    {step.number}
                  </span>
                </div>
              </div>

              <h3 className="mt-6 text-lg font-bold text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-white/40 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
