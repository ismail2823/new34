import { createServer } from "node:http";
import { createBareServer } from "@tomphttp/bare-server-node";
import { webSocket } from "wisp-server-node";
import express from "express";
import { fileURLToPath } from "url";
import { join, dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const bare = createBareServer("/bare/");
const app = express();

// Serves files from your /public folder
app.use(express.static(join(__dirname, "public")));

// Fallback to index.html for the proxy UI
app.use((req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

const server = createServer();

server.on("request", (req, res) => {
  if (bare.shouldRoute(req)) {
    bare.routeRequest(req, res);
  } else {
    app(req, res);
  }
});

server.on("upgrade", (req, socket, head) => {
  if (bare.shouldRoute(req)) {
    bare.routeUpgrade(req, socket, head);
  } else if (req.url.endsWith("/wisp/")) {
    webSocket.routeRequest(req, socket, head);
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 8000;
server.listen(PORT, () => {
  console.log(`🌐 Proxy running on http://localhost:${PORT}`);
});
