import { Ship } from "./types.js";

export const gameBoard: Record<
  string,
  {
    players: Record<string, Ship[]>;
    currentTurn?: string | number;
  }
> = {};
