import { Montserrat, Montserrat_Alternates } from "next/font/google";

// Основной шрифт — Montserrat (с кириллицей). Применяется через className.
export const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

// Акцентный — Montserrat Alternates (меню, названия товаров).
export const montserratAlt = Montserrat_Alternates({
  subsets: ["latin", "cyrillic"],
  weight: ["500"],
  display: "swap",
});
