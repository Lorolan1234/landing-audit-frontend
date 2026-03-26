"use client";

import { motion } from "framer-motion";
import { LinkIcon, Clock, FileText } from "lucide-react";

const STEPS = [
  {
    number: "01",
    icon: <LinkIcon className="h-6 w-6" />,
    title: "Вставьте URL",
    description: "Укажите адрес лендинга — это всё, что требуется от вас. Никаких настроек, доступов или установки кода.",
    color: "text-brand-600",
    bg: "bg-brand-50",
    ring: "ring-brand-100",
    line: "from-brand-200 to-amber-200",
  },
  {
    number: "02",
    icon: <Clock className="h-6 w-6" />,
    title: "Подождите 2 минуты",
    description: "Система проведёт комплексную диагностику: проанализирует контент, структуру, скорость, мобильную версию и скриншоты.",
    color: "text-amber-600",
    bg: "bg-amber-50",
    ring: "ring-amber-100",
    line: "from-amber-200 to-emerald-200",
  },
  {
    number: "03",
    icon: <FileText className="h-6 w-6" />,
    title: "Получите отчёт",
    description: "Индекс готовности, поблочный разбор с готовыми текстами замены и приоритизированный план действий. Можно скачать в PDF.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
    line: "",
  },
];

export function HowItWorks() {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 bg-white">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* Заголовок */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
            3 шага до готового{" "}
            <span className="text-brand-600">списка правок</span>
          </h2>
        </motion.div>

        {/* Шаги */}
        <div className="relative grid md:grid-cols-3 gap-8 lg:gap-12">
          {/* Соединительная линия — только desktop */}
          <div className="hidden md:block absolute top-16 left-[20%] right-[20%] h-0.5">
            <div className="h-full bg-gradient-to-r from-brand-200 via-amber-200 to-emerald-200 rounded-full" />
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
              {/* Номер + иконка */}
              <div className="flex flex-col items-center">
                <div
                  className={`relative flex h-16 w-16 items-center justify-center rounded-2xl ${step.bg} ${step.color} ring-1 ${step.ring} shadow-sm`}
                >
                  {step.icon}
                  <span
                    className={`absolute -top-2 -right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white text-xs font-bold ${step.color} ring-2 ${step.ring}`}
                  >
                    {step.number}
                  </span>
                </div>
              </div>

              {/* Текст */}
              <h3 className="mt-6 text-lg font-bold text-gray-900">
                {step.title}
              </h3>
              <p className="mt-3 text-sm text-gray-600 leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
