import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(new URL("..", import.meta.url).pathname);
const workerPath = resolve(projectRoot, "dist/server/index.js");
const assets = [
  ["__HERO_IMAGE_DATA_URL__", "assets/hero-transit-case.webp", "image/webp"],
  ["__PRODUCT_H200_DATA_URL__", "assets/products/h200.webp", "image/webp"],
  ["__PRODUCT_RTX_PRO_6000_DATA_URL__", "assets/products/rtx-pro-6000.webp", "image/webp"],
  ["__PRODUCT_DGX_SPARK_DATA_URL__", "assets/products/dgx-spark.webp", "image/webp"],
  ["__PRODUCT_SAMSUNG_32_DATA_URL__", "assets/products/samsung-32gb.webp", "image/webp"],
  ["__PRODUCT_SAMSUNG_64_DATA_URL__", "assets/products/samsung-64gb.webp", "image/webp"],
  ["__STAVA_TEXTURE_DATA_URL__", "assets/stava/felt_brush.png", "image/png"],
  ["__ARCHIVO_FONT_DATA_URL__", "assets/stava/archivo-var.woff2", "font/woff2"],
  ["__CHIVO_FONT_DATA_URL__", "assets/stava/chivo-300-900.woff2", "font/woff2"],
  ["__CHIVO_MONO_FONT_DATA_URL__", "assets/stava/chivo-mono-var.woff2", "font/woff2"],
  ["__SYNCOPATE_FONT_DATA_URL__", "assets/stava/syncopate-700.woff2", "font/woff2"],
];

let source = await readFile(workerPath, "utf8");
for (const [placeholder, relativePath, mime] of assets) {
  if (!source.includes(placeholder)) {
    throw new Error(`${placeholder} is missing from dist/server/index.js`);
  }
  const data = await readFile(resolve(projectRoot, relativePath));
  source = source.replace(placeholder, `data:${mime};base64,${data.toString("base64")}`);
}

await writeFile(workerPath, source);
