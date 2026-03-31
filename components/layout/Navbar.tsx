"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "Возможности", href: "#features" },
  { label: "Как работает", href: "#how-it-works" },
];

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    if (href.startsWith("#")) {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        return;
      }
    }
    router.push(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#030303]/90 backdrop-blur-lg border-b border-white/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Лого */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center">
              <span className="text-white font-bold text-sm">CP</span>
            </div>
            <span className="text-lg font-bold text-white">
              Conversion<span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-300 to-rose-300">Pulse</span>
            </span>
          </Link>

          {/* Desktop навигация */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-sm font-medium text-white/50 hover:text-white transition-colors"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <button
              onClick={() => scrollTo("#hero-form")}
              className="rounded-lg bg-white/[0.08] border border-white/[0.1] px-4 py-2 text-sm font-semibold text-white hover:bg-white/[0.15] transition-all"
            >
              Проверить сайт
            </button>
          </div>

          {/* Mobile бургер */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-white/60"
            aria-label="Меню"
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile меню */}
      {mobileOpen && (
        <div className="md:hidden border-t border-white/[0.06] bg-[#030303]/95 backdrop-blur-lg">
          <div className="px-4 py-4 space-y-3">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="block w-full text-left text-sm font-medium text-white/60 hover:text-white py-2"
              >
                {link.label}
              </button>
            ))}
            <div className="pt-3 border-t border-white/[0.06] space-y-2">
              <button
                onClick={() => scrollTo("#hero-form")}
                className="w-full rounded-lg bg-gradient-to-r from-indigo-500 to-rose-500 px-4 py-2.5 text-sm font-semibold text-white hover:opacity-90 transition-all"
              >
                Проверить сайт
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
