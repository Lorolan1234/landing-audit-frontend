"use client";

import { motion } from "framer-motion";
import { UrlForm } from "./UrlForm";
import { ANALYSIS_TIME, SHOW_PRICING } from "@/lib/site";

export function FinalCTA() {
  return (
    <section id="final-cta" className="relative overflow-hidden bg-[#0c0c11] py-16 sm:py-24">
      <div aria-hidden className="pointer-events-none absolute left-1/2 top-1/2 h-[360px] w-[720px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-600/[0.12] blur-[110px]" />

      <motion.div
        className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-white text-balance sm:text-4xl">
          Каждый день без правок —{" "}
          <span className="bg-gradient-to-r from-indigo-300 to-violet-300 bg-clip-text text-transparent">
            деньги, потерянные на рекламе
          </span>
        </h2>
        <p className="mt-4 text-lg text-white/70">
          {SHOW_PRICING ? "Первая проверка бесплатно." : "Бесплатно, без регистрации."} Результат через {ANALYSIS_TIME}.
        </p>
        <UrlForm id="final-form" buttonLabel="Проверить мой сайт" className="mx-auto mt-8 max-w-xl" />
        <p className="mt-4 text-sm text-white/60">Без регистрации · Готовые тексты замены · PDF</p>
      </motion.div>
    </section>
  );
}
