"use client";

import { motion } from "framer-motion";
import { BarChart3, ShieldCheck, Zap, FileCheck } from "lucide-react";

const STATS = [
  {
    icon: <FileCheck className="h-5 w-5 text-indigo-400" />,
    value: "1 200+",
    label: "сайтов проверено",
  },
  {
    icon: <BarChart3 className="h-5 w-5 text-indigo-400" />,
    value: "10 000+",
    label: "проблем найдено",
  },
  {
    icon: <Zap className="h-5 w-5 text-indigo-400" />,
    value: "~3 мин",
    label: "среднее время анализа",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-indigo-400" />,
    value: "15+",
    label: "критериев проверки",
  },
];

const NICHES = [
  "E-commerce",
  "SaaS",
  "Fintech",
  "Образование",
  "Услуги",
  "Недвижимость",
  "Медицина",
];

export function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-[#030303] py-8">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {STATS.map((stat) => (
            <div key={stat.label} className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/[0.05] ring-1 ring-white/[0.08]">
                {stat.icon}
              </div>
              <div>
                <p className="text-lg font-bold text-white">{stat.value}</p>
                <p className="text-xs text-white/40">{stat.label}</p>
              </div>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="mt-6 flex flex-wrap items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <span className="text-xs text-white/25 mr-1">Ниши клиентов:</span>
          {NICHES.map((niche) => (
            <span
              key={niche}
              className="inline-flex items-center rounded-full bg-white/[0.03] px-3 py-1 text-xs font-medium text-white/40 border border-white/[0.06]"
            >
              {niche}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
