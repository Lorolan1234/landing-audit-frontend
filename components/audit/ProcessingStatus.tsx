"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Zap, Brain, BarChart3, Smartphone } from "lucide-react";
import type { AuditStatus } from "@/types/audit";

const STEPS = [
  { id: "parse",      label: "Сканируем страницу",                  icon: Search },
  { id: "speed",      label: "Измеряем скорость загрузки",          icon: Zap },
  { id: "screenshot", label: "Проверяем отображение на устройствах", icon: Smartphone },
  { id: "ai",         label: "Анализируем конверсионные элементы",   icon: Brain },
  { id: "scoring",    label: "Рассчитываем индекс готовности",       icon: BarChart3 },
];

const TIPS = [
  "Проверяем заголовки, оффер и CTA на первом экране",
  "Ищем утечки трафика и слабые места воронки",
  "Оцениваем элементы доверия и социальные доказательства",
  "Готовим конкретные рекомендации с текстами замены",
  "Формируем приоритизированный план действий",
];

interface ProcessingStatusProps {
  status: AuditStatus;
  url: string;
  currentStep?: string | null;
}

export function ProcessingStatus({ status, url, currentStep }: ProcessingStatusProps) {
  const [elapsed, setElapsed] = useState(0);
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    if (status !== "processing" && status !== "pending") return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [status]);

  useEffect(() => {
    const t = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const effectiveStep = currentStep || (status === "processing" ? "parse" : null);
  const stepIndex = STEPS.findIndex((s) => s.id === effectiveStep);

  const progressPercent = effectiveStep
    ? Math.min(((stepIndex + 1) / STEPS.length) * 100, 95)
    : 5;

  return (
    <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center py-16 px-4">
      {/* Фоновый декор */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full bg-indigo-500/[0.03] blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-rose-500/[0.03] blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        {/* Логотип */}
        <div className="relative mb-8">
          <div className="h-20 w-20 rounded-2xl bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center shadow-lg shadow-indigo-500/20">
            <BarChart3 className="h-10 w-10 text-white" />
          </div>
          <motion.div
            className="absolute -inset-2 rounded-2xl border-2 border-indigo-400/50"
            animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0, 0.6] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>

        {/* Заголовок */}
        <h2 className="text-xl font-bold text-white mb-2">
          Диагностируем ваш сайт...
        </h2>
        <p className="text-sm text-white/40 mb-1 text-center max-w-md">
          Проверяем{" "}
          <span className="font-medium text-white/70">
            {url || "страницу"}
          </span>
        </p>

        {/* Ротируемая подсказка */}
        <motion.p
          key={tipIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          className="text-xs bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-rose-400 mb-2 text-center"
        >
          {TIPS[tipIndex]}
        </motion.p>

        {/* Таймер */}
        {elapsed > 0 && (
          <p className="text-xs text-white/25 mb-6">
            {elapsed < 60
              ? `${elapsed} сек`
              : `${Math.floor(elapsed / 60)} мин ${elapsed % 60} сек`}
          </p>
        )}
        {!elapsed && <div className="mb-6" />}

        {/* Прогресс-бар */}
        <div className="w-full max-w-sm mb-8">
          <div className="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-indigo-500 to-rose-500 rounded-full"
              initial={{ width: "5%" }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </div>

        {/* Шаги */}
        <div className="w-full max-w-sm space-y-2.5">
          {STEPS.map((step, i) => {
            const StepIcon = step.icon;
            const isActive = effectiveStep === step.id;
            const isDone = stepIndex >= 0 && i < stepIndex;

            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.15, duration: 0.4 }}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-all ${
                  isActive
                    ? "bg-indigo-500/10 border-indigo-500/30"
                    : isDone
                      ? "bg-green-500/5 border-green-500/20"
                      : "bg-white/[0.02] border-white/[0.06]"
                }`}
              >
                {/* Иконка */}
                <div
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                    isActive
                      ? "bg-indigo-500/20 text-indigo-400"
                      : isDone
                        ? "bg-green-500/20 text-green-400"
                        : "bg-white/[0.04] text-white/25"
                  }`}
                >
                  <StepIcon className="h-4 w-4" />
                </div>

                {/* Текст */}
                <span
                  className={`text-sm flex-1 ${
                    isActive
                      ? "font-medium text-indigo-300"
                      : isDone
                        ? "text-green-400/80"
                        : "text-white/35"
                  }`}
                >
                  {step.label}
                </span>

                {/* Статус */}
                <div className="ml-auto">
                  {isDone ? (
                    <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                      <svg
                        className="h-3 w-3"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={3}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                  ) : isActive ? (
                    <div className="flex gap-1">
                      {[0, 1, 2].map((dot) => (
                        <motion.div
                          key={dot}
                          className="h-1.5 w-1.5 rounded-full bg-indigo-400"
                          animate={{ opacity: [0.3, 1, 0.3] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: dot * 0.2,
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-white/[0.1]" />
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Подсказка */}
        <p className="mt-10 text-xs text-white/20 text-center">
          Не закрывайте страницу — результат сохранится автоматически
        </p>
      </div>
    </div>
  );
}
