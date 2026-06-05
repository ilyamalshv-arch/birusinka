// Кастомный лоадер next/image для статического экспорта.
// На GitHub Pages сайт живёт на /birusinka/, поэтому к путям картинок нужно
// добавлять префикс репозитория — иначе /assets/... отдаёт 404.
// Локально NEXT_PUBLIC_BASE_PATH пуст → пути остаются как есть.
export default function imageLoader({ src }) {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return `${base}${src}`;
}
