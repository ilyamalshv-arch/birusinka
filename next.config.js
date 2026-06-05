/** @type {import('next').NextConfig} */
const isPages = process.env.GITHUB_PAGES === "true";

const baseImages = {
  // Свои SVG-иконки отдаём через next/image (это наши доверенные файлы).
  dangerouslyAllowSVG: true,
  contentDispositionType: "attachment",
  contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
};

// Прод-сборка для GitHub Pages: статический экспорт + префикс пути репозитория.
// Картинки префиксуются кастомным лоадером (см. image-loader.js).
const nextConfig = isPages
  ? {
      output: "export",
      basePath: "/birusinka",
      assetPrefix: "/birusinka/",
      images: {
        ...baseImages,
        loader: "custom",
        loaderFile: "./image-loader.js",
      },
    }
  : {
      images: { ...baseImages, unoptimized: true },
    };

module.exports = nextConfig;
