import {useCallback, useReducer, useRef} from "react"
import Http from "Http"

const initialState = {
  messages: []
};

const READ_MESSAGES = 'READ_MESSAGES';
const ADD_MESSAGES = 'ADD_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';

function reducer(state, action) {
  switch (action.type) {
    case READ_MESSAGES:
      return {
        messages: state.messages.map(message => {
          if (!message.read) {
            message.read = true;
            return {...message};
          }
          return message;
        })
      };
    case ADD_MESSAGES:
      return {messages: [...action.payload, ...state.messages]};
    case ADD_MESSAGE:
      return !state.messages.some(item => item.id === action.payload.id)
        ? {messages: [...state.messages, action.payload]}
        : {messages: state.messages};
    default:
      throw new Error();
  }
}

const useMessages = (username) => {
  const [{messages}, dispatch] = useReducer(reducer, initialState);
  let newMessageHandler = useRef(null);
  let isFirstRender = useRef(true);

  const getMessages = (page) =>
    new Promise((resolve) => {
      Http.get(`/api/v1/dialogs/${username}?page=${page}`)
        .then(({data}) => {
          dispatch({
            type: ADD_MESSAGES,
            payload: data.data
          });
          resolve(data);
          if (isFirstRender.current)
            window.scrollTo(0, document.body.scrollHeight);
          isFirstRender.current = false;
        });
    });

  const readAllMessages = () => {
    dispatch({
      type: READ_MESSAGES
    })
  };

  const onNewMessage = (messageHandler) => {
    newMessageHandler.current = messageHandler;
  };

  const addMessage = useCallback((message) => {
    dispatch({
      type: ADD_MESSAGE,
      payload: message
    });
    newMessageHandler.current();
  }, []);

  return {
    messages,
    addMessage,
    getMessages,
    readAllMessages,
    onNewMessage,
    isFirstLoading: isFirstRender.current
  }
};

export default useMessages;
