"use client";

import { motion } from "framer-motion";
import { Gauge, AlertTriangle, ClipboardList, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: <Gauge className="h-6 w-6" />,
    title: "Индекс конверсионной готовности",
    description:
      "Один понятный скор от 0 до 100 — видно сразу, насколько страница готова к платному трафику. Без воды и субъективных мнений.",
    color: "text-brand-600",
    bg: "bg-brand-50",
    ring: "ring-brand-100",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Топ-3 критичных проблемы",
    description:
      "Не 50 пунктов мелочей, а 3 главных блокера, которые прямо сейчас убивают вашу конверсию. С объяснением, почему это важно.",
    color: "text-red-600",
    bg: "bg-red-50",
    ring: "ring-red-100",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Готовые рекомендации с приоритетами",
    description:
      "Каждая проблема — с конкретной правкой и готовым текстом замены. Отдайте список разработчику и получите результат.",
    color: "text-emerald-600",
    bg: "bg-emerald-50",
    ring: "ring-emerald-100",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Проверка на всех устройствах",
    description:
      "Как выглядит и работает ваш лендинг на мобильных и десктопе — с реальными метриками скорости загрузки.",
    color: "text-violet-600",
    bg: "bg-violet-50",
    ring: "ring-violet-100",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-gray-50/50">
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
            Что вы получите за{" "}
            <span className="text-brand-600">2 минуты</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Полная диагностика конверсионного потенциала вашей посадочной страницы.
          </p>
        </motion.div>

        {/* Сетка 2×2 */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl border border-gray-100 bg-white p-6 lg:p-8 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                {/* Иконка */}
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.bg} ${feature.color} ring-1 ${feature.ring}`}
                >
                  {feature.icon}
                </div>

                {/* Текст */}
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                    {feature.description}
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
