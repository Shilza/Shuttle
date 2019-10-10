import Http from "Http";
import {saveTokensToLocalStorage} from "utils/saveTokensToLocalStorage";
import * as AuthService from 'services/auth'
import * as UserService from 'services/user';


function removeTokensFromLocalStorage() {
  localStorage.removeItem('expiresIn');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

const initialState = {
  isAuthenticated: false,
  user: {}
};

export const auth = {
  state: initialState,
  reducers: {
    login(state, derUser) {
      let user = derUser;
      user.private = !!user.private;

      return {
        ...state,
        isAuthenticated: true,
        user
      }
    },
    updateAvatar(state, avatar) {
      state = {
        ...state,
        user: {
          ...state.user,
          avatar
        }
      };

      return state;
    },
    readDialog(state, id) {
      return {
        ...state,
        user: {
          ...state.user,
          unreadDialogs: state.user.unreadDialogs.filter(dialog => dialog !== id)
        }
      }
    },
    addUnreadDialog(state, id) {
      let unreadDialogs;
      if (state.user.unreadDialogs.some(dialog => dialog === id))
        unreadDialogs = state.user.unreadDialogs;
      else
        unreadDialogs = [...state.user.unreadDialogs, id];

      return {
        ...state,
        user: {
          ...state.user,
          unreadDialogs
        }
      }
    },
    setUser(state, derUser) {
      let user = derUser;
      user.private = !!user.private;

      return {
        ...state,
        user
      }
    },
    resetNotifications(state) {
      return {
        ...state,
        user: {
          ...state.user,
          notificationsCount: 0
        }
      }
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({
    async authentication() {
      const {data} = await AuthService.me();
      dispatch.auth.login(data.user);
    },
    async loginAsync({remember, ...data}) {
      const {
        data: {
          token,
          expiresIn,
          refreshToken,
          user
        }
      } = await AuthService.login(data);

      if (remember)
        saveTokensToLocalStorage(expiresIn, token, refreshToken);
      Http.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      dispatch.auth.login(user);
    },
    async logoutAsync(_, rootState) {
      await AuthService.logout();

      removeTokensFromLocalStorage();

      Object.keys(rootState).forEach(item => dispatch[item].reset());
    },
    async update({editedData, history}) {
      const {data} = await UserService.update(editedData);

      history.push(data.user.username);

      dispatch.auth.setUser(data.user);
      dispatch.users.setUser({
        ...data.user,
        canSee: true,
        blacklisted: false,
        amBlacklisted: false
      });
      return data;
    }
  })
};
