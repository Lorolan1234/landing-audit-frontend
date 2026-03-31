"use client";

import { motion } from "framer-motion";
import { Gauge, AlertTriangle, ClipboardList, Smartphone } from "lucide-react";

const FEATURES = [
  {
    icon: <Gauge className="h-5 w-5" />,
    title: "Индекс конверсионной готовности",
    subtitle: "0–100 баллов",
    description:
      "Один понятный скор — видно сразу, насколько страница готова к платному трафику. Без воды и субъективных мнений.",
    color: "text-indigo-400",
    bg: "bg-indigo-500/10",
    borderColor: "hover:border-indigo-500/30",
    tags: ["#Скоринг", "#Готовность"],
  },
  {
    icon: <AlertTriangle className="h-5 w-5" />,
    title: "Топ-3 критичных проблемы",
    subtitle: "с приоритетами",
    description:
      "Не 50 пунктов мелочей, а 3 главных блокера, которые прямо сейчас убивают вашу конверсию. С объяснением, почему это важно.",
    color: "text-red-400",
    bg: "bg-red-500/10",
    borderColor: "hover:border-red-500/30",
    tags: ["#Проблемы", "#Критичное"],
  },
  {
    icon: <ClipboardList className="h-5 w-5" />,
    title: "Готовые рекомендации",
    subtitle: "с текстами замены",
    description:
      "Каждая проблема — с конкретной правкой и готовым текстом. Отдайте список разработчику и получите результат.",
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    borderColor: "hover:border-emerald-500/30",
    tags: ["#Рекомендации", "#Тексты"],
  },
  {
    icon: <Smartphone className="h-5 w-5" />,
    title: "Анализ всех устройств",
    subtitle: "mobile + desktop",
    description:
      "Как выглядит и работает ваш лендинг на мобильных и десктопе — с реальными метриками скорости загрузки.",
    color: "text-violet-400",
    bg: "bg-violet-500/10",
    borderColor: "hover:border-violet-500/30",
    tags: ["#Mobile", "#Скорость"],
  },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-16 sm:py-24 bg-[#0a0a0a]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center max-w-2xl mx-auto mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Что вы получите за{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">
              3 минуты
            </span>
          </h2>
          <p className="mt-4 text-lg text-white/40">
            Полная диагностика конверсионного потенциала вашей посадочной
            страницы
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-5">
          {FEATURES.map((feature, i) => (
            <motion.div
              key={feature.title}
              className={`group relative rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6 lg:p-7 transition-all duration-300 ${feature.borderColor} hover:bg-white/[0.04]`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.12 }}
              whileHover={{ y: -4 }}
            >
              {/* Иконка */}
              <div
                className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${feature.bg} ${feature.color} ring-1 ring-white/[0.06]`}
              >
                {feature.icon}
              </div>

              {/* Заголовок + подзаголовок */}
              <div className="mt-4 flex items-baseline gap-2">
                <h3 className="text-base font-bold text-white">
                  {feature.title}
                </h3>
                <span className="text-xs text-white/25 font-medium">
                  {feature.subtitle}
                </span>
              </div>

              {/* Описание */}
              <p className="mt-2.5 text-sm text-white/45 leading-relaxed">
                {feature.description}
              </p>

              {/* Теги */}
              <div className="mt-4 flex flex-wrap gap-2">
                {feature.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center rounded-full bg-white/[0.04] px-2.5 py-0.5 text-[11px] font-medium text-white/35 border border-white/[0.06]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
