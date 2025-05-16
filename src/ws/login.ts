import { WebSocket } from "ws";
import { GameCommands } from "./commands.js";
import { CommandMessage, CommandRequest } from "./types.js";

const validLoginData = {
  login: "admin",
  password: "123456",
};

export const handleLogin = ({ ws, message, playerId }: CommandRequest) => {
  const { name, password } = JSON.parse(message.data);

  const doesLoginMatch =
    name === validLoginData.login && password === validLoginData.password;

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
};
