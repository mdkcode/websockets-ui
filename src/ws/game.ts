import { GameCommands } from "./commands.js";
import { gameBoard } from "./gameBoard.js";
import { CommandRequest } from "./types.js";
import { sockets } from "./ws-players.js";

export const handleAttack = ({ ws, message }: CommandRequest) => {
  const { gameId, x, y, indexPlayer } = JSON.parse(message.data);
};

export const handleTurn = (gameId: string | number) => {
  const game = gameBoard[gameId];
  const currentPlayer = game.currentTurn;
  if (!game) return;
  const message = JSON.stringify({
    id: 0,
    type: GameCommands.TURN,
    data: JSON.stringify({
      currentPlayer,
    }),
  });
  const ws = sockets[+currentPlayer!];
  if (ws?.readyState === ws.OPEN) {
    ws.send(message);
  }
};
