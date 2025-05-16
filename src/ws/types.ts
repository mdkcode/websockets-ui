import { WebSocket } from "ws";
import { GameCommands } from "./commands.js";

export type CommandMessage = {
  type: GameCommands;
  data: string;
  id: number;
};

export type CommandRequest = {
  ws: WebSocket;
  message: CommandMessage;
  playerId: number;
};

export type CommandHandler = (req: CommandRequest) => void;
