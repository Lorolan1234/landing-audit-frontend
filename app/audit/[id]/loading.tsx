export default function AuditLoading() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="h-12 w-12 rounded-2xl bg-brand-600 animate-pulse" />
        <p className="text-sm text-gray-400">Загружаем результаты...</p>
      </div>
    </div>
  );
}
