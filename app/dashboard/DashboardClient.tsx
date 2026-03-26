"use client";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { ExternalLink, AlertTriangle, CheckCircle2, Clock, XCircle, Loader2 } from "lucide-react";
import { listAudits } from "@/lib/api";
import { cn, shortUrl, formatDate, getIndexColor } from "@/lib/utils";
import { Badge } from "@/components/ui/Badge";
import type { AuditListItem, AuditStatus } from "@/types/audit";

function StatusBadge({ status }: { status: AuditStatus }) {
  const map: Record<AuditStatus, { label: string; variant: "default" | "success" | "warning" | "danger" | "info" }> = {
    pending:    { label: "Ожидание",  variant: "default" },
    processing: { label: "Анализ...", variant: "info" },
    completed:  { label: "Готово",    variant: "success" },
    failed:     { label: "Ошибка",    variant: "danger" },
  };
  const { label, variant } = map[status];
  return <Badge variant={variant}>{label}</Badge>;
}

function AuditRow({ audit }: { audit: AuditListItem }) {
  const isCompleted = audit.status === "completed";

  return (
    <Link
      href={`/audit/${audit.id}`}
      className="flex items-center gap-4 rounded-2xl border border-gray-100 bg-white px-5 py-4 shadow-sm hover:shadow-md transition-shadow duration-200 group"
    >
      {/* Индекс */}
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gray-50">
        {isCompleted && audit.readiness_index !== null ? (
          <span className={cn("text-xl font-black", getIndexColor(audit.readiness_index))}>
            {audit.readiness_index}
          </span>
        ) : audit.status === "processing" ? (
          <Loader2 className="h-5 w-5 text-brand-500 animate-spin" />
        ) : audit.status === "failed" ? (
          <XCircle className="h-5 w-5 text-red-400" />
        ) : (
          <Clock className="h-5 w-5 text-gray-300" />
        )}
      </div>

      {/* Основная инфо */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold text-gray-800 truncate group-hover:text-brand-600 transition-colors">
            {shortUrl(audit.url, 50)}
          </p>
          <ExternalLink className="h-3.5 w-3.5 text-gray-300 shrink-0" />
        </div>
        <div className="flex items-center gap-3 mt-1">
          <StatusBadge status={audit.status} />
          {isCompleted && audit.readiness_category && (
            <span className="text-xs text-gray-400">{audit.readiness_category}</span>
          )}
          {audit.has_blockers && (
            <span className="flex items-center gap-1 text-xs text-red-500 font-medium">
              <AlertTriangle className="h-3 w-3" />
              стоп-факторы
            </span>
          )}
        </div>
      </div>

      {/* Дата и критичные */}
      <div className="text-right shrink-0 hidden sm:block">
        <p className="text-xs text-gray-400">{formatDate(audit.created_at)}</p>
        {isCompleted && audit.critical_issues_count > 0 && (
          <p className="text-xs text-red-500 font-medium mt-1">
            {audit.critical_issues_count} критичных
          </p>
        )}
      </div>
    </Link>
  );
}

export function DashboardClient() {
  const { data: audits, isLoading, error, refetch } = useQuery({
    queryKey: ["audits"],
    queryFn: () => listAudits({ limit: 50 }),
    refetchInterval: (query) => {
      const list = query.state.data;
      const hasProcessing = list?.some(
        (a) => a.status === "pending" || a.status === "processing",
      );
      return hasProcessing ? 5000 : false;
    },
  });

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="h-8 w-8 text-brand-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-6 text-center text-sm text-red-600">
        Ошибка загрузки аудитов.{" "}
        <button onClick={() => refetch()} className="underline">
          Попробовать снова
        </button>
      </div>
    );
  }

  if (!audits?.length) {
    return (
      <div className="rounded-2xl border border-dashed border-gray-200 bg-white py-16 text-center">
        <CheckCircle2 className="mx-auto h-10 w-10 text-gray-200 mb-4" />
        <p className="text-gray-500 font-medium">Пока нет аудитов</p>
        <p className="text-sm text-gray-400 mt-1 mb-6">
          Запустите первый анализ с главной страницы
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-brand-700 transition-colors"
        >
          Начать аудит
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {audits.map((audit) => (
        <AuditRow key={audit.id} audit={audit} />
      ))}
    </div>
  );
}
