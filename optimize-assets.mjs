#!/usr/bin/env node
// Сжатие растровых ассетов: сырые image fills из Figma приходят в огромном
// разрешении (баннер «акция» — 9 МБ). Ужимаем до 2× от размера отображения —
// это и вес страницы, и скорость отрисовки. Запуск: node optimize-assets.mjs

import sharp from "sharp";
import { readFile, writeFile } from "node:fs/promises";

const DIR = "public/assets";

// файл → максимальная ширина (2× от размера в макете).
const MAX = {
  "hero-mk.png": 2810, // отображается 1405
  "hero-akciya.png": 700, // 303
  "product-1.png": 820, // 410
  "product-2.png": 820,
  "product-3.png": 820,
  "product-4.png": 820,
  "star.png": 1010, // 505
  "logo-red.png": 720, // 237 (но исходник мелкий — пропустится)
  "logo-white.png": 720, // 323
  "badge-size.png": 200, // 67
  "tg.png": 96, // 34
};

for (const [file, maxW] of Object.entries(MAX)) {
  const path = `${DIR}/${file}`;
  const input = await readFile(path);
  const { width } = await sharp(input).metadata();
  if (width <= maxW) {
    console.log(`  skip  ${file} (${width}px)`);
    continue;
  }
  const out = await sharp(input).resize({ width: maxW }).png({ compressionLevel: 9 }).toBuffer();
  await writeFile(path, out);
  console.log(
    `  ${file}: ${width}→${maxW}px  ${(input.length / 1e6).toFixed(1)}→${(out.length / 1e6).toFixed(2)} МБ`,
  );
}

// Логотипы: сырые @3x-филлы имеют прозрачные поля вокруг — обрезаем, чтобы лого
// заполняло свой бокс (иначе в подвале выглядит мелким).
for (const f of ["logo-white", "logo-red"]) {
  const p = `${DIR}/${f}.png`;
  try {
    const input = await readFile(p);
    const before = await sharp(input).metadata();
    const out = await sharp(input).trim().png({ compressionLevel: 9 }).toBuffer();
    const after = await sharp(out).metadata();
    await writeFile(p, out);
    console.log(`  trim ${f}: ${before.width}×${before.height} → ${after.width}×${after.height}`);
  } catch (e) {
    console.log(`  trim ${f} пропущен: ${e.message}`);
  }
}
console.log("Готово.");
