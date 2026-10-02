import { createReadStream } from "node:fs";
import { stat } from "node:fs/promises";
import { createServer } from "node:http";
import { extname, resolve, sep } from "node:path";
import { clearTimeout, setTimeout } from "node:timers";
import { URL } from "node:url";

const root = resolve(".");
const types = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".ico": "image/x-icon",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".pdf": "application/pdf",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".xml": "application/xml; charset=utf-8",
};

export function createStaticServer({ port = 4173, autoCloseMs = 0 } = {}) {
  let idleTimer;
  const server = createServer(async (request, response) => {
    clearTimeout(idleTimer);
    if (autoCloseMs) {
      response.on("finish", () => {
        idleTimer = setTimeout(() => server.close(), autoCloseMs);
      });
    }

    const pathname = decodeURIComponent(
      new URL(request.url, "http://localhost").pathname,
    );
    const requested = resolve(
      root,
      pathname === "/" ? "index.html" : `.${pathname}`,
    );
    if (requested !== root && !requested.startsWith(`${root}${sep}`)) {
      response.writeHead(403).end("Forbidden");
      return;
    }

    try {
      const details = await stat(requested);
      if (!details.isFile()) throw new Error("Not a file");
      response.writeHead(200, {
        "Content-Type": types[extname(requested)] || "application/octet-stream",
      });
      createReadStream(requested).pipe(response);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  server.listen(port, "127.0.0.1");
  return server;
}
