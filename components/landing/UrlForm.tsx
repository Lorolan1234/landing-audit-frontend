"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Globe, ArrowRight, Loader2 } from "lucide-react";
import { createAudit } from "@/lib/api";
import { cn } from "@/lib/utils";

function friendlyError(message: string): string {
  if (/резолв|resolve|Недопустимый URL|недоступ/i.test(message)) {
    return "Не удалось открыть сайт. Проверьте адрес — например, example.ru";
  }
  return message || "Не удалось запустить проверку. Попробуйте ещё раз";
}

export function UrlForm({
  id,
  buttonLabel = "Проверить бесплатно",
  className,
}: {
  id?: string;
  buttonLabel?: string;
  className?: string;
}) {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const errorId = id ? `${id}-error` : undefined;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    let normalized = url.trim();
    if (!normalized) {
      setError("Вставьте ссылку на сайт");
      return;
    }
    if (!/^https?:\/\//i.test(normalized)) normalized = "https://" + normalized;
    try {
      const parsed = new URL(normalized);
      if (!parsed.hostname.includes(".")) throw new Error();
    } catch {
      setError("Похоже, это не адрес сайта. Пример: example.ru");
      return;
    }

    setLoading(true);
    try {
      const result = await createAudit(normalized);
      router.push(`/audit/${result.id}`);
    } catch (err: unknown) {
      setError(friendlyError(err instanceof Error ? err.message : ""));
      setLoading(false);
    }
  };

  return (
    <form id={id} onSubmit={handleSubmit} noValidate className={cn("w-full", className)}>
      <div className="flex flex-col sm:flex-row gap-3">
        <label className="relative flex-1">
          <span className="sr-only">Адрес сайта</span>
          <Globe
            aria-hidden
            className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50"
          />
          <input
            type="text"
            inputMode="url"
            autoComplete="url"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              setError("");
            }}
            placeholder="ваш-сайт.ru"
            disabled={loading}
            aria-invalid={!!error}
            aria-describedby={error ? errorId : undefined}
            className={cn(
              "h-12 w-full rounded-xl border bg-white/[0.06] pl-11 pr-4 text-base text-white placeholder:text-white/40 transition-colors",
              "focus:outline-none focus:ring-2 focus:ring-indigo-400/60 focus:border-transparent disabled:opacity-60",
              error ? "border-red-400/60" : "border-white/15 hover:border-white/25",
            )}
          />
        </label>
        <button
          type="submit"
          disabled={loading}
          className="inline-flex h-12 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 px-6 text-sm font-semibold text-white shadow-lg shadow-indigo-500/25 transition-all hover:shadow-indigo-500/40 hover:brightness-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-300 focus-visible:ring-offset-2 focus-visible:ring-offset-[#07070a] disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden />
              Запускаем…
            </>
          ) : (
            <>
              {buttonLabel}
              <ArrowRight className="h-4 w-4" aria-hidden />
            </>
          )}
        </button>
      </div>
      {error && (
        <p id={errorId} role="alert" className="mt-2 text-left text-sm text-red-400">
          {error}
        </p>
      )}
    </form>
  );
}
