
const initialState = {
  visible: false,
  username: undefined,
  bio: undefined,
  site: undefined
};

export const edit = {
  state: initialState,
  reducers: {
    setVisible(state, visible) {
      return {
        ...state,
        visible
      };
    },
    setName(state, username) {
      return {
        ...state,
        username
      };
    },
    setBio(state, bio) {
      return {
        ...state,
        bio
      };
    },
    setSite(state, site) {
      return {
        ...state,
        site
      }
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({

  })
};
