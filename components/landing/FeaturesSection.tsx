"use client";

import { motion } from "framer-motion";
import { Gauge, AlertTriangle, ClipboardList, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: <Gauge className="h-6 w-6" />,
    title: "Индекс конверсионной готовности",
    description:
      "Один понятный скор от 0 до 100 — видно сразу, насколько страница готова к платному трафику. Без воды и субъективных мнений.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    ring: "ring-indigo-500/20",
  },
  {
    icon: <AlertTriangle className="h-6 w-6" />,
    title: "Топ-3 критичных проблемы",
    description:
      "Не 50 пунктов мелочей, а 3 главных блокера, которые прямо сейчас убивают вашу конверсию. С объяснением, почему это важно.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    ring: "ring-red-500/20",
  },
  {
    icon: <ClipboardList className="h-6 w-6" />,
    title: "Готовые рекомендации с приоритетами",
    description:
      "Каждая проблема — с конкретной правкой и готовым текстом замены. Отдайте список разработчику и получите результат.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    ring: "ring-emerald-500/20",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Проверка на всех устройствах",
    description:
      "Как выглядит и работает ваш лендинг на мобильных и десктопе — с реальными метриками скорости загрузки.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    ring: "ring-violet-500/20",
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Что вы получите за{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
              3 минуты
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Полная диагностика конверсионного потенциала вашей посадочной
            страницы.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 lg:p-8 hover:bg-white/[0.04] transition-colors"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <div className="flex items-start gap-4">
                <div
                  className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${feature.bg} ${feature.color} ring-1 ${feature.ring}`}
                >
                  {feature.icon}
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-white/50 leading-relaxed">
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
