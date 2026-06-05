#!/usr/bin/env node
// Детальная сверка В НАТИВНОМ 2× по элементам (слева макет, справа рендер) + пробы цвета.
import sharp from "sharp";

const F = "figma/node-607-7007.png"; // макет 2× (3840 wide)
const R = "figma/_render-desktop.png"; // рендер 2×

async function stack(name, reg) {
  const f = await sharp(F).extract(reg).png().toBuffer();
  const r = await sharp(R).extract(reg).png().toBuffer();
  await sharp({
    create: { width: reg.width * 2 + 16, height: reg.height, channels: 3, background: "#888888" },
  })
    .composite([
      { input: f, top: 0, left: 0 },
      { input: r, top: 0, left: reg.width + 16 },
    ])
    .png()
    .toFile(`figma/${name}.png`);
  console.log(`${name} (слева макет, справа рендер)`);
}

// Карточка 1 «Новинки» (frame 90..510 × 916..1462, ×2).
await stack("_zoom-card", { left: 170, top: 1820, width: 900, height: 1150 });
// Иконки шапки справа (Александр/user/heart/cart) ×2.
await stack("_zoom-headicons", { left: 2980, top: 110, width: 860, height: 190 });
// Логотип + начало меню ×2.
await stack("_zoom-logo", { left: 150, top: 120, width: 900, height: 180 });

// Пробы среднего цвета по сплошным заливкам в РЕНДЕРЕ (сверяем с токенами).
const samples = {
  "фон страницы (ожид #f4f3f1)": { left: 60, top: 600, width: 30, height: 30 },
  "плашка цены ink (ожид #193b64)": { left: 230, top: 2760, width: 16, height: 16 },
};
for (const [label, reg] of Object.entries(samples)) {
  try {
    const s = await sharp(R).extract(reg).removeAlpha().stats();
    const [r, g, b] = s.channels.map((c) => Math.round(c.mean));
    const hex = "#" + [r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("");
    console.log(`  ${label}: ${hex}`);
  } catch (e) {
    console.log(`  ${label}: ошибка ${e.message}`);
  }
}
console.log("done");
