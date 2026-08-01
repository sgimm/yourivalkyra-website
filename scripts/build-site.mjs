import { cp, mkdir, rm } from "node:fs/promises";
import path from "node:path";

const outputDir = path.resolve("dist");
const publicFiles = [
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "assets",
  "gallery",
  "imprint",
  "music",
  "privacy",
  "support",
  "universe",
  "youri"
];

await rm(outputDir, { recursive: true, force: true });
await mkdir(outputDir, { recursive: true });

for (const source of publicFiles) {
  await cp(path.resolve(source), path.join(outputDir, source), {
    recursive: true
  });
}

console.log(`Built ${publicFiles.length} public entries in dist/.`);
