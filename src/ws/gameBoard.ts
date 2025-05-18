import { Ship } from "./types.js";

export const gameBoard: {
  [gameId: string]: {
    players: {
      [playerId: string]: Ship[];
    };
  };
} = {};
