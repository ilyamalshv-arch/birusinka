#!/usr/bin/env node
// Экспорт ассетов главной в public/assets/. Нужен $env:FIGMA_TOKEN.
//
// Два источника, чтобы обойти rate limit (429) render-эндпойнта:
//   • Растры (логотипы, баннеры, фото, звезда, бейдж, tg) — это image FILLS.
//     Берём их по imageRef через /files/:key/images (один дешёвый запрос,
//     сами файлы качаются с CDN — рендер не дёргаем вообще).
//   • Векторные иконки — рендерим в SVG через /images (мало и дёшево).

import { writeFile, mkdir } from "node:fs/promises";

const KEY = "n2ZfCLPj8T6AHkd6Nzipoo"; // birusinka
const TOKEN = process.env.FIGMA_TOKEN;
const OUT = "public/assets";

if (!TOKEN) {
  console.error('Нет токена: $env:FIGMA_TOKEN="figd_..."');
  process.exit(1);
}

// imageRef (из node-607-7007.json) → имя файла.
const FILLS = {
  "3dcdc44d15f1c37751b32b76feaa380e3a0a0a96": "logo-red",
  "dce457352f1758de0a9a706def5bb2a409d8f5b7": "logo-white",
  "5f905340f780a59a62d7f3aae840a782ed63860b": "hero-mk",
  "914ae5904ed82767c5778f195416f99c4979dab0": "hero-akciya",
  "47fa6f243d564c9787f17ecadae7b51c1beb9f07": "star",
  "09bc78e87b148f305b824f37167269022ddfa735": "product-1",
  "c2b2c492a70e1ae72a6b8801d115b62e1aff8868": "product-2",
  "77988eae83b166576c185baee03e0bdc9e6597b9": "product-3",
  "bfa598f60342a1d3ab64b52b1e5aa9f2b2520f27": "product-4",
  "126a375b6a18f22be7658aec6a59d95ea783b51d": "badge-size",
  "50dbfbbde1fb8ef1aa39d32cc18a65b7a783ee1a": "tg",
};

// node-id → имя SVG-иконки.
const SVG = {
  "607:7298": "icon-user",
  "607:7301": "icon-heart",
  "607:7303": "icon-cart",
  "607:7319": "icon-vk",
  "607:7290": "hero-arrow",
  "746:10209": "icon-section-arrow",
  "607:7100": "icon-info",
  "607:7103": "icon-cart-outline",
};

async function api(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { "X-Figma-Token": TOKEN },
  });
  if (!res.ok) throw new Error(`Figma API ${res.status}: ${await res.text()}`);
  return res.json();
}

async function save(url, file) {
  const buf = Buffer.from(await (await fetch(url)).arrayBuffer());
  await writeFile(file, buf);
}

async function downloadFills() {
  const { meta } = await api(`/files/${KEY}/images`); // { images: { ref: url } }
  for (const [ref, name] of Object.entries(FILLS)) {
    const url = meta.images[ref];
    if (!url) {
      console.log(`  MISS  ${name} (ref ${ref.slice(0, 8)}…)`);
      continue;
    }
    await save(url, `${OUT}/${name}.png`);
    console.log(`  ok    ${name}.png`);
  }
}

async function renderSvgs() {
  const ids = Object.keys(SVG);
  const params = new URLSearchParams({ ids: ids.join(","), format: "svg" });
  const { images } = await api(`/images/${KEY}?${params}`);
  for (const id of ids) {
    const url = images[id];
    if (!url) {
      console.log(`  MISS  ${SVG[id]}`);
      continue;
    }
    await save(url, `${OUT}/${SVG[id]}.svg`);
    console.log(`  ok    ${SVG[id]}.svg`);
  }
}

const onlySvg = process.argv[2] === "svg"; // `node export-assets.mjs svg` — только иконки

await mkdir(OUT, { recursive: true });
if (!onlySvg) {
  console.log("Растры (image fills):");
  try {
    await downloadFills();
  } catch (e) {
    console.error("  филлы не удались:", e.message);
  }
}
console.log("Иконки (SVG render):");
try {
  await renderSvgs();
} catch (e) {
  console.error("  SVG не удались (вероятно rate limit, повторю позже):", e.message);
}
console.log("Готово -> public/assets/");
