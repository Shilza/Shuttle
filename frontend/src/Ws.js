import Ws from "@adonisjs/websocket-client";
import store from './store';

let ws = Ws(`ws://localhost:${process.env.BACKEND_PORT || 3333}`);

const selectCurrentUserId = (state) => state.auth.user.id;

let currentUserId;

function handleChange() {
  let previousUserId = currentUserId;
  currentUserId = selectCurrentUserId(store.getState());
  if (previousUserId !== currentUserId) {
    ws
      .withJwtToken(localStorage.getItem('accessToken'))
      .connect();

    const topicName = `dialogs:${currentUserId}`;
    const wsThread = ws.subscribe(topicName);

    wsThread.on('message', ({type, message}) => {
      const arr = window.location.href.split('/');
      if (type === types.MESSAGE && message.owner_id !== currentUserId && arr[arr.length - 2] !== 'messages')
        store.dispatch.auth.addUnreadDialog(message.owner_id);
    });
  }
}

store.subscribe(handleChange);

export const types = {
  MESSAGE: 'MESSAGE',
  CONNECTION: 'CONNECTION',
  READ: 'READ',
  IS_TYPING: 'IS_TYPING',
  ERROR: 'ERROR',
  DELETE: 'DELETE'
};

export const start = () => {

};

export default ws;
