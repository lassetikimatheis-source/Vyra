import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = process.cwd();
import { handleContact } from "./lib/contact.mjs";
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".jpg": "image/jpeg",
  ".webp": "image/webp",
  ".png": "image/png",
  ".mp4": "video/mp4",
};
const port = Number(process.env.PORT || 3000);
createServer(async (req, res) => {
  try {
    const pathname = decodeURIComponent(
      new URL(req.url, "http://localhost").pathname,
    );
    if (pathname === "/api/contact" && req.method === "GET") {
      const response = await handleContact(
        new Request(`http://localhost:${port}/api/contact`),
      );
      res.writeHead(response.status, Object.fromEntries(response.headers));
      res.end(await response.text());
      return;
    }
    const direct = resolve(
      root,
      "." + (pathname === "/" ? "/index.html" : pathname),
    );
    if (!direct.startsWith(root + sep)) {
      res.writeHead(403);
      res.end();
      return;
    }
    const route = pathname.replace(/^\/+|\/+$/g, "");
    const candidates = [
      direct,
      `${direct}.html`,
      resolve(direct, "index.html"),
      resolve(root, "pages", route, "index.html"),
    ];
    for (const path of candidates) {
      if (!path.startsWith(root + sep)) continue;
      try {
        const body = await readFile(path);
        res.writeHead(200, {
          "Content-Type": types[extname(path)] || "application/octet-stream",
        });
        res.end(body);
        return;
      } catch {
        /* Try the next route. */
      }
    }
    const notFound = await readFile(resolve(root, "404.html"));
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(notFound);
  } catch {
    res.writeHead(400);
    res.end("Ungültige Anfrage");
  }
}).listen(port, "0.0.0.0", () =>
  console.log(`Local: http://localhost:${port}`),
);
