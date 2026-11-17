"use client";

import { use, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Monitor, Target, MousePointerClick, ShieldCheck,
  FileText, Smartphone, Zap, TrendingUp, AlertTriangle,
  BarChart2, Download, RefreshCw, ArrowLeft, ExternalLink, ChevronDown, SearchX,
} from "lucide-react";
import { toast } from "sonner";

import { useAuditPolling } from "@/hooks/useAuditPolling";
import { shortUrl, formatDate } from "@/lib/utils";
import { ProcessingStatus } from "@/components/audit/ProcessingStatus";
import { CategoryCard } from "@/components/audit/CategoryCard";
import { SpeedMetrics } from "@/components/audit/SpeedMetrics";
import { Button } from "@/components/ui/Button";
import { AuditForm } from "@/components/audit/AuditForm";
import { StrategicDiagnosis } from "@/components/audit/StrategicDiagnosis";
import { BlockAnalysisCard } from "@/components/audit/BlockAnalysisCard";
import { MissingElements } from "@/components/audit/MissingElements";
import { Section } from "@/components/report/Section";
import { ReportToc, type TocItem } from "@/components/report/ReportToc";
import { ReportSummary } from "@/components/report/ReportSummary";
import { StartHere } from "@/components/report/StartHere";
import { ReadyRewrites, collectRewrites } from "@/components/report/ReadyRewrites";
import { ProsCons } from "@/components/report/ProsCons";

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

const EMPTY_SPEED: SpeedData = {
  mobile: { performance_score: 0, fcp: 0, lcp: 0, cls: 0, tbt: 0, speed_index: 0, tti: 0 },
  desktop: { performance_score: 0, fcp: 0, lcp: 0, cls: 0, tbt: 0, speed_index: 0, tti: 0 },
  core_web_vitals_passed: false,
  speed_data_available: false,
  error_reason: "Данные не были получены при аудите",
};

