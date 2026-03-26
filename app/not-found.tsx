import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4 text-center">
      <p className="text-6xl font-black text-gray-100 mb-4">404</p>
      <h2 className="text-xl font-bold text-gray-900 mb-2">Страница не найдена</h2>
      <p className="text-sm text-gray-400 mb-6">Возможно, она была удалена или перемещена.</p>
      <Link
        href="/"
        className="rounded-xl bg-brand-600 text-white text-sm font-semibold px-6 py-2.5 hover:bg-brand-700 transition-colors"
      >
        На главную
      </Link>
    </div>
  );
}
