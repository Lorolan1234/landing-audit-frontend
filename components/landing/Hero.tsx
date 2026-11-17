"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { UrlForm } from "./UrlForm";
import { HeroReportCard } from "./HeroReportCard";
import { ANALYSIS_TIME } from "@/lib/site";

const PERKS = ["Бесплатно", "Без регистрации", `Отчёт за ${ANALYSIS_TIME}`];

export function Hero() {
  const reduce = useReducedMotion();
  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <section className="relative overflow-hidden bg-[#07070a] pt-28 pb-16 sm:pt-32 lg:pt-40 lg:pb-28">
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-indigo-600/[0.12] blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_75%)]" />
      </div>

      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 lg:px-8">
        <div className="text-center lg:text-left">
          <motion.p
            {...fade(0)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-sm text-white/70"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden />
            Аудит конверсии посадочных страниц
          </motion.p>

          <motion.h1
            {...fade(0.08)}
            className="mt-6 text-4xl font-extrabold leading-[1.08] tracking-tight text-white text-balance sm:text-5xl lg:text-[3.5rem]"
          >
            Найдём, где ваш сайт теряет заявки,{" "}
            <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
              и дадим готовые правки
            </span>
          </motion.h1>

          <motion.p
            {...fade(0.16)}
            className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-white/70 lg:mx-0"
          >
            Вставьте ссылку — через {ANALYSIS_TIME} получите оценку 0–100, три главных блокера
            и готовые тексты замены, которые можно сразу отдать разработчику.
          </motion.p>

          <motion.div {...fade(0.24)} className="mx-auto mt-8 max-w-xl lg:mx-0">
            <UrlForm id="hero-form" />
            <ul className="mt-4 flex flex-wrap justify-center gap-x-5 gap-y-2 text-sm text-white/60 lg:justify-start">
              {PERKS.map((p) => (
                <li key={p} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-400" aria-hidden />
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        <HeroReportCard />
      </div>
    </section>
  );
}
