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
  ".png": "image/png",
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
    res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    res.end(
      '<!doctype html><html lang="de"><title>Seite nicht gefunden — Rhythm</title><body style="background:#0a0b0e;color:white;font-family:sans-serif;padding:60px"><h1>Hier geht es nicht weiter.</h1><p>Entdecke Rhythm auf der <a href="/" style="color:#b5a1e3">Startseite</a>.</p></body></html>',
    );
  } catch {
    res.writeHead(400);
    res.end("Ungültige Anfrage");
  }
}).listen(port, "0.0.0.0", () =>
  console.log(`Local: http://localhost:${port}`),
);
