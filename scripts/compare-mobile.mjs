#!/usr/bin/env node
// Сравнение мобильной версии: слева макет Figma (375), справа мой рендер.
import sharp from "sharp";

const W = 375;
const f = await sharp("figma/node-1428-6613.png").resize({ width: W }).png().toBuffer();
const r = await sharp("figma/_render-mobile.png").resize({ width: W }).png().toBuffer();
const fh = (await sharp(f).metadata()).height;
const rh = (await sharp(r).metadata()).height;
const H = Math.max(fh, rh);
console.log(`figma ${W}×${fh}, render ${W}×${rh}`);

const pad = async (buf) =>
  sharp({ create: { width: W, height: H, channels: 3, background: "#888888" } })
    .composite([{ input: buf, top: 0, left: 0 }])
    .png().toBuffer();

await sharp({ create: { width: W * 2 + 8, height: H, channels: 3, background: "#888888" } })
  .composite([
    { input: await pad(f), top: 0, left: 0 },
    { input: await pad(r), top: 0, left: W + 8 },
  ])
  .png()
  .toFile("figma/_cmp-mobile.png");
console.log("сравнение -> figma/_cmp-mobile.png (слева Figma, справа сайт)");
