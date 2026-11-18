"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export interface TocItem {
  id: string;
  label: string;
}

export function ReportToc({ items }: { items: TocItem[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const els = items
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => !!el);
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.scrollY < 200) {
          setActive(items[0]?.id);
          return;
        }
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length) {
          visible.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-20% 0px -65% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    const onScroll = () => {
      if (window.scrollY < 200 && items[0]) setActive(items[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [items.map((i) => i.id).join(",")]);

  return (
    <nav aria-label="Разделы отчёта" className="sticky top-24">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-white/40">Содержание</p>
      <ul className="space-y-0.5 border-l border-white/10">
        {items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "true" : undefined}
              className={cn(
                "-ml-px block border-l-2 py-1.5 pl-4 text-sm transition-colors",
                active === item.id
                  ? "border-indigo-400 font-medium text-white"
                  : "border-transparent text-white/55 hover:text-white/85",
              )}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
