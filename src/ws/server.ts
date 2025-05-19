import { WebSocketServer } from "ws";
import { handleLogin } from "./login.js";
import { GameCommands } from "./commands.js";
import { CommandHandler } from "./types.js";
import { handleAddUserToRoom, handleCreateRoom } from "./room.js";
import { handleAddShips } from "./ships.js";
import { sockets } from "./ws-players.js";
import { handleAttack } from "./game.js";

const commandHandlers: Partial<Record<GameCommands, CommandHandler>> = {
  [GameCommands.REG]: handleLogin,
  [GameCommands.CREATE_ROOM]: handleCreateRoom,
  [GameCommands.ADD_USER_TO_ROOM]: handleAddUserToRoom,
  [GameCommands.ADD_SHIPS]: handleAddShips,
  [GameCommands.ATTACK]: handleAttack,
};

let playerCounter = 0;

export const getWsServerStarted = () => {
  const wss = new WebSocketServer({ port: 3000 });

  wss.on("connection", (ws) => {
    const playerId = ++playerCounter;
    sockets[playerId] = ws;
    console.log(`Player${playerId} joined`);

    ws.on("message", (message) => {
      console.log("Command:", message.toString());
      try {
        const parsedMessage = JSON.parse(message.toString());
        const handler = commandHandlers[parsedMessage.type as GameCommands];
        handler?.({ ws, message: parsedMessage, playerId });
      } catch (err) {
        console.log(err);
      }
    });

    ws.on("close", () => {
      console.log(`Player${playerId} left`);
      delete sockets[playerId];
    });

    ws.on("error", (err) => {
      console.error("WebSocket error:", err);
    });
  });

  console.log("WebSocket server started on port 3000");
};
