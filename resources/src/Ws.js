import Ws from "@adonisjs/websocket-client"

const ws = Ws('ws://localhost:3333');
ws
  .withJwtToken(localStorage.getItem('accessToken'))
  .connect();

export const types = {
  MESSAGE: 1,
  CONNECTION: 2,
  READ: 3,
  IS_TYPING: 4
};

export default ws;
