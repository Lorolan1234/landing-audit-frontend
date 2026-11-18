import Link from "next/link";
import { ArrowDown, ArrowRight, ArrowUp, Check, Info, X } from "lucide-react";
import { CATEGORY_META, type ChangedCheck, type CheckStatus, type ReportComparison } from "@/types/audit";
import { cn, formatDate } from "@/lib/utils";
import { tone10, tone100 } from "./score";

const STATUS_LABEL: Record<CheckStatus, string> = { pass: "пройдено", partial: "частично", fail: "провалено" };

function plural(n: number, one: string, few: string, many: string) {
  const m10 = n % 10, m100 = n % 100;
  if (m10 === 1 && m100 !== 11) return one;
  if (m10 >= 2 && m10 <= 4 && (m100 < 10 || m100 >= 20)) return few;
  return many;
}

function Delta({ value, className }: { value: number; className?: string }) {
  if (value === 0) return <span className={cn("text-white/45", className)}>без изменений</span>;
  const up = value > 0;
  const Icon = up ? ArrowUp : ArrowDown;
  return (
    <span className={cn("inline-flex items-center gap-0.5 font-semibold tabular-nums", up ? "text-emerald-400" : "text-red-400", className)}>
      <Icon className="h-3.5 w-3.5" aria-hidden />
      {up ? "+" : "−"}{Math.abs(value)}
    </span>
  );
}

function CheckList({ title, items, good }: { title: string; items: ChangedCheck[]; good: boolean }) {
  const Icon = good ? Check : X;
  return (
    <div className="min-w-0 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <p className="text-sm font-semibold text-white">
        {title} <span className="font-normal text-white/45">· {items.length}</span>
      </p>
      <ul className="mt-3 space-y-2.5">
        {items.map((c) => (
          <li key={c.id} className="flex items-start gap-2.5">
            <span className={cn("mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full", good ? "bg-emerald-500/15" : "bg-red-500/15")}>
              <Icon className={cn("h-3 w-3", good ? "text-emerald-400" : "text-red-400")} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm leading-snug text-white/85">
                {c.title}
                {c.critical && <span className="ml-1.5 rounded bg-red-500/15 px-1.5 py-px text-[11px] font-medium text-red-300">критично</span>}
              </p>
              <p className="mt-0.5 text-xs text-white/45">
                {c.category && CATEGORY_META[c.category] ? `${CATEGORY_META[c.category].title} · ` : ""}
                {STATUS_LABEL[c.before]} → {STATUS_LABEL[c.after]}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function BeforeAfter({ data }: { data: ReportComparison }) {
  const before = data.index_before ?? 0;
  const after = data.index_after ?? 0;
  const changed = data.fixed.length + data.worse.length + data.categories.length > 0 || before !== after;

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <div className="text-center">
            <p className="text-xs text-white/45">Было</p>
            <p className={cn("text-3xl font-bold tabular-nums", tone100(before).text)}>{data.index_before ?? "—"}</p>
          </div>
          <ArrowRight className="h-5 w-5 text-white/30" aria-hidden />
          <div className="text-center">
            <p className="text-xs text-white/45">Стало</p>
            <p className={cn("text-3xl font-bold tabular-nums", tone100(after).text)}>{data.index_after ?? "—"}</p>
          </div>
          <Delta value={after - before} className="ml-1 text-base" />
        </div>
        <p className="text-sm text-white/55">
          Прошлая проверка — {formatDate(data.created_at)}.{" "}
          <Link href={`/audit/${data.id}`} className="text-indigo-300 underline-offset-4 hover:underline">
            Открыть прошлый отчёт
          </Link>
        </p>
      </div>

      {!data.same_rubric && (
        <p className="flex items-start gap-2 text-sm text-white/55">
          <Info className="mt-0.5 h-4 w-4 shrink-0 text-white/40" aria-hidden />
          Между проверками обновилась методика оценки — часть разницы может быть из-за неё, а не из-за правок на сайте.
        </p>
      )}

      {data.categories.length > 0 && (
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
          {data.categories.map((c) => (
            <div key={c.key} className="flex items-center justify-between gap-3 rounded-xl border border-white/[0.06] px-4 py-2.5">
              <span className="truncate text-sm text-white/75">{CATEGORY_META[c.key]?.title ?? c.key}</span>
              <span className="flex shrink-0 items-center gap-2 text-sm tabular-nums">
                <span className={tone10(c.before).text}>{c.before}</span>
                <ArrowRight className="h-3 w-3 text-white/30" aria-hidden />
                <span className={cn("font-semibold", tone10(c.after).text)}>{c.after}</span>
                <Delta value={c.after - c.before} className="text-xs" />
              </span>
            </div>
          ))}
        </div>
      )}

      {(data.fixed.length > 0 || data.worse.length > 0) && (
        <div className="grid gap-4 md:grid-cols-2">
          {data.fixed.length > 0 && <CheckList title="Стало лучше" items={data.fixed} good />}
          {data.worse.length > 0 && <CheckList title="Стало хуже" items={data.worse} good={false} />}
        </div>
      )}

      <p className="text-sm text-white/55">
        {changed ? "" : "С прошлой проверки изменений на странице не нашли. "}
        {data.still_failing > 0
          ? `Ещё не исправлено: ${data.still_failing} ${plural(data.still_failing, "проверка", "проверки", "проверок")} — они в разделах ниже.`
          : "Всё, что было не так в прошлый раз, исправлено."}
      </p>
    </div>
  );
}
