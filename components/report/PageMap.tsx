"use client";
/* eslint-disable @next/next/no-img-element */

import { useRef, useState } from "react";
import { BlockAnalysisCard } from "@/components/audit/BlockAnalysisCard";
import type { BlockRegion, MediaImage, PageBlockAnalysis } from "@/types/audit";
import { mediaUrl } from "@/types/audit";
import { cn } from "@/lib/utils";

const CAPTURE_WIDTH = 1440;

export function PageMap({
  auditId,
  image,
  regions,
  blocks,
  site,
}: {
  auditId: string;
  image?: MediaImage;
  regions: BlockRegion[];
  blocks: PageBlockAnalysis[];
  site: string;
}) {
  const [active, setActive] = useState<number | null>(null);
  const [open, setOpen] = useState<Set<number>>(new Set());
  const scroller = useRef<HTMLDivElement>(null);

  const scale = image ? image.width / CAPTURE_WIDTH : 1;
  const placed = image
    ? regions
        .map((r) => ({ ...r, y: (r.top * scale) / image.height, h: (r.height * scale) / image.height }))
        .filter((r) => r.y < 1)
    : [];

  const toggle = (order: number) =>
    setOpen((prev) => {
      const next = new Set(prev);
      if (next.has(order)) next.delete(order);
      else next.add(order);
      return next;
    });

  const focusFromImage = (order: number) => {
    setActive(order);
    setOpen((prev) => new Set(prev).add(order));
    requestAnimationFrame(() =>
      document.getElementById(`block-${order}`)?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  };

  const focusFromCard = (order: number) => {
    setActive(order);
    toggle(order);
    const r = placed.find((p) => p.block_order === order);
    const box = scroller.current;
    if (r && box) {
      const imgH = box.scrollHeight;
      box.scrollTo({ top: Math.max(0, r.y * imgH - 24), behavior: "smooth" });
    }
  };

  const cards = (
    <div className="space-y-3">
      {blocks.map((block) => (
        <BlockAnalysisCard
          key={block.block_order}
          block={block}
          open={open.has(block.block_order)}
          onToggle={() => focusFromCard(block.block_order)}
          active={active === block.block_order}
        />
      ))}
    </div>
  );

  if (!image || placed.length === 0) return cards;

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,300px)_minmax(0,1fr)]">
      <figure className="min-w-0 lg:sticky lg:top-24 lg:self-start">
        <div className="overflow-hidden rounded-xl border border-white/10 bg-[#111]">
          <div className="flex items-center gap-1 border-b border-white/10 px-3 py-2">
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="h-2 w-2 rounded-full bg-white/25" />
            <span className="ml-2 truncate text-xs text-white/50">{site}</span>
          </div>
          <div ref={scroller} className="relative max-h-[60vh] overflow-y-auto overscroll-contain lg:max-h-[calc(100vh-12rem)]">
            <div className="relative">
              <img
                src={mediaUrl(auditId, image.file)}
                width={image.width}
                height={image.height}
                alt={`Страница ${site} целиком`}
                className="block h-auto w-full"
                loading="lazy"
              />
              {placed.map((r) => (
                <button
                  key={r.block_order}
                  onClick={() => focusFromImage(r.block_order)}
                  aria-label={`Блок ${r.block_order}: открыть разбор`}
                  className={cn(
                    "group absolute inset-x-0 cursor-pointer border-y-2 border-dashed transition-colors focus:outline-none",
                    active === r.block_order
                      ? "border-indigo-400 bg-indigo-500/20"
                      : "border-transparent hover:border-indigo-300/70 hover:bg-indigo-500/10",
                  )}
                  style={{ top: `${r.y * 100}%`, height: `${Math.max(r.h * 100, 1.2)}%` }}
                >
                  <span
                    className={cn(
                      "absolute left-2 top-1.5 flex h-6 w-6 items-center justify-center rounded-md text-xs font-bold shadow-lg ring-1",
                      active === r.block_order
                        ? "bg-indigo-500 text-white ring-indigo-300"
                        : "bg-amber-300 text-black ring-black/20",
                    )}
                  >
                    {r.block_order}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
        <figcaption className="mt-2 text-xs leading-relaxed text-white/50">
          Нажмите на номер на скриншоте — откроется разбор этого блока.
        </figcaption>
      </figure>
      {cards}
    </div>
  );
}
