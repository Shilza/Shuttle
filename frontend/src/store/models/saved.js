import {CompilationsService} from 'services';

const initialState = {
  compilations: [],
  isSavedTimeout: false,
  postToBeSaved: undefined,
  isModalOpen: false
};

export const saved = {
  state: initialState,
  reducers: {
    addCompilations(state, compilations) {
      return {
        ...state,
        compilations
      }
    },
    setIsModalOpen(state, isModalOpen) {
      return {
        ...state,
        isModalOpen
      }
    },
    removeCompilation(state) {
      return {
        ...state,
        compilations: undefined
      }
    },
    setIsSavedTimeout(state, isSavedTimeout) {
      return {
        ...state,
        isSavedTimeout
      }
    },
    setPostToBeSaved(state, postToBeSaved) {
      return {
        ...state,
        postToBeSaved
      }
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({
    async fetchCompilations(page) {
      const {data} = await CompilationsService.getCompilations(page);
      dispatch.saved.addCompilations(data.data);
      return data;
    }
  })
};
