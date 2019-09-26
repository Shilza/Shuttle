import {useEffect, useReducer, useRef} from "react"
import Http from "Http"

const initialState = {
  dialogs: [],
  isLoading: true
};

const SET_DIALOGS = 'SET_DIALOGS';
const SET_IS_LOADING = 'SET_IS_LOADING';
const SET_IS_TYPING = 'SET_IS_TYPING';
const READ_MESSAGES = 'READ_MESSAGES';

function reducer(state, action) {
  switch (action.type) {
    case SET_DIALOGS:
      return {...state, dialogs: action.payload};
    case SET_IS_LOADING:
      return {...state, isLoading: action.payload};
    case SET_IS_TYPING:
      return {
        ...state, dialogs: state.dialogs.map(dialog => {
          if (dialog.user.id === action.payload.userId) {
            dialog.isTyping = action.payload.state;
            return {...dialog};
          }
          return dialog;
        })
      };
    case READ_MESSAGES:
      return {
        ...state,
        dialogs: state.dialogs.map(dialog => {
          if (!dialog.read && dialog.user.id === action.payload) {
            dialog.read = true;
            return {...dialog};
          }
          return dialog;
        })
      };
    default:
      break;
  }
}

const setDialogs = (payload) => ({type: SET_DIALOGS, payload});
const setIsLoading = (payload) => ({type: SET_IS_LOADING, payload});
const setTyping = (payload) => ({type: SET_IS_TYPING, payload});
const readMessages = (payload) => ({type: READ_MESSAGES, payload});

const useDialogs = () => {
  const [{dialogs, isLoading}, dispatch] = useReducer(reducer, initialState);
  let defaultDialogs = useRef([]);
  let typing = useRef([]);

  useEffect(() => {
    Http.get('/api/v1/dialogs')
      .then(({data}) => {
        defaultDialogs.current = data.data;
        dispatch(setDialogs(data.data));
        dispatch(setIsLoading(false));
      });
  }, []);

  const search = (event) => {
    const username = event.target.value;
    if (username.length > 0) {
      const searchedDialogs = defaultDialogs.current.map(item => {
          if (item.user && item.user.username && item.user.username.startsWith(username))
            return item;
          return undefined;
        }
      ).filter(Boolean);
      dispatch(setDialogs(typeof searchedDialogs === 'undefined' ? [] : searchedDialogs));
    } else if (dialogs.length !== defaultDialogs.current.length) {
      dispatch(setDialogs(defaultDialogs.current));
    }
  };

  const addMessage = (message) => {
    const index = defaultDialogs.current.findIndex(dialog => dialog.user.id === message.owner_id);
    if (index !== -1) {
      defaultDialogs.current = defaultDialogs.current.map(dialog => {
        if (dialog.user.id === message.owner_id)
          dialog = message;
        return dialog;
      });
    } else
      defaultDialogs.current = [
        ...defaultDialogs.current,
        message
      ];

    defaultDialogs.current = defaultDialogs.current.sort(
      (a, b) => new Date(b.created_at) - new Date(a.created_at)
    );
    dispatch(setDialogs(defaultDialogs.current));
  };

  const readAllMessages = (id) => {
    dispatch(readMessages(id));
  };

  const setIsTyping = (userId) => {
    dispatch(setTyping({userId, state: true}));

    const typingByUserId = typing.current.find(item => item.userId === userId);
    if (typingByUserId) {
      clearInterval(typingByUserId.timerId);
      typing.current = typing.current.filter(item => item.userId !== userId);
    }

    const time = Date.now();
    const timerId = setTimeout(() => {
      if (time + 1500 <= Date.now()) {
        typing.current = typing.current.filter(item => item.userId !== userId);
        dispatch(setTyping({userId, state: false}));
      }
    }, 1600);

    typing.current.push({
      timerId,
      userId
    });
  };

  return {
    dialogs,
    isLoading,
    addMessage,
    search,
    readAllMessages,
    setIsTyping,
    defaultDialogs: defaultDialogs.current
  }
};

export default useDialogs;
