import Ws from "@adonisjs/websocket-client";
import store from 'store';
import {addUnreadDialog} from "./store/actions/auth";

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
        store.dispatch(addUnreadDialog(message.owner_id));
    });
  }
}

store.subscribe(handleChange);

export const types = {
  MESSAGE: 1,
  CONNECTION: 2,
  READ: 3,
  IS_TYPING: 4
};

const ws = Ws('ws://localhost:3333');

export default ws;
