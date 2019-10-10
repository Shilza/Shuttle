const initialState = {
  isSearchFocused: false
};

export const search = {
  state: initialState,
  reducers: {
    setIsSearchFocused(state, isSearchFocused) {
      return {
        ...state,
        isSearchFocused
      }
    },
    reset() {
      return initialState;
    }
  }
};
