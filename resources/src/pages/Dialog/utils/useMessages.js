import {useCallback, useReducer, useRef} from "react"
import {PostsService} from 'services';
import {DialogsService} from 'services';
import {getImagesUrl} from "./getImagesUrl";

const getPostCode = (text) => {
  const postMatches = text.match(/^https?:\/\/([^/?#]+)(?:[/?#]|$)/i);
  let post = postMatches && postMatches.length >= 2;
  return post ? text.split('/')[4] : null;
};

const getPost = async (text) => {
  let post = null;
  if (text) {
    const postCode = getPostCode(text);
    if (postCode && postCode.length === 36) {
      await PostsService.getPostByCode(postCode)
        .then(({data}) => {
          post = data.post;
        })
        .catch(err => {
          post = {error: err.message}
        });
    }
  }
  return post;
};

const prepareMessage = async (message) => {
  let {message: text} = message;
  let post = await getPost(text);

  let images = await getImagesUrl(text);
  if (Array.isArray(images))
    Object.is(images[0], undefined)
      ? images = null
      : text = text.replace(/https?:\/\/[^"' ]+\.(?:png|jpg|jpeg|gif|mp4).*?(?=( |$))/g, '');

  return {
    ...message,
    post,
    images,
    text
  }
};

const initialState = {
  messages: []
};

const READ_MESSAGES = 'READ_MESSAGES';
const ADD_MESSAGES = 'ADD_MESSAGES';
const ADD_MESSAGE = 'ADD_MESSAGE';
const DELETE_MESSAGE = 'DELETE_MESSAGE';

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
    case DELETE_MESSAGE:
      return {messages: state.messages.filter(msg => msg.id !== action.payload)};
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
      DialogsService.getByUsername(username, page)
        .then(async ({data}) => {
          Promise.all(data.data.map(message => prepareMessage(message)))
            .then(messages => {
              isFirstRender.current = false;
              dispatch({
                type: ADD_MESSAGES,
                payload: messages
              });
              resolve(data);
            });
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
    prepareMessage(message).then(message => {
      dispatch({
        type: ADD_MESSAGE,
        payload: message
      });
      newMessageHandler.current();
    });
  }, []);

  const deleteMessage = useCallback((id) => {
    dispatch({
      type: DELETE_MESSAGE,
      payload: id
    });
  }, []);

  return {
    messages,
    addMessage,
    getMessages,
    readAllMessages,
    onNewMessage,
    deleteMessage,
    isFirstLoading: isFirstRender.current
  }
};

export default useMessages;
