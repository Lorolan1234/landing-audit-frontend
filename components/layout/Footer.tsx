export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-gray-50">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-md bg-brand-600 flex items-center justify-center">
              <span className="text-white font-bold text-xs">CP</span>
            </div>
            <span className="text-sm font-semibold text-gray-900">
              ConversionPulse
            </span>
          </div>

          <p className="text-sm text-gray-400">
            Диагностика конверсии посадочных страниц
          </p>

          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} ConversionPulse
          </p>
        </div>
      </div>
    </footer>
  );
}
