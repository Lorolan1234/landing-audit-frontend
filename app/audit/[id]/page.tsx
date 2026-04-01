"use client";

import { use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Monitor, Target, MousePointerClick, ShieldCheck,
  FileText, Smartphone, Zap, TrendingUp, AlertTriangle,
  BarChart2, Download, RefreshCw, ArrowLeft, ExternalLink,
  Briefcase, Layers,
} from "lucide-react";
import { toast } from "sonner";
import { motion } from "framer-motion";

import { useAuditPolling } from "@/hooks/useAuditPolling";
import { shortUrl, formatDate } from "@/lib/utils";
import { ProcessingStatus } from "@/components/audit/ProcessingStatus";
import { ReadinessIndex } from "@/components/audit/ReadinessIndex";
import { CategoryCard } from "@/components/audit/CategoryCard";
import { SummaryBlock } from "@/components/audit/SummaryBlock";
import { SpeedMetrics } from "@/components/audit/SpeedMetrics";
import { RadarChart } from "@/components/audit/RadarChart";
import { Button } from "@/components/ui/Button";
import { AuditForm } from "@/components/audit/AuditForm";
import { StrategicDiagnosis } from "@/components/audit/StrategicDiagnosis";
import { BlockAnalysisCard } from "@/components/audit/BlockAnalysisCard";
import { MissingElements } from "@/components/audit/MissingElements";

import type { AIAnalysisResult, SpeedData } from "@/types/audit";
import { CATEGORY_META, MARKETING_CATEGORIES, TECHNICAL_CATEGORIES } from "@/types/audit";

