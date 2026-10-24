import { mkdir, copyFile, cp, rm } from "node:fs/promises";
await rm("dist", { recursive: true, force: true });
await mkdir("dist", { recursive: true });
for (const file of [
  "index.html",
  "404.html",
  "robots.txt",
  "sitemap.xml",
  "styles.css",
  "app.js",
  "depth.js",
  "contact.js",
  "site-config.js",
  "impressum.html",
  "datenschutz.html",
])
  await copyFile(file, `dist/${file}`);
await cp("assets", "dist/assets", { recursive: true });
await cp("pages", "dist", { recursive: true });
console.log("Built static website → dist");
