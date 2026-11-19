import { readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const projectRoot = resolve(new URL("..", import.meta.url).pathname);
const workerPath = resolve(projectRoot, "dist/server/index.js");
const imagePath = resolve(projectRoot, "assets/hero-transit-case.webp");

const [source, image] = await Promise.all([
  readFile(workerPath, "utf8"),
  readFile(imagePath),
]);

const dataUrl = `data:image/webp;base64,${image.toString("base64")}`;
if (!source.includes("__HERO_IMAGE_DATA_URL__")) {
  throw new Error("Hero image placeholder is missing from dist/server/index.js");
}

await writeFile(workerPath, source.replace("__HERO_IMAGE_DATA_URL__", dataUrl));
