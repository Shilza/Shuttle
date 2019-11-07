import {useReducer, useRef} from "react";
import {getUnique} from "utils";
import {SearchService} from 'services';

const initialState = {
  users: []
};

const SET_USERS = 'SET_USERS';
const ADD_USERS = 'ADD_USERS';

function reducer(state, action) {
  switch (action.type) {
    case SET_USERS:
      return {...state, users: action.payload};
    case ADD_USERS:
      return {...state, users: getUnique([...state.users, ...action.payload])};
    default:
      break;
  }
}

const setUsers = (payload) => ({type: SET_USERS, payload});
const addUsers = (payload) => ({type: ADD_USERS, payload});

export const useSearch = () => {
  const [{users}, dispatch] = useReducer(reducer, initialState);
  let lastFetchedUsername = useRef(null);

  const search = (username, page = 1) => {
    if (username.length > 0)
      return SearchService.search(username, page)
        .then(({data}) => {
          dispatch(lastFetchedUsername.current === username ? addUsers(data.data) : setUsers(data.data));
          lastFetchedUsername.current = username;
          return data;
        });
    else
      dispatch(setUsers([]));
  };

  const resetSearch = () => {
    dispatch(setUsers([]));
  };

  return {
    users,
    search,
    resetSearch
  }
};
