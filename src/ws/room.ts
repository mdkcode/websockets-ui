import { CommandRequest } from "./types.js";
import { GameCommands } from "./commands.js";

let games = 0;
const rooms: {
  roomId: number | string;
  roomUsers: {
    name: string;
    index: number | string;
  }[];
}[] = [];

export const handleCreateRoom = ({ ws, playerId }: CommandRequest) => {
  rooms.push({
    roomId: playerId,
    roomUsers: [
      {
        name: playerId.toString(),
        index: playerId,
      },
    ],
  });
  ws.send(
    JSON.stringify({
      id: 0,
      type: GameCommands.UPDATE_ROOM,
      data: JSON.stringify(rooms),
    })
  );
};

export const handleAddUserToRoom = ({
  ws,
  message,
  playerId,
}: CommandRequest) => {
  const { indexRoom } = JSON.parse(message.data);
  rooms.push({
    roomId: playerId,
    roomUsers: [
      {
        name: playerId.toString(),
        index: playerId,
      },
    ],
  });
  rooms.splice(indexRoom, 1);
  ws.send(
    JSON.stringify({
      type: GameCommands.CREATE_GAME,
      id: 0,
      data: JSON.stringify({
        idGame: ++games,
        idPlayer: playerId,
      }),
    })
  );
};
