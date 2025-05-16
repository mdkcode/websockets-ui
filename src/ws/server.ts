import { WebSocketServer } from "ws";
import { handleLogin } from "./login.js";
import { GameCommands } from "./commands.js";
import { CommandHandler } from "./types.js";
import { handleCreateRoom } from "./room.js";

const commandHandlers: Partial<Record<GameCommands, CommandHandler>> = {
  [GameCommands.REG]: handleLogin,
  [GameCommands.CREATE_ROOM]: handleCreateRoom,
};

let playerCounter = 0;

export const getWsServerStarted = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on("connection", (ws) => {
    const playerId = ++playerCounter;
    console.log(`Player ${playerId} joined`);

    ws.on("message", (message) => {
      console.log("Command:", message.toString());
      try {
        const parsedMessage = JSON.parse(message.toString());
        const handler = commandHandlers[parsedMessage.type as GameCommands];
        handler?.({ ws, message: parsedMessage, playerId });
      } catch (err) {
        console.error("Invalid JSON:", message.toString());
      }
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
