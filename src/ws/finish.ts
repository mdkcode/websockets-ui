import { winners, handleUpdateWinners } from "./winners.js";

export const handleFinishGame = (winPlayerId: number | string) => {
  winners[winPlayerId] = (winners[winPlayerId] || 0) + 1;
  handleUpdateWinners();
};
