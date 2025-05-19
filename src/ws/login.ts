import { GameCommands } from "./commands.js";
import { rooms } from "./room.js";
import { CommandRequest } from "./types.js";
import { handleUpdateWinners } from "./winners.js";

const validLoginData = [
  { login: "player1", password: "123456" },
  { login: "player2", password: "112233" },
];

export const handleLogin = ({ ws, message, playerId }: CommandRequest) => {
  const { name, password } = JSON.parse(message.data);

  const doesLoginMatch = validLoginData.some(
    (user) => user.login === name && user.password === password
  );

  ws.send(
    JSON.stringify({
      type: GameCommands.REG,
      data: JSON.stringify({
        name,
        index: playerId,
        error: !doesLoginMatch,
        errorText: !doesLoginMatch && "Incorrect login data",
      }),
      id: 0,
    })
  );
  handleUpdateWinners();
  if (rooms.length > 0)
    ws.send(
      JSON.stringify({
        id: 0,
        type: GameCommands.UPDATE_ROOM,
        data: JSON.stringify(rooms),
      })
    );
};
