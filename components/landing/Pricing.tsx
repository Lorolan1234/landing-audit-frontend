"use client";

import { motion } from "framer-motion";
import { Check, ShieldCheck, ArrowRight } from "lucide-react";
import { CONTACT_URL } from "@/lib/site";
import { cn } from "@/lib/utils";

interface Plan {
  name: string;
  audience: string;
  price: string;
  period?: string;
  features: string[];
  free?: boolean;
  highlighted?: boolean;
  badge?: string;
}

const PLANS: Plan[] = [
  {
    name: "Бесплатно",
    audience: "Чтобы понять, есть ли проблема",
    price: "0 ₽",
    free: true,
    features: [
      "1 проверка",
      "Индекс готовности 0–100",
      "Главная стратегическая проблема",
      "Топ-3 правки с приоритетами",
    ],
  },
  {
    name: "Полный отчёт",
    audience: "Для владельцев бизнеса",
    price: "390 ₽",
    period: "разово",
    highlighted: true,
    badge: "Оптимально",
    features: [
      "Поблочный разбор всей страницы",
      "Готовые тексты замены для каждого блока",
      "PDF, который можно отдать разработчику",
      "Повторная проверка после правок",
      "Гарантия возврата 14 дней",
    ],
  },
  {
    name: "Пакет 10 отчётов",
    audience: "Для маркетологов и агентств",
    price: "2 490 ₽",
    period: "249 ₽ за отчёт",
    features: [
      "10 полных отчётов",
      "Без срока действия",
      "Для любых сайтов и клиентов",
      "История проверок",
      "Гарантия возврата 14 дней",
    ],
  },
  {
    name: "Неделя",
    audience: "Когда правите сайт прямо сейчас",
    price: "1 490 ₽",
    period: "7 дней",
    features: [
      "До 30 полных отчётов в сутки",
      "Проверяйте после каждой правки",
      "Сравнение «до и после»",
      "PDF для разработчика",
      "Гарантия возврата 14 дней",
    ],
  },
];

function scrollToForm() {
  document.querySelector("#hero-form")?.scrollIntoView({ behavior: "smooth", block: "center" });
}

function PlanButton({ plan }: { plan: Plan }) {
  const base =
    "mt-6 flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300";

  if (plan.free) {
    return (
      <button onClick={scrollToForm} className={cn(base, "cursor-pointer border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]")}>
        Проверить бесплатно
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    );
  }
  const style = plan.highlighted
    ? "bg-gradient-to-r from-indigo-500 to-violet-500 text-white shadow-lg shadow-indigo-500/25 hover:brightness-110"
    : "border border-white/15 bg-white/[0.06] text-white hover:bg-white/[0.1]";

  if (!CONTACT_URL) {
    return (
      <button disabled className={cn(base, style, "cursor-not-allowed opacity-60")}>
        Скоро
      </button>
    );
  }
  return (
    <a href={CONTACT_URL} target="_blank" rel="noopener noreferrer" className={cn(base, style)}>
      Оставить заявку
      <ArrowRight className="h-4 w-4" aria-hidden />
    </a>
  );
}

export function Pricing() {
  return (
    <section id="pricing" className="bg-[#0c0c11] py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <motion.div
          className="mx-auto mb-12 max-w-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">Тарифы</h2>
          <p className="mt-4 text-lg text-white/65">
            Начните бесплатно. Платите, только когда нужен полный разбор.
          </p>
        </motion.div>

        <div className="grid items-start gap-6 md:grid-cols-2 lg:grid-cols-4">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border p-6",
                plan.highlighted
                  ? "border-indigo-400/40 bg-indigo-500/[0.06] shadow-xl shadow-indigo-500/10"
                  : "border-white/[0.08] bg-white/[0.02]",
              )}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              {plan.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-gradient-to-r from-indigo-500 to-violet-500 px-3 py-1 text-xs font-semibold text-white">
                  {plan.badge}
                </span>
              )}
              <h3 className="text-lg font-bold text-white">{plan.name}</h3>
              <p className="mt-1 min-h-10 text-sm text-white/60">{plan.audience}</p>
              <p className="mt-5 flex flex-wrap items-baseline gap-x-1.5">
                <span className="whitespace-nowrap text-4xl font-extrabold text-white">{plan.price}</span>
                {plan.period && <span className="text-sm text-white/60">{plan.period}</span>}
              </p>
              <PlanButton plan={plan} />
              <ul className="mt-6 space-y-3 border-t border-white/[0.08] pt-6">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white/80">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" aria-hidden />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mx-auto mt-8 flex max-w-3xl flex-col items-center gap-3 rounded-2xl border border-emerald-400/20 bg-emerald-500/[0.05] p-5 text-center sm:flex-row sm:text-left">
          <ShieldCheck className="h-8 w-8 shrink-0 text-emerald-400" aria-hidden />
          <p className="text-sm leading-relaxed text-white/80">
            <span className="font-semibold text-white">Гарантия возврата.</span> Если в платном
            отчёте не окажется ни одной полезной для вас правки — напишите в течение 14 дней,
            и мы вернём деньги.
          </p>
        </div>

        <p className="mt-6 text-center text-sm text-white/60">
          Агентствам: отчёты с вашим логотипом и командный доступ — по запросу.
        </p>
      </div>
    </section>
  );
}
