export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#030303]">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-gradient-to-br from-indigo-500 to-rose-500 flex items-center justify-center">
              <span className="text-white font-bold text-xs">CP</span>
            </div>
            <span className="text-sm font-semibold text-white">
              ConversionPulse
            </span>
          </div>
          <p className="text-sm text-white/30">
            Диагностика конверсии посадочных страниц
          </p>
          <p className="text-sm text-white/30">
            © {new Date().getFullYear()} ConversionPulse
          </p>
        </div>
      </div>
    </footer>
  );
}