function friendlyError(rawError: string) {
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
}

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function AuditPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const { status, fullResult, error } = useAuditPolling(id);
  const ai = (fullResult?.ai_result ?? null) as AIAnalysisResult | null;

  const content = useMemo(() => {
    if (!ai) return null;
    const blocks = ai.block_analysis ?? ai.page_blocks_analysis ?? [];
    const summary = ai.overall_summary;
    const missing = ai.missing_elements;
    const missingCount =
      (missing?.critical?.length ?? 0) + (missing?.important?.length ?? 0) + (missing?.nice_to_have?.length ?? 0);
    const detailKeys = [...MARKETING_CATEGORIES, ...TECHNICAL_CATEGORIES].filter((k) => ai[k]);
    const ctx = ai.business_context;
    return {
      blocks,
      priorities: summary?.top_3_priorities ?? [],
      rewrites: collectRewrites(ai),
      strengths: summary?.strengths ?? [],
      weaknesses: summary?.weaknesses ?? [],
      missingCount,
      detailKeys,
      hasDiagnosis: !!(ai.strategic_diagnosis?.description || ai.strategic_diagnosis?.conversion_impact),
      context: ctx
        ? [
            { label: "Что продаётся", value: ctx.product_description || ctx.business_type },
            { label: "Целевая аудитория", value: ctx.target_audience },
            { label: "Главный оффер", value: ctx.main_offer || ctx.core_offer },
            { label: "Бизнес-модель", value: ctx.business_model },
            { label: "Целевое действие", value: ctx.target_action || ctx.traffic_intent },
          ].filter((x) => x.value)
        : [],
    };
  }, [ai]);

  if (!status || status.status === "pending" || status.status === "processing") {
    return (
      <ProcessingStatus
        status={status?.status ?? "pending"}
        url={status?.url ?? ""}
        currentStep={status?.current_step}
      />
    );
  }

  if (status.status === "failed" || error) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-[#07070a] px-4 text-center">
        <SearchX className="mb-4 h-12 w-12 text-white/40" aria-hidden />
        <h2 className="mb-2 text-xl font-bold text-white">Не удалось выполнить аудит</h2>
        <p className="mb-6 max-w-sm text-sm text-white/65">{friendlyError(status.error_message ?? error ?? "")}</p>
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

  const toc: TocItem[] = [{ id: "summary", label: "Сводка" }];
  let n = 0;
  const num = () => ++n;
  const sections: { id: string; label: string; number: number }[] = [];
  const add = (cond: boolean, sid: string, label: string) => {
    if (!cond) return;
    sections.push({ id: sid, label, number: num() });
    toc.push({ id: sid, label });
  };
  add(!!content?.priorities.length, "start", "С чего начать");
  add(!!content?.hasDiagnosis, "diagnosis", "Главная проблема");
  add(!!content?.rewrites.length, "rewrites", "Готовые тексты");
  add(!!content?.blocks.length, "blocks", "Разбор по блокам");
  add(!!(content?.strengths.length || content?.weaknesses.length), "pros", "Сильные и слабые стороны");
  add(!!content?.missingCount, "missing", "Чего не хватает");
  add(!!content?.detailKeys.length, "categories", "Категории подробно");
  add(true, "speed", "Скорость загрузки");
  add(!!content?.context.length, "context", "О странице");
  const sec = (sid: string) => sections.find((s) => s.id === sid);

  return (
    <div className="min-h-screen bg-[#07070a]">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-24 sm:px-6 lg:px-8">
        <nav className="mb-6 flex items-center gap-2 text-sm text-white/50" aria-label="Навигация">
          <Link href="/" className="transition-colors hover:text-white/80">Главная</Link>
          <span>/</span>
          <span>Аудит</span>
          <span>/</span>
          <span className="max-w-xs truncate font-medium text-white/70">{shortUrl(status.url, 40)}</span>
        </nav>

        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="min-w-0">
            <p className="text-xs font-semibold uppercase tracking-wider text-white/45">Аудит конверсии</p>
            <h1 className="mt-1 flex items-center gap-2 text-2xl font-bold text-white">
              <span className="truncate">{shortUrl(status.url, 50)}</span>
              <a
                href={status.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Открыть сайт"
                className="shrink-0 text-white/40 hover:text-indigo-300"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </h1>
            <p className="mt-1 text-sm text-white/55">
              {formatDate(status.created_at)}
              {content?.blocks.length ? ` · ${content.blocks.length} блоков` : ""}
            </p>
          </div>

          {fullResult && (
            <div className="flex shrink-0 gap-2">
              <button
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-2.5 text-sm font-medium text-white/75 transition-all hover:bg-white/[0.07] hover:text-white"
                onClick={async () => {
                  try {
                    const res = await fetch("/api/v1/audit", {
                      method: "POST",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ url: status.url, force: true }),
                    });
                    if (!res.ok) {
                      toast.error((await res.text()).slice(0, 120));
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
                Проверить снова
              </button>
              <button
                className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:brightness-110"
                onClick={async () => {
                  try {
                    const response = await fetch(`/api/v1/audit/${id}/pdf`);
                    if (!response.ok) {
                      toast.error(`Ошибка генерации PDF: ${(await response.text()).slice(0, 100)}`);
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
        </header>

        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_200px]">
          <main className="min-w-0 space-y-12">
            {ai && (
              <ReportSummary
                ai={ai}
                index={status.readiness_index ?? 0}
                category={status.readiness_category ?? ""}
                criticalCount={fullResult?.critical_issues_count ?? 0}
              />
            )}

            {ai && content && (
              <>
                {sec("start") && (
                  <Section id="start" number={sec("start")!.number} title="С чего начать"
                    lead="Три правки, которые сильнее всего повлияют на заявки. Остальное — ниже по отчёту.">
                    <StartHere items={content.priorities} />
                  </Section>
                )}

                {sec("diagnosis") && ai.strategic_diagnosis && (
                  <Section id="diagnosis" number={sec("diagnosis")!.number} title="Главная проблема">
                    <StrategicDiagnosis data={ai.strategic_diagnosis} />
                  </Section>
                )}

                {sec("rewrites") && (
                  <Section id="rewrites" number={sec("rewrites")!.number} title="Готовые тексты"
                    lead="Можно сразу передать разработчику или вставить в конструктор сайта.">
                    <ReadyRewrites items={content.rewrites} />
                  </Section>
                )}

                {sec("blocks") && (
                  <Section id="blocks" number={sec("blocks")!.number} title="Разбор по блокам"
                    lead="Каждый блок страницы сверху вниз: что сейчас, что мешает и как исправить.">
                    <div className="space-y-3">
                      {content.blocks.map((block) => (
                        <BlockAnalysisCard key={block.block_order} block={block} />
                      ))}
                    </div>
                  </Section>
                )}

                {sec("pros") && (
                  <Section id="pros" number={sec("pros")!.number} title="Сильные и слабые стороны">
                    <ProsCons strengths={content.strengths} weaknesses={content.weaknesses} />
                  </Section>
                )}

                {sec("missing") && ai.missing_elements && (
                  <Section id="missing" number={sec("missing")!.number} title="Чего не хватает"
                    lead="Блоки и элементы, которых нет на странице, по степени важности.">
                    <MissingElements data={ai.missing_elements} />
                  </Section>
                )}

                {sec("categories") && (
                  <Section id="categories" number={sec("categories")!.number} title="Категории подробно">
                    <div className="space-y-3">
                      {content.detailKeys.map((key) => {
                        const meta = CATEGORY_META[key];
                        return (
                          <div key={key} id={`cat-${key}`} className="scroll-mt-24">
                            <CategoryCard title={meta.title} icon={ICON_MAP[meta.icon]} data={ai[key] as never} />
                          </div>
                        );
                      })}
                    </div>
                  </Section>
                )}
              </>
            )}

            <Section id="speed" number={sec("speed")!.number} title="Скорость загрузки">
              <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
                <SpeedMetrics data={fullResult?.speed_data ?? EMPTY_SPEED} />
              </div>
            </Section>

            {sec("context") && content && (
              <Section id="context" number={sec("context")!.number} title="О странице">
                <details className="group rounded-2xl border border-white/[0.08] bg-white/[0.02]">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 text-sm font-medium text-white/80">
                    Как сервис понял ваш бизнес и аудиторию
                    <ChevronDown className="h-4 w-4 shrink-0 text-white/50 transition-transform group-open:rotate-180" aria-hidden />
                  </summary>
                  <dl className="grid gap-3 px-5 pb-5 sm:grid-cols-2">
                    {content.context.map(({ label, value }) => (
                      <div key={label} className="rounded-xl border border-white/[0.06] bg-white/[0.03] px-4 py-3">
                        <dt className="mb-1 text-xs font-semibold uppercase tracking-wide text-white/50">{label}</dt>
                        <dd className="text-sm leading-relaxed text-white/75">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </details>
              </Section>
            )}

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="text-base font-bold text-white">Проверить другой сайт</h2>
              <AuditForm className="mt-4" />
            </div>
          </main>

          <aside className="hidden lg:block">
            <ReportToc items={toc} />
          </aside>
        </div>
      </div>
    </div>
  );
}
