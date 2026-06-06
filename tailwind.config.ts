import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      // Цвета бренда из макета — единый источник (раньше были сырым hex по всему коду).
      // Альфа-варианты — через слэш: bg-brand/90, bg-tag/20 и т.п.
      colors: {
        brand: "#701518", // основной бордовый: шапка, подвал, акценты
        "brand-dark": "#681215", // карточка «Личный кабинет» в подвале
        ink: "#193b64", // синий: названия товаров, кнопка цены
        bg: "#f4f3f1", // фон страницы
        tag: "#6f1417", // плашка «Новинки», точки слайдера
      },
    },
  },
  plugins: [],
};

export default config;
