#!/usr/bin/env node
// Детальная сверка: оверлей (рендер 50% поверх макета) + посекционные склейки
// (сверху Figma, снизу мой рендер) в одинаковом масштабе 1920. Запуск: node compare.mjs

import sharp from "sharp";

const W = 1920;
const FIGMA = "figma/node-607-7007.png"; // десктоп «итоговый вариант» (scale 2)
const RENDER = "figma/_render-desktop.png";

const fb = await sharp(FIGMA).resize({ width: W }).png().toBuffer();
const rb = await sharp(RENDER).resize({ width: W }).png().toBuffer();
const fh = (await sharp(fb).metadata()).height;
const rh = (await sharp(rb).metadata()).height;
console.log(`figma ${W}×${fh}, render ${W}×${rh}  (разница по высоте: ${rh - fh})`);

// Полный оверлей (двоение = расхождение).
const H = Math.min(fh, rh);
const base = await sharp(fb).extract({ left: 0, top: 0, width: W, height: H }).toBuffer();
const top = await sharp(rb).extract({ left: 0, top: 0, width: W, height: H }).ensureAlpha(0.5).png().toBuffer();
await sharp(base).composite([{ input: top }]).png().toFile("figma/_overlay.png");
console.log("оверлей -> figma/_overlay.png");

// Посекционные склейки в координатах макета (frame-Y, 0 = верх фрейма).
const crops = {
  "_cmp-header": [0, 150],
  "_cmp-hero": [140, 760],
  "_cmp-novinki": [800, 1470],
  "_cmp-promo": [2950, 3480],
  "_cmp-footer": [3430, Math.min(4249, fh)],
};

for (const [name, [y0, y1]] of Object.entries(crops)) {
  const h = y1 - y0;
  const f = await sharp(fb).extract({ left: 0, top: y0, width: W, height: h }).png().toBuffer();
  const my0 = Math.min(y0, Math.max(0, rh - 1));
  const mh = Math.min(h, rh - my0);
  const r = await sharp(rb).extract({ left: 0, top: my0, width: W, height: mh }).png().toBuffer();
  await sharp({ create: { width: W, height: h + mh + 8, channels: 3, background: "#888888" } })
    .composite([
      { input: f, top: 0, left: 0 },
      { input: r, top: h + 8, left: 0 },
    ])
    .png()
    .toFile(`figma/${name}.png`);
  console.log(`${name}  (сверху Figma, снизу рендер)`);
}
console.log("done");
