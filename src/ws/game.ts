import { GameCommands } from "./commands.js";
import { gameBoard } from "./gameBoard.js";
import { CommandRequest } from "./types.js";
import { sockets } from "./ws-players.js";

export const handleAttack = ({ ws, message }: CommandRequest) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(message.data);
};
