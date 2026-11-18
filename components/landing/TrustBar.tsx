import { Zap, ListChecks, MonitorSmartphone, ShieldCheck, PenLine } from "lucide-react";
import { ANALYSIS_TIME, SHOW_PRICING } from "@/lib/site";

const FACTS = [
  { icon: Zap, value: ANALYSIS_TIME, label: "среднее время анализа" },
  { icon: ListChecks, value: "15+ критериев", label: "оффер, CTA, доверие, скорость" },
  { icon: MonitorSmartphone, value: "Mobile + Desktop", label: "с реальными метриками скорости" },
  SHOW_PRICING
    ? { icon: ShieldCheck, value: "Гарантия возврата", label: "на платные отчёты" }
    : { icon: PenLine, value: "Готовые тексты", label: "замены для каждого блока" },
];

export function TrustBar() {
  return (
    <section className="border-y border-white/[0.06] bg-[#07070a] py-8">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 sm:px-6 md:grid-cols-4 lg:px-8">
        {FACTS.map(({ icon: Icon, value, label }) => (
          <div key={value} className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 ring-1 ring-indigo-400/20">
              <Icon className="h-5 w-5 text-indigo-300" aria-hidden />
            </div>
            <div>
              <p className="text-sm font-bold text-white sm:text-base">{value}</p>
              <p className="text-xs leading-snug text-white/60">{label}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