const ICON_MAP: Record<string, React.ReactNode> = {
  Monitor:           <Monitor className="h-5 w-5" />,
  Target:            <Target className="h-5 w-5" />,
  MousePointerClick: <MousePointerClick className="h-5 w-5" />,
  ShieldCheck:       <ShieldCheck className="h-5 w-5" />,
  FileText:          <FileText className="h-5 w-5" />,
  Smartphone:        <Smartphone className="h-5 w-5" />,
  Zap:               <Zap className="h-5 w-5" />,
  TrendingUp:        <TrendingUp className="h-5 w-5" />,
  AlertTriangle:     <AlertTriangle className="h-5 w-5" />,
  BarChart2:         <BarChart2 className="h-5 w-5" />,
};

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AuditPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { status, fullResult, isPolling, error } = useAuditPolling(id);

  // ── Загрузка / обработка ──
  if (!status || status.status === "pending" || status.status === "processing") {
    return (
      <ProcessingStatus
        status={status?.status ?? "pending"}
        url={status?.url ?? ""}
        currentStep={status?.current_step}
      />
    );
  }

  // ── Ошибка ──
  if (status.status === "failed" || error) {
    const rawError = status.error_message ?? error ?? "";
    const friendlyError = (() => {
      if (!rawError) return "Произошла неизвестная ошибка. Попробуйте позже.";
      if (rawError.includes("антибот") || rawError.includes("CAPTCHA") || rawError.includes("заблокировал"))
        return "Сайт защищён от автоматического доступа (антибот/CAPTCHA). Анализ таких сайтов недоступен.";
      if (rawError.includes("403") || rawError.includes("Forbidden"))
        return "Сайт запрещает внешний доступ (ошибка 403). Попробуйте другой URL.";
      if (rawError.includes("404") || rawError.includes("Not Found"))
        return "Страница не найдена (ошибка 404). Проверьте правильность URL.";
      if (rawError.includes("timeout") || rawError.includes("Timeout"))
        return "Сайт не ответил вовремя. Попробуйте ещё раз или проверьте доступность страницы.";
      if (rawError.includes("Не удалось загрузить") || rawError.includes("HTTPStatusError") || rawError.includes("NotImplementedError"))
        return "Не удалось загрузить страницу. Возможно, сайт недоступен или заблокировал запрос.";
      return rawError;
    })();

    return (
      <div className="min-h-screen bg-[#030303] flex flex-col items-center justify-center px-4 text-center">
        <div className="text-5xl mb-4">😕</div>
        <h2 className="text-xl font-bold text-white mb-2">Не удалось выполнить аудит</h2>
        <p className="text-sm text-white/40 mb-6 max-w-sm">{friendlyError}</p>
        <div className="flex gap-3">
          <Link href="/">
            <Button variant="secondary">
              <ArrowLeft className="h-4 w-4" />
              На главную
            </Button>
          </Link>
          <Button onClick={() => window.location.reload()}>
            <RefreshCw className="h-4 w-4" />
            Попробовать снова
          </Button>
        </div>
      </div>
    );
  }

  // ── Результат ──
  const ai = fullResult?.ai_result as AIAnalysisResult | null;
  const speedDataForDisplay: SpeedData = fullResult?.speed_data ?? {
    mobile: { performance_score: 0, fcp: 0, lcp: 0, cls: 0, tbt: 0, speed_index: 0, tti: 0 },
    desktop: { performance_score: 0, fcp: 0, lcp: 0, cls: 0, tbt: 0, speed_index: 0, tti: 0 },
    core_web_vitals_passed: false,
    speed_data_available: false,
    error_reason: "Данные не были получены при аудите",
  };

  return (
    <div className="min-h-screen bg-[#030303]">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 pt-24 pb-8">
        {/* Хлебные крошки */}
        <div className="flex items-center gap-2 text-sm text-white/25 mb-6">
          <Link href="/" className="hover:text-white/60 transition-colors">Главная</Link>
          <span>/</span>
          <span className="text-white/40">Аудит</span>
          <span>/</span>
          <span className="text-white/50 font-medium truncate max-w-xs">
            {shortUrl(status.url, 40)}
          </span>
        </div>

        {/* Заголовок */}
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-xl font-bold text-white flex items-center gap-2">
              {shortUrl(status.url, 50)}
              <a href={status.url} target="_blank" rel="noopener noreferrer" className="text-white/20 hover:text-indigo-400">
                <ExternalLink className="h-4 w-4" />
              </a>
            </h1>
            <p className="text-sm text-white/30 mt-1">{formatDate(status.created_at)}</p>
          </div>

          {fullResult && (
            <div className="flex gap-2 shrink-0">
              <button
                className="inline-flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/50 hover:text-white/80 hover:bg-white/[0.06] transition-all"
                onClick={async () => {
                  try {
                    const res = await fetch("/api/v1/audit", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ url: status.url, force: true }),
                    });
                    if (!res.ok) {
                      const t = await res.text();
                      toast.error(t.slice(0, 120));
                      return;
                    }
                    const data = await res.json();
                    router.push(`/audit/${data.id}`);
                  } catch {
                    toast.error("Не удалось запустить повторный анализ");
                  }
                }}
              >
                <RefreshCw className="h-4 w-4" />
                Обновить
              </button>
              <button
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-rose-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 hover:opacity-90 transition-all"
                onClick={async () => {
                  try {
                    const response = await fetch(`/api/v1/audit/${id}/pdf`);
                    if (!response.ok) {
                      const err = await response.text();
                      toast.error(`Ошибка генерации PDF: ${err.slice(0, 100)}`);
                      return;
                    }
                    const blob = await response.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement("a");
                    a.href = url;
                    a.download = `audit_${id}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                  } catch {
                    toast.error("Не удалось скачать PDF");
                  }
                }}
              >
                <Download className="h-4 w-4" />
                Скачать PDF
              </button>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* ── Левая колонка ── */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <ReadinessIndex
                index={status.readiness_index ?? 0}
                category={status.readiness_category ?? ""}
                criticalCount={fullResult?.critical_issues_count ?? 0}
                hasBlockers={fullResult?.has_blockers ?? false}
                processingTime={status.processing_time_seconds}
              />
            </motion.div>

            {ai && (
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-sm font-bold text-white mb-4">Профиль страницы</h2>
                <RadarChart aiResult={ai} />
              </motion.div>
            )}

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
              <h2 className="text-sm font-bold text-white mb-3">Проверить другой сайт</h2>
              <AuditForm />
            </div>
          </div>

          {/* ── Правая колонка ── */}
          <div className="lg:col-span-2 space-y-6">
            {ai?.business_context && (ai.business_context.core_offer || ai.business_context.product_description) && (
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 }}
              >
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-indigo-400" />
                  Бизнес-контекст страницы
                </h2>
                <dl className="grid sm:grid-cols-2 gap-3">
                  {[
                    { label: "Что продаётся", value: ai.business_context.product_description || ai.business_context.business_type },
                    { label: "Целевая аудитория", value: ai.business_context.target_audience },
                    { label: "Главный оффер", value: ai.business_context.main_offer || ai.business_context.core_offer },
                    { label: "Бизнес-модель", value: ai.business_context.business_model },
                    { label: "Целевое действие", value: ai.business_context.target_action || ai.business_context.traffic_intent },
                  ].filter(({ value }) => value).map(({ label, value }) => (
                    <div key={label} className="rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                      <dt className="text-xs font-semibold text-white/30 uppercase tracking-wide mb-1">{label}</dt>
                      <dd className="text-sm text-white/70">{value}</dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            )}

            {ai?.strategic_diagnosis?.headline && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 }}
              >
                <StrategicDiagnosis data={ai.strategic_diagnosis} />
              </motion.div>
            )}

            {ai?.overall_summary && (
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <h2 className="text-base font-bold text-white mb-5">Итоговый анализ</h2>
                <SummaryBlock summary={ai.overall_summary} />
              </motion.div>
            )}

            {ai?.missing_elements && (
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
              >
                <MissingElements data={ai.missing_elements} />
              </motion.div>
            )}

            {ai && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Target className="h-4 w-4 text-indigo-400" />
                  Дополнительный анализ
                </h2>
                <div className="space-y-3">
                  {MARKETING_CATEGORIES.map((key) => {
                    const meta = CATEGORY_META[key];
                    const data = ai[key];
                    if (!meta || !data) return null;
                    return (
                      <CategoryCard
                        key={key}
                        title={meta.title}
                        icon={ICON_MAP[meta.icon]}
                        data={data as never}
                        weight={meta.weight}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}

            {((ai?.block_analysis ?? ai?.page_blocks_analysis)?.length ?? 0) > 0 && (
              <motion.div
                className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25 }}
              >
                <h2 className="text-base font-bold text-white mb-4 flex items-center gap-2">
                  <Layers className="h-4 w-4 text-indigo-400" />
                  Поблочный разбор страницы
                </h2>
                <div className="space-y-3">
                  {(ai?.block_analysis ?? ai?.page_blocks_analysis ?? []).map((block) => (
                    <BlockAnalysisCard key={block.block_order} block={block} />
                  ))}
                </div>
              </motion.div>
            )}

            {ai && (
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-3 mb-4 mt-2">
                  <div className="h-px flex-1 bg-white/[0.06]" />
                  <h2 className="text-base font-bold text-white flex items-center gap-2 shrink-0">
                    <Zap className="h-4 w-4 text-white/30" />
                    Технический аудит
                  </h2>
                  <div className="h-px flex-1 bg-white/[0.06]" />
                </div>
                <div className="space-y-3">
                  {TECHNICAL_CATEGORIES.map((key) => {
                    const meta = CATEGORY_META[key];
                    const data = ai[key];
                    if (!meta || !data) return null;
                    return (
                      <CategoryCard
                        key={key}
                        title={meta.title}
                        icon={ICON_MAP[meta.icon]}
                        data={data as never}
                        weight={meta.weight}
                      />
                    );
                  })}
                </div>
              </motion.div>
            )}

            <motion.div
              className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
            >
              <SpeedMetrics data={speedDataForDisplay} />
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
