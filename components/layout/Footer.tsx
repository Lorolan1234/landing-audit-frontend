import Link from "next/link";

const LINKS = [
  { label: "Как работает", href: "/#how-it-works" },
  { label: "Тарифы", href: "/#pricing" },
  { label: "Вопросы", href: "/#faq" },
];

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#07070a] pb-24 md:pb-0">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
        <div>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-gradient-to-br from-indigo-500 to-violet-500">
              <span className="text-xs font-bold text-white">CP</span>
            </div>
            <span className="font-semibold text-white">ConversionPulse</span>
          </div>
          <p className="mt-2 text-sm text-white/60">Аудит конверсии посадочных страниц</p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {LINKS.map((l) => (
            <Link key={l.href} href={l.href} className="text-white/70 transition-colors hover:text-white">
              {l.label}
            </Link>
          ))}
        </nav>
        <p className="text-sm text-white/50">© {new Date().getFullYear()} ConversionPulse</p>
      </div>
    </footer>
  );
}
