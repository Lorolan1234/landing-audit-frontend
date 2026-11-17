"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion, animate } from "framer-motion";
import { X, Check, ArrowDown } from "lucide-react";

const SCORE = 54;
const RADIUS = 34;
const CIRC = 2 * Math.PI * RADIUS;

const BLOCKS = [
  { name: "Первый экран", score: 4 },
  { name: "Призыв к действию", score: 4 },
  { name: "Доверие", score: 5 },
];

export function HeroReportCard() {
  const reduce = useReducedMotion();
  const [value, setValue] = useState(reduce ? SCORE : 0);

  useEffect(() => {
    if (reduce) return;
    const controls = animate(0, SCORE, {
      duration: 1.6,
      delay: 0.6,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(Math.round(v)),
    });
    return () => controls.stop();
  }, [reduce]);

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-md"
    >
      <div aria-hidden className="absolute -inset-6 rounded-[2rem] bg-indigo-500/10 blur-3xl" />

      <div className="relative rounded-2xl border border-white/10 bg-[#0d0d12]/90 shadow-2xl shadow-black/60 backdrop-blur">
        <div className="flex items-center justify-between border-b border-white/[0.08] px-5 py-3">
          <span className="text-xs font-medium text-white/60">Пример отчёта</span>
          <span className="rounded-full bg-white/[0.06] px-2.5 py-0.5 text-[11px] text-white/60">
            лендинг услуги
          </span>
        </div>

        <div className="space-y-4 p-5">
          <div className="flex items-center gap-4">
            <div className="relative h-20 w-20 shrink-0">
              <svg viewBox="0 0 80 80" className="h-20 w-20 -rotate-90" aria-hidden>
                <circle cx="40" cy="40" r={RADIUS} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="7" />
                <circle
                  cx="40"
                  cy="40"
                  r={RADIUS}
                  fill="none"
                  stroke="#f59e0b"
                  strokeWidth="7"
                  strokeLinecap="round"
                  strokeDasharray={CIRC}
                  strokeDashoffset={CIRC * (1 - value / 100)}
                />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-extrabold text-amber-400 tabular-nums">{value}</span>
                <span className="text-[10px] text-white/50">из 100</span>
              </div>
            </div>
            <div className="min-w-0 flex-1 space-y-1.5">
              {BLOCKS.map((b) => (
                <div key={b.name} className="flex items-center gap-2 text-xs">
                  <span className="w-32 shrink-0 truncate text-white/70">{b.name}</span>
                  <div className="h-1.5 flex-1 rounded-full bg-white/[0.08]">
                    <div
                      className="h-1.5 rounded-full bg-amber-400/80"
                      style={{ width: `${b.score * 10}%` }}
                    />
                  </div>
                  <span className="w-8 text-right tabular-nums text-white/60">{b.score}/10</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/[0.08] bg-white/[0.03] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-white/50">
              Готовая правка · кнопка заявки
            </p>
            <div className="mt-3 flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-red-500/15">
                <X className="h-3 w-3 text-red-400" aria-hidden />
              </span>
              <p className="text-sm text-white/55 line-through decoration-red-400/50">«Оставить заявку»</p>
            </div>
            <ArrowDown className="my-1.5 ml-1 h-3.5 w-3.5 text-white/30" aria-hidden />
            <div className="flex items-start gap-2.5">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-emerald-500/15">
                <Check className="h-3 w-3 text-emerald-400" aria-hidden />
              </span>
              <p className="text-sm font-semibold text-white">«Рассчитать стоимость за 2 минуты»</p>
            </div>
            <p className="mt-3 text-xs leading-relaxed text-white/55">
              Почему: «заявка» звучит как обязательство. Конкретная выгода и время снижают порог входа.
            </p>
          </div>

          <div className="flex items-center justify-between text-xs text-white/55">
            <span>3 главных блокера · 12 правок</span>
            <span>PDF для разработчика</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
