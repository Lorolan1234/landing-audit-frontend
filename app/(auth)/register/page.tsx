"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Mail, Lock, User, BarChart2 } from "lucide-react";
import { toast } from "sonner";
import { apiClient } from "@/lib/api";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

const schema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  email: z.string().email("Некорректный email"),
  password: z.string().min(6, "Минимум 6 символов"),
});

type FormData = z.infer<typeof schema>;

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      // Регистрация через бэкенд
      await apiClient.post("/auth/register", data);

      // Автоматический вход после регистрации
      const result = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false,
      });

      if (result?.ok) {
        toast.success("Аккаунт создан! Добро пожаловать.");
        router.push("/dashboard");
      } else {
        toast.success("Аккаунт создан! Войдите.");
        router.push("/login");
      }
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Ошибка регистрации");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        {/* Логотип */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 font-bold text-gray-900">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-brand-600">
              <BarChart2 className="h-5 w-5 text-white" />
            </div>
            <span>Landing Audit</span>
          </Link>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-1">Создать аккаунт</h1>
          <p className="text-sm text-gray-400 mb-6">
            Уже есть аккаунт?{" "}
            <Link href="/login" className="text-brand-600 hover:underline font-medium">
              Войти
            </Link>
          </p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              {...register("name")}
              label="Имя"
              placeholder="Иван Иванов"
              leftIcon={<User className="h-4 w-4" />}
              error={errors.name?.message}
              disabled={loading}
            />
            <Input
              {...register("email")}
              label="Email"
              type="email"
              placeholder="you@example.com"
              leftIcon={<Mail className="h-4 w-4" />}
              error={errors.email?.message}
              disabled={loading}
            />
            <Input
              {...register("password")}
              label="Пароль"
              type="password"
              placeholder="Минимум 6 символов"
              leftIcon={<Lock className="h-4 w-4" />}
              error={errors.password?.message}
              disabled={loading}
            />

            <Button type="submit" loading={loading} className="w-full mt-2" size="lg">
              Зарегистрироваться
            </Button>
          </form>

          <p className="mt-4 text-xs text-gray-400 text-center">
            Регистрируясь, вы соглашаетесь с условиями использования сервиса.
          </p>
        </div>
      </div>
    </div>
  );
}
