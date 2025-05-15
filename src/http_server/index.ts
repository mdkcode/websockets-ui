import * as fs from "fs";
import * as path from "path";
import * as http from "http";
import { WebSocketServer } from "ws";

export const httpServer = http.createServer(function (req, res) {
  const __dirname = path.resolve(path.dirname(""));
  const file_path =
    __dirname + (req.url === "/" ? "/front/index.html" : "/front" + req.url);
  fs.readFile(file_path, function (err, data) {
    if (err) {
      res.writeHead(404);
      res.end(JSON.stringify(err));
      return;
    }
    res.writeHead(200);
    res.end(data);
  });
});

export const getWsServerStarted = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on("connection", (ws, req) => {
    console.log("Player joined:", req.socket.remoteAddress);

    ws.on("message", (message) => {
      console.log("Message:", message.toString());
    });

    ws.on("close", () => {
      console.log("Players left");
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  });

  console.log("WebSocket server started on port 3000");
};
