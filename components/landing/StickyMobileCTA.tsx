"use client";

import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";

// Показывается на мобильных, когда ни одна форма проверки не видна на экране
export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const targets = ["#hero-form", "#preview-form", "#final-cta"]
      .map((s) => document.querySelector(s))
      .filter((el): el is Element => !!el);
    const onScreen = new Set<Element>();

    const observer = new IntersectionObserver((entries) => {
      for (const e of entries) {
        if (e.isIntersecting) onScreen.add(e.target);
        else onScreen.delete(e.target);
      }
      setVisible(onScreen.size === 0 && window.scrollY > 200);
    });
    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  const goToForm = () => {
    const form = document.querySelector<HTMLFormElement>("#hero-form");
    form?.scrollIntoView({ behavior: "smooth", block: "center" });
    form?.querySelector("input")?.focus({ preventScroll: true });
  };

  return (
    <div
      className={`fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-[#07070a]/90 px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur-lg transition-transform duration-300 motion-reduce:transition-none md:hidden ${
        visible ? "translate-y-0" : "translate-y-full"
      }`}
      aria-hidden={!visible}
    >
      <button
        onClick={goToForm}
        tabIndex={visible ? 0 : -1}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25"
      >
        Проверить сайт бесплатно
        <ArrowRight className="h-4 w-4" aria-hidden />
      </button>
    </div>
  );
}
