"use client";

import { AlertCircle } from "lucide-react";
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
    dot: "🔴",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
  },
  important: {
    title: "Важно",
    dot: "🟡",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  nice_to_have: {
    title: "Желательно",
    dot: "🟢",
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
      <p className="text-xs font-semibold text-white/40 uppercase tracking-wide mt-3 first:mt-0 mb-1.5">
        {config.dot} {config.title}
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
            <p className="font-medium text-white/80">{item.element}</p>
            {item.why_needed && (
              <p className="text-xs text-white/40 mt-0.5">{item.why_needed}</p>
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
      <h3 className="flex items-center gap-2 text-sm font-bold text-white/80 mb-3">
        <AlertCircle className="h-4 w-4 text-orange-400" />
        Отсутствующие элементы на странице
      </h3>
      <ul className="space-y-2">
        {renderSection(critical, "critical", 0)}
        {renderSection(important, "important", critical.length * 0.06)}
        {renderSection(niceToHave, "nice_to_have", (critical.length + important.length) * 0.06)}
      </ul>
    </div>
  );
}
