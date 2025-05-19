import { CommandRequest } from "./types.js";
import { GameCommands } from "./commands.js";
import { sockets } from "./ws-players.js";

export const rooms: {
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
        name: `player${playerId}`,
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

export const handleAddUserToRoom = ({ message, playerId }: CommandRequest) => {
  const { indexRoom } = JSON.parse(message.data);
  const room = rooms.find((r) => r.roomId === indexRoom);

  if (room) {
    room.roomUsers.push({
      name: playerId.toString(),
      index: playerId,
    });

    if (room.roomUsers.length >= 2) {
      room.roomUsers.forEach(({ index }) => {
        const socket = sockets[+index];
        socket.send(
          JSON.stringify({
            type: GameCommands.CREATE_GAME,
            id: 0,
            data: JSON.stringify({
              idGame: indexRoom,
              idPlayer: index,
            }),
          })
        );
      });
      rooms.splice(indexRoom, 1);
    }
  }
};
