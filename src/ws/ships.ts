import { GameCommands } from "./commands.js";
import { gameBoard } from "./gameBoard.js";
import { CommandRequest, Ship } from "./types.js";

export const handleAddShips = ({ ws, message }: CommandRequest) => {
  const { gameId, ships, indexPlayer } = JSON.parse(message.data);
  const key = gameId.toString();
  if (!gameBoard[key]) {
    gameBoard[key] = { players: {} };
  }
  gameBoard[key].players[indexPlayer] = ships as Ship[];
  if (Object.keys(gameBoard[key].players).length === 2) {
    for (const [playerId, ships] of Object.entries(gameBoard[key].players)) {
      ws.send(
        JSON.stringify([
          {
            id: 0,
            type: GameCommands.START_GAME,
            data: JSON.stringify({
              gameId,
              ships,
              currentPlayerIndex: playerId,
            }),
          },
        ])
      );
    }
  }
};
