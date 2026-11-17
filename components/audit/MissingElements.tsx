"use client";

import { motion } from "framer-motion";

interface MissingElement {
  element: string;
  why_needed?: string;
  priority?: string;
}

interface MissingElementsData {
  critical?: MissingElement[];
  important?: MissingElement[];
  nice_to_have?: MissingElement[];
}

interface MissingElementsProps {
  data: MissingElementsData;
}

const SECTION_CONFIG = {
  critical: {
    title: "Критично",
    dot: "bg-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
  },
  important: {
    title: "Важно",
    dot: "bg-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  nice_to_have: {
    title: "Желательно",
    dot: "bg-emerald-400",
    border: "border-green-500/20",
    bg: "bg-green-500/5",
  },
} as const;

function renderSection(
  items: MissingElement[],
  sectionKey: keyof typeof SECTION_CONFIG,
  startDelay: number,
) {
  if (!items || items.length === 0) return null;
  const config = SECTION_CONFIG[sectionKey];

  return (
    <>
      <p className="mt-4 mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-white/55 first:mt-0">
        <span className={`h-2 w-2 rounded-full ${config.dot}`} aria-hidden />
        {config.title}
      </p>
      {items.map((item, i) => (
        <motion.li
          key={`${sectionKey}-${i}`}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: startDelay + i * 0.06 }}
          className={`flex gap-3 text-sm rounded-lg border ${config.border} ${config.bg} px-4 py-3`}
        >
          <div className="min-w-0">
            <p className="font-medium text-white/90">{item.element}</p>
            {item.why_needed && (
              <p className="mt-1 text-sm leading-relaxed text-white/60">{item.why_needed}</p>
            )}
          </div>
        </motion.li>
      ))}
    </>
  );
}

export function MissingElements({ data }: MissingElementsProps) {
  const critical = data.critical ?? [];
  const important = data.important ?? [];
  const niceToHave = data.nice_to_have ?? [];
  const totalCount = critical.length + important.length + niceToHave.length;

  if (totalCount === 0) return null;

  return (
    <div>
      <ul className="space-y-2">
        {renderSection(critical, "critical", 0)}
        {renderSection(important, "important", critical.length * 0.06)}
        {renderSection(niceToHave, "nice_to_have", (critical.length + important.length) * 0.06)}
      </ul>
    </div>
  );
}
