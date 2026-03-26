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

  // Ротация подсказок каждые 8 секунд
  useEffect(() => {
    const t = setInterval(() => {
      setTipIndex((i) => (i + 1) % TIPS.length);
    }, 8000);
    return () => clearInterval(t);
  }, []);

  const effectiveStep = currentStep || (status === "processing" ? "parse" : null);
  const stepIndex = STEPS.findIndex((s) => s.id === effectiveStep);

  // Прогресс-бар
  const progressPercent = effectiveStep
    ? Math.min(((stepIndex + 1) / STEPS.length) * 100, 95)
    : 5;

  return (
    <div className="flex flex-col items-center py-16 px-4">
      {/* Логотип */}
      <div className="relative mb-8">
        <div className="h-20 w-20 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-600/20">
          <BarChart3 className="h-10 w-10 text-white" />
        </div>
        <motion.div
          className="absolute -inset-2 rounded-2xl border-2 border-brand-400"
          animate={{ scale: [1, 1.1, 1], opacity: [0.6, 0, 0.6] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </div>

      {/* Заголовок */}
      <h2 className="text-xl font-bold text-gray-900 mb-2">
        Диагностируем ваш лендинг...
      </h2>
      <p className="text-sm text-gray-500 mb-1 text-center max-w-md">
        Проверяем{" "}
        <span className="font-medium text-gray-700">
          {url || "страницу"}
        </span>
      </p>

      {/* Ротируемая подсказка */}
      <motion.p
        key={tipIndex}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="text-xs text-brand-600 mb-2 text-center"
      >
        {TIPS[tipIndex]}
      </motion.p>

      {/* Таймер */}
      {elapsed > 0 && (
        <p className="text-xs text-gray-400 mb-6">
          {elapsed < 60
            ? `${elapsed} сек`
            : `${Math.floor(elapsed / 60)} мин ${elapsed % 60} сек`
          }
        </p>
      )}
      {!elapsed && <div className="mb-6" />}

      {/* Прогресс-бар */}
      <div className="w-full max-w-sm mb-8">
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-brand-500 rounded-full"
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
          const isPending = !isActive && !isDone;

          return (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.4 }}
              className={`flex items-center gap-3 rounded-xl border px-4 py-3 transition-colors ${
                isActive
                  ? "bg-brand-50 border-brand-200"
                  : isDone
                    ? "bg-green-50/50 border-green-100"
                    : "bg-gray-50/50 border-gray-100"
              }`}
            >
              {/* Иконка */}
              <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${
                isActive
                  ? "bg-brand-100 text-brand-600"
                  : isDone
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-400"
              }`}>
                <StepIcon className="h-4 w-4" />
              </div>

              {/* Текст */}
              <span className={`text-sm flex-1 ${
                isActive
                  ? "font-medium text-brand-800"
                  : isDone
                    ? "text-green-700"
                    : "text-gray-500"
              }`}>
                {step.label}
              </span>

              {/* Статус */}
              <div className="ml-auto">
                {isDone ? (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-500 text-white">
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                ) : isActive ? (
                  <div className="flex gap-1">
                    {[0, 1, 2].map((dot) => (
                      <motion.div
                        key={dot}
                        className="h-1.5 w-1.5 rounded-full bg-brand-500"
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
                  <div className="h-5 w-5 rounded-full border-2 border-gray-200" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Подсказка */}
      <p className="mt-10 text-xs text-gray-400 text-center">
        Не закрывайте страницу — результат сохранится автоматически
      </p>
    </div>
  );
}
