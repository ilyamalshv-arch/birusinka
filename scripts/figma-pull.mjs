#!/usr/bin/env node
// Качалка точных данных из Figma по публичной ссылке ("Anyone can view").
// Нужен только ТВОЙ бесплатный personal access token (read-only) — Dev Mode не требуется.
//
// Запуск (PowerShell):
//   $env:FIGMA_TOKEN="figd_..."; node figma-pull.mjs file
//   $env:FIGMA_TOKEN="figd_..."; node figma-pull.mjs node 125-1248
//   $env:FIGMA_TOKEN="figd_..."; node figma-pull.mjs kids 125-1248
//   $env:FIGMA_TOKEN="figd_..."; node figma-pull.mjs img  125-1248 svg
//
// Другой файл без правки кода:  $env:FIGMA_FILE="<key>"; node figma-pull.mjs file
// Результат кладётся в ./figma/ (сырой JSON + читаемый спек + экспортированные картинки).

import { writeFile, mkdir } from "node:fs/promises";

const FILE_KEY = process.env.FIGMA_FILE || "n2ZfCLPj8T6AHkd6Nzipoo"; // birusinka
const TOKEN = process.env.FIGMA_TOKEN;
const OUT = "./figma";

if (!TOKEN) {
  console.error("Нет токена. Сделай: $env:FIGMA_TOKEN=\"figd_...\"  и запусти снова.");
  process.exit(1);
}

async function api(path) {
  const res = await fetch(`https://api.figma.com/v1${path}`, {
    headers: { "X-Figma-Token": TOKEN },
  });
  if (!res.ok) {
    const body = await res.text();
    console.error(`\nFigma API ${res.status} ${res.statusText}\n${body}\n`);
    if (res.status === 403)
      console.error(
        "403 = токен невалиден ИЛИ файл не открыт для просмотра по ссылке.\n" +
          "Проверь, что у файла стоит Anyone -> can view, и что токен скопирован целиком.",
      );
    process.exit(1);
  }
  return res.json();
}

// --- helpers: превращаем сырой узел в человекочитаемый спек ---
const hex = (c) =>
  c
    ? "#" +
      [c.r, c.g, c.b]
        .map((v) => Math.round(v * 255).toString(16).padStart(2, "0"))
        .join("") +
      (c.a !== undefined && c.a < 1
        ? Math.round(c.a * 255).toString(16).padStart(2, "0")
        : "")
    : "—";

function paintToStr(p) {
  if (!p) return "—";
  if (p.type === "SOLID") return hex({ ...p.color, a: p.opacity ?? p.color.a });
  if (p.type?.startsWith("GRADIENT")) {
    const stops = (p.gradientStops || [])
      .map((s) => `${hex(s.color)} ${Math.round(s.position * 100)}%`)
      .join(", ");
    return `${p.type} [${stops}]`;
  }
  if (p.type === "IMAGE") return `IMAGE(${p.imageRef?.slice(0, 8)}…)`;
  return p.type;
}

function specOf(n) {
  const out = [];
  const b = n.absoluteBoundingBox;
  if (b) out.push(`${Math.round(b.width)}×${Math.round(b.height)} @ (${Math.round(b.x)},${Math.round(b.y)})`);
  if (n.layoutMode && n.layoutMode !== "NONE") {
    const pad = [n.paddingTop, n.paddingRight, n.paddingBottom, n.paddingLeft]
      .map((v) => v ?? 0)
      .join("/");
    out.push(`flex ${n.layoutMode.toLowerCase()} gap:${n.itemSpacing ?? 0} pad:${pad}`);
    if (n.primaryAxisAlignItems) out.push(`justify:${n.primaryAxisAlignItems}`);
    if (n.counterAxisAlignItems) out.push(`align:${n.counterAxisAlignItems}`);
  }
  const fills = (n.fills || []).filter((f) => f.visible !== false);
  if (fills.length) out.push(`fill:${fills.map(paintToStr).join(",")}`);
  const strokes = (n.strokes || []).filter((s) => s.visible !== false);
  if (strokes.length) out.push(`stroke:${strokes.map(paintToStr).join(",")} ${n.strokeWeight ?? ""}px`);
  const r = n.cornerRadius ?? (n.rectangleCornerRadii ? n.rectangleCornerRadii.join("/") : null);
  if (r) out.push(`radius:${r}`);
  if (n.style) {
    const s = n.style;
    // ВАЖНО: lineHeightPercentFontSize = % от РАЗМЕРА шрифта (то, что нужно для CSS).
    // lineHeightPercent — % от интринсик-высоты гарнитуры, для CSS бесполезен.
    const lh = s.lineHeightPercentFontSize
      ? Math.round(s.lineHeightPercentFontSize) + "%"
      : s.lineHeightPx
        ? Math.round(s.lineHeightPx) + "px"
        : "—";
    out.push(
      `font:${s.fontFamily} ${s.fontWeight}/${s.fontSize}px lh:${lh} ls:${s.letterSpacing ?? 0}${s.textCase ? " " + s.textCase : ""}`,
    );
  }
  if (n.characters) out.push(`text:"${n.characters.slice(0, 40).replace(/\n/g, "⏎")}"`);
  return out.join("  |  ");
}

