import { CheckCircle2, XCircle } from "lucide-react";

function List({ title, items, good }: { title: string; items: string[]; good: boolean }) {
  const Icon = good ? CheckCircle2 : XCircle;
  return (
    <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
      <h3 className={`flex items-center gap-2 text-sm font-bold ${good ? "text-emerald-400" : "text-red-400"}`}>
        <Icon className="h-4 w-4" aria-hidden />
        {title}
      </h3>
      <ul className="mt-4 space-y-3">
        {items.map((t, i) => (
          <li key={i} className="flex gap-2.5 text-sm leading-relaxed text-white/75">
            <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${good ? "bg-emerald-400" : "bg-red-400"}`} />
            {t}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ProsCons({ strengths, weaknesses }: { strengths: string[]; weaknesses: string[] }) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {strengths.length > 0 && <List title="Что уже работает" items={strengths} good />}
      {weaknesses.length > 0 && <List title="Что мешает заявкам" items={weaknesses} good={false} />}
    </div>
  );
}
