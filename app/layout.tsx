import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { Providers } from "./providers";
import { Navbar } from "@/components/layout/Navbar";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "ConversionPulse — диагностика конверсии вашего сайта",
    template: "%s | ConversionPulse",
  },
  description:
    "ConversionPulse показывает конкретные проблемы вашей посадочной страницы и даёт готовые правки с рекомендациями — от критичных до косметических.",
  keywords: ["аудит лендинга", "анализ сайта", "конверсия", "CRO", "платный трафик", "диагностика сайта"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "ConversionPulse",
    title: "ConversionPulse — диагностика конверсии вашего сайта",
    description: "Покажем конкретные проблемы вашего сайта и дадим готовые рекомендации по правкам.",
    url: "https://www.conversionpulse.ru",
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="ru" className={inter.variable}>
      <body>
        <Providers session={session}>
          <Navbar />
          <main>{children}</main>
          <Toaster position="top-right" richColors closeButton />
        </Providers>
      </body>
    </html>
  );
}