function walk(n, depth = 0, max = 6, lines = []) {
  lines.push(`${"  ".repeat(depth)}▸ ${n.name} [${n.type}] {${n.id}}  ${specOf(n)}`);
  if (depth < max && n.children) for (const c of n.children) walk(c, depth + 1, max, lines);
  return lines;
}

const cmd = process.argv[2] || "file";
const arg = (process.argv[3] || "").replace(/-/g, ":"); // 125-1248 -> 125:1248
const depthArg = Number(process.argv[4]); // для node: глубина обхода
const fmt = process.argv[4] || "svg"; // для img: формат

await mkdir(OUT, { recursive: true });

if (cmd === "file") {
  const data = await api(`/files/${FILE_KEY}`);
  await writeFile(`${OUT}/file.json`, JSON.stringify(data, null, 2));
  console.log(`\nФайл: ${data.name}  (last modified ${data.lastModified})`);
  console.log("Страницы и фреймы верхнего уровня:\n");
  for (const page of data.document.children) {
    console.log(`  📄 ${page.name}`);
    for (const f of page.children || []) console.log(`      • ${f.name}  [${f.type}]`);
  }
  console.log(`\nСырой JSON -> ${OUT}/file.json`);
  console.log(`Дальше: node figma-pull.mjs node <id>  (id из node-id в URL, напр. 125-1248)`);
} else if (cmd === "kids") {
  // навигация: только прямые дети узла (id + имя + размер), без глубокого дерева
  const data = await api(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(arg)}&depth=2`);
  const node = data.nodes[arg]?.document;
  if (!node) {
    console.error(`Узел ${arg} не найден.`);
    process.exit(1);
  }
  console.log(`\n${node.name} [${node.type}] {${node.id}}\n`);
  for (const c of node.children || []) {
    const b = c.absoluteBoundingBox;
    const size = b ? `${Math.round(b.width)}×${Math.round(b.height)}` : "";
    console.log(`  {${c.id}}\t${size}\t${c.name} [${c.type}]`);
  }
} else if (cmd === "node") {
  const max = Number.isFinite(depthArg) ? depthArg : 6;
  const apiDepth = Number.isFinite(depthArg) ? `&depth=${max + 1}` : "";
  const data = await api(`/files/${FILE_KEY}/nodes?ids=${encodeURIComponent(arg)}${apiDepth}`);
  const node = data.nodes[arg]?.document;
  if (!node) {
    console.error(`Узел ${arg} не найден.`);
    process.exit(1);
  }
  await writeFile(`${OUT}/node-${arg.replace(/:/g, "-")}.json`, JSON.stringify(node, null, 2));
  const lines = walk(node, 0, max);
  await writeFile(`${OUT}/node-${arg.replace(/:/g, "-")}.spec.txt`, lines.join("\n"));
  console.log("\n" + lines.join("\n"));
  console.log(`\nСырой JSON -> ${OUT}/node-${arg.replace(/:/g, "-")}.json`);
  console.log(`Спек        -> ${OUT}/node-${arg.replace(/:/g, "-")}.spec.txt`);
} else if (cmd === "img") {
  const data = await api(`/images/${FILE_KEY}?ids=${encodeURIComponent(arg)}&format=${fmt}&scale=2`);
  const url = data.images[arg];
  if (!url) {
    console.error("Картинка не отрендерилась (проверь id).");
    process.exit(1);
  }
  const bin = Buffer.from(await (await fetch(url)).arrayBuffer());
  const file = `${OUT}/node-${arg.replace(/:/g, "-")}.${fmt}`;
  await writeFile(file, bin);
  console.log(`Экспортировано -> ${file}`);
} else {
  console.error("Команды: file | kids <id> | node <id> [depth] | img <id> [svg|png]");
  process.exit(1);
}
