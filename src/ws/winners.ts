import { GameCommands } from "./commands.js";
import { sockets } from "./ws-players.js";

export const winners: Record<string, number> = {};

export const handleUpdateWinners = () => {
  const winnerList = Object.entries(winners).map(([name, wins]) => ({
    name,
    wins,
  }));
  Object.values(sockets).forEach((socket) => {
    if (socket.readyState === socket.OPEN) {
      socket.send(
        JSON.stringify({
          type: GameCommands.UPDATE_WINNERS,
          id: 0,
          data: JSON.stringify(winnerList),
        })
      );
    }
  });
};
