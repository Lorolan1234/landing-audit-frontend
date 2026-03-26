"use client";

import { motion } from "framer-motion";
import { Clock, MousePointerClick, TrendingDown } from "lucide-react";

const PROBLEMS = [
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Медленная загрузка",
    description:
      "Каждая лишняя секунда загрузки снижает конверсию на 7%. Вы платите за клик, а пользователь не дожидается открытия страницы.",
    color: "text-red-500",
    bg: "bg-red-50",
    ring: "ring-red-100",
  },
  {
    icon: <MousePointerClick className="h-6 w-6" />,
    title: "Слабый первый экран",
    description:
      "У вас 3–5 секунд, чтобы зацепить. Если оффер размыт, а CTA не виден — деньги на трафик потрачены впустую.",
    color: "text-amber-500",
    bg: "bg-amber-50",
    ring: "ring-amber-100",
  },
  {
    icon: <TrendingDown className="h-6 w-6" />,
    title: "Утечки в воронке",
    description:
      "Битые формы, лишние ссылки, отсутствие доверия — невидимые дыры, через которые уходят ваши лиды и заявки.",
    color: "text-orange-500",
    bg: "bg-orange-50",
    ring: "ring-orange-100",
  },
];

export function ProblemSection() {
  return (
    <section className="py-16 sm:py-24 bg-white">
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
            Вы платите за клики.{" "}
            <span className="text-red-500">Ваш сайт их теряет.</span>
          </h2>
          <p className="mt-4 text-lg text-gray-500">
            Большинство сайтов теряют до 70% конверсий из-за проблем, которые вы не замечаете
          </p>
        </motion.div>

        {/* Три колонки */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={problem.title}
              className="relative rounded-2xl border border-gray-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {/* Иконка */}
              <div
                className={`inline-flex h-12 w-12 items-center justify-center rounded-xl ${problem.bg} ${problem.color} ring-1 ${problem.ring}`}
              >
                {problem.icon}
              </div>

              {/* Крестик */}
              <div className="absolute top-5 right-5">
                <span className={`text-2xl font-bold ${problem.color} opacity-20`}>✕</span>
              </div>

              {/* Текст */}
              <h3 className="mt-4 text-lg font-bold text-gray-900">
                {problem.title}
              </h3>
              <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                {problem.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
