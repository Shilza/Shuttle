import Http from "../../../Http"
import {useCallback, useReducer, useRef} from "react"

const initialState = {messages: []};

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
      return {messages: [...state.messages, action.payload]};
    default:
      throw new Error();
  }
}

const useMessages = (username) => {
  const [{messages}, dispatch] = useReducer(reducer, initialState);
  let newMessageHandler = useRef(null);

  const getMessages = (page) => {
    return new Promise((resolve) => {
      Http.get(`/api/v1/dialogs/${username}?page=${page}`)
        .then(({data}) => {
          dispatch({
            type: ADD_MESSAGES,
            payload: data.data
          });
          resolve(data);
        });
    });
  }

  const readAllMessages = () => {
    dispatch({
      type: READ_MESSAGES
    })
  };

  const onNewMessage = (messageHandler) => {
    newMessageHandler.current = messageHandler;
  }

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
    onNewMessage
  }
}

export default useMessages;
