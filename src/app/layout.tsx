import type { Metadata } from "next";
import { montserrat } from "./fonts";
import CookieBanner from "./components/CookieBanner";
import "./globals.css";

export const metadata: Metadata = {
  title: "Бирюсинка — ёлочные игрушки ручной работы",
  description:
    "Фабрика «Бирюсинка» уже более 90 лет создаёт ёлочные игрушки ручной работы из стекла.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={montserrat.className}>
        {children}
        <CookieBanner />
      </body>
    </html>
  );
}
