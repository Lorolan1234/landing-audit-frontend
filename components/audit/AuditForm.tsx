"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Search, Globe } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { createAudit } from "@/lib/api";

const schema = z.object({
  url: z
    .string()
    .min(1, "Введите URL")
    .refine((v) => {
      const u = v.startsWith("http") ? v : `https://${v}`;
      try { new URL(u); return true; } catch { return false; }
    }, "Введите корректный URL"),
});

type FormData = z.infer<typeof schema>;

interface AuditFormProps {
  className?: string;
  size?: "default" | "hero";
}

export function AuditForm({ className = "", size = "default" }: AuditFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const audit = await createAudit(data.url);
      router.push(`/audit/${audit.id}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка запуска аудита");
      setLoading(false);
    }
  };

  const isHero = size === "hero";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={`flex flex-col sm:flex-row gap-3 ${className}`}
    >
      <div className="flex-1">
        <Input
          {...register("url")}
          placeholder="https://example.com"
          leftIcon={<Globe className="h-4 w-4" />}
          error={errors.url?.message}
          className={isHero ? "h-14 text-base rounded-2xl" : ""}
          disabled={loading}
        />
      </div>
      <Button
        type="submit"
        loading={loading}
        size={isHero ? "lg" : "md"}
        className={isHero ? "h-14 rounded-2xl px-10 shrink-0 sm:self-start" : "shrink-0 sm:self-start"}
      >
        <Search className={isHero ? "h-5 w-5" : "h-4 w-4"} />
        {loading ? "Запуск..." : "Проверить сайт"}
      </Button>
    </form>
  );
}
