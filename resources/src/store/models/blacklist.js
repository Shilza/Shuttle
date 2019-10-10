import * as UserService from 'services/user'

const initialState = {
  users: []
};

export const blacklist = {
  state: initialState,
  reducers: {
    setBlacklistedUsers(state, users) {
      return {
        ...state,
        users
      }
    },
    removeFromBlacklist(state, id) {
      return {
        ...state,
        users: state.users.filter(item => item.id !== id)
      }
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({
    async getBlacklisted(page) {
      const {data} = await UserService.getBlacklisted(page);
      dispatch.blacklist.setBlacklistedUsers(data.data);
      return data;
    },
    async addToBlacklist(usersData) {
      const {data} = await UserService.addToBlacklist(usersData);
      dispatch.users.setBlacklisted();
      return data.message;
    },
    async removeFromBlacklistAsync(id) {
      const {data} = await UserService.removeFromBlacklist(id);
      dispatch.users.setUnblacklisted();
      dispatch.blacklist.removeFromBlacklist(id);
      return data.message;
    }
  })
};
