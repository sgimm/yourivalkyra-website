import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const sourceDir = path.resolve("image-sources");
const outputDir = path.resolve("assets/images");
const supported = new Set([".png", ".jpg", ".jpeg", ".webp"]);

const profileFor = name => name.startsWith("IMG-03")
  ? { width: 800, height: 800, quality: 82 }
  : name === "IMG-04"
    ? { width: 900, height: 1600, quality: 84 }
    : { width: 1600, height: 1600, quality: 82 };

await mkdir(sourceDir, { recursive: true });
await mkdir(outputDir, { recursive: true });

const files = (await readdir(sourceDir, { withFileTypes: true }))
  .filter(entry => entry.isFile() && supported.has(path.extname(entry.name).toLowerCase()));

if (files.length === 0) {
  console.log("No image sources found; keeping the existing optimized assets.");
  process.exit(0);
}

for (const file of files) {
  const id = path.parse(file.name).name;
  const profile = profileFor(id);
  const output = path.join(outputDir, `${id}.webp`);

  await sharp(path.join(sourceDir, file.name))
    .rotate()
    .resize({
      width: profile.width,
      height: profile.height,
      fit: "inside",
      withoutEnlargement: true
    })
    .webp({ quality: profile.quality, effort: 6 })
    .toFile(output);

  console.log(`${file.name} -> assets/images/${id}.webp`);
}
