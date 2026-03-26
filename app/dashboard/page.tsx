import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { DashboardClient } from "./DashboardClient";

export const metadata = { title: "Мои аудиты" };

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login?callbackUrl=/dashboard");
  }

  return (
    <div className="min-h-screen bg-gray-50/40">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-black text-gray-900">Мои аудиты</h1>
            <p className="text-sm text-gray-400 mt-1">
              Привет, {session.user.name ?? session.user.email}
            </p>
          </div>
          <Link
            href="/"
            className="inline-flex items-center gap-2 rounded-xl bg-brand-600 text-white text-sm font-semibold px-5 py-2.5 hover:bg-brand-700 transition-colors"
          >
            + Новый аудит
          </Link>
        </div>

        <DashboardClient />
      </div>
    </div>
  );
}
