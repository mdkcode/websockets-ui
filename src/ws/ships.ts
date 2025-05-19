import { GameCommands } from "./commands.js";
import { handleTurn } from "./game.js";
import { gameBoard } from "./gameBoard.js";
import { CommandRequest, Ship } from "./types.js";
import { sockets } from "./ws-players.js";

export const handleAddShips = ({ message }: CommandRequest) => {
  const { gameId, ships, indexPlayer } = JSON.parse(message.data);
  const key = gameId.toString();
  if (!gameBoard[key]) {
    gameBoard[key] = { players: {} };
  }
  gameBoard[key].players[indexPlayer] = ships as Ship[];
  if (Object.keys(gameBoard[key].players).length === 2) {
    const [firstPlayerId] = Object.keys(gameBoard[key].players);
    gameBoard[key].currentTurn = +firstPlayerId;
    for (const [playerId, ships] of Object.entries(gameBoard[key].players)) {
      const socket = sockets[+playerId];
      socket.send(
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

  handleTurn(gameId);
};
