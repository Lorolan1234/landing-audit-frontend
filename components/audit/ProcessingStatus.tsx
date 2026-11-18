"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Monitor, FileSearch, ListChecks, PenLine, Check, Link2, Clock } from "lucide-react";
import { toast } from "sonner";
import type { AuditStatus } from "@/types/audit";
import { cn } from "@/lib/utils";

// Порядок и id совпадают с шагами бэкенда (update_step в pipeline)
const STEPS = [
  { id: "screenshot", label: "Открываем сайт на компьютере и телефоне", icon: Monitor, floor: 4 },
  { id: "parse", label: "Разбираем структуру и тексты", icon: FileSearch, floor: 22 },
  { id: "ai", label: "Проверяем 15+ критериев: оффер, кнопки, доверие, скорость", icon: ListChecks, floor: 32 },
  { id: "scoring", label: "Считаем индекс и пишем рекомендации с готовыми текстами", icon: PenLine, floor: 45 },
];

const TIPS = [
  "Проверяем заголовки, оффер и кнопки на первом экране",
  "Ищем места, где посетители уходят, не оставив заявку",
  "Оцениваем элементы доверия: отзывы, кейсы, гарантии",
  "Готовим конкретные правки с текстами замены",
];

interface ProcessingStatusProps {
  status: AuditStatus;
  url: string;
  currentStep?: string | null;
}

export function ProcessingStatus({ status, url, currentStep }: ProcessingStatusProps) {
  const reduce = useReducedMotion();
  const [elapsed, setElapsed] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setTipIndex((i) => (i + 1) % TIPS.length), 7000);
    return () => clearInterval(t);
  }, []);

  const queued = status === "pending";
  const stepIndex = queued ? -1 : Math.max(0, STEPS.findIndex((s) => s.id === currentStep));
  const floor = stepIndex >= 0 ? STEPS[stepIndex].floor : 2;
  // Растёт и по шагам, и по времени: полоска никогда не стоит на месте, но и не доходит до 100%
  const byTime = 95 * (1 - Math.exp(-elapsed / 100));
  const progress = Math.min(96, Math.max(floor, queued ? Math.min(byTime, 10) : byTime));

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Ссылка на отчёт скопирована");
    } catch {
      toast.error("Не удалось скопировать ссылку");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#07070a] px-4 py-24">
      <div aria-hidden className="pointer-events-none fixed left-1/2 top-1/3 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-600/[0.08] blur-[120px]" />

      <div className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        <h1 className="text-2xl font-bold text-white">
          {queued ? "Проверка в очереди" : "Проверяем ваш сайт"}
        </h1>
        <p className="mt-2 max-w-full truncate text-sm text-white/60">{url || "страница"}</p>

        <div className="mt-8 w-full" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
          <div className="h-2 overflow-hidden rounded-full bg-white/[0.07]">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-violet-500"
              initial={false}
              animate={{ width: `${progress}%` }}
              transition={{ duration: reduce ? 0 : 0.9, ease: "easeOut" }}
            />
          </div>
          <div className="mt-2 flex justify-between text-xs text-white/50">
            <span className="flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" aria-hidden />
              {elapsed < 60 ? `${elapsed} сек` : `${Math.floor(elapsed / 60)} мин ${elapsed % 60} сек`}
            </span>
            <span>обычно 2–3 минуты</span>
          </div>
        </div>

        <ol className="mt-8 w-full space-y-2 text-left">
          {STEPS.map((step, i) => {
            const Icon = step.icon;
            const done = stepIndex > i;
            const active = stepIndex === i;
            return (
              <li
                key={step.id}
                className={cn(
                  "flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors",
                  active ? "border-indigo-400/30 bg-indigo-500/10" : done ? "border-emerald-400/20 bg-emerald-500/[0.04]" : "border-white/[0.06] bg-white/[0.02]",
                )}
              >
                <span
                  className={cn(
                    "flex h-8 w-8 shrink-0 items-center justify-center rounded-lg",
                    active ? "bg-indigo-500/20 text-indigo-300" : done ? "bg-emerald-500/15 text-emerald-400" : "bg-white/[0.04] text-white/40",
                  )}
                >
                  {done ? <Check className="h-4 w-4" aria-hidden /> : <Icon className="h-4 w-4" aria-hidden />}
                </span>
                <span className={cn("flex-1 text-sm", active ? "font-medium text-white" : done ? "text-white/70" : "text-white/50")}>
                  {step.label}
                </span>
                {active && (
                  <span className="flex gap-1" aria-label="выполняется">
                    {[0, 1, 2].map((dot) => (
                      <motion.span
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-indigo-300"
                        animate={reduce ? undefined : { opacity: [0.3, 1, 0.3] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: dot * 0.2 }}
                      />
                    ))}
                  </span>
                )}
              </li>
            );
          })}
        </ol>

        <motion.p
          key={tipIndex}
          initial={reduce ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 min-h-[1.25rem] text-sm text-white/60"
        >
          {TIPS[tipIndex]}
        </motion.p>

        <div className="mt-8 w-full rounded-2xl border border-white/[0.08] bg-white/[0.02] p-4 text-sm text-white/70">
          Можно не ждать на этой странице: ссылка на неё — и есть ваш отчёт. Он сохранится и откроется в любой момент.
          <button
            onClick={copyLink}
            className="mx-auto mt-3 flex cursor-pointer items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 text-xs font-medium text-white/80 transition-colors hover:bg-white/[0.06] hover:text-white"
          >
            <Link2 className="h-3.5 w-3.5" aria-hidden />
            Скопировать ссылку на отчёт
          </button>
        </div>
      </div>
    </div>
  );
}
