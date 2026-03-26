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
    default: "Landing Audit — анализ лендингов для платного трафика",
    template: "%s | Landing Audit",
  },
  description:
    "Автоматический аудит посадочных страниц с AI-анализом по 10 критериям. Узнайте, готов ли ваш лендинг к платному трафику, прежде чем слить бюджет.",
  keywords: ["аудит лендинга", "анализ сайта", "CRO", "конверсия", "платный трафик"],
  openGraph: {
    type: "website",
    locale: "ru_RU",
    siteName: "Landing Audit",
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
