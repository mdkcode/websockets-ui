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

export type Ship = {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
};
export interface PlayerShips {
  gameId: number | string;
  ships: Ship[];
  indexPlayer: number | string;
}
