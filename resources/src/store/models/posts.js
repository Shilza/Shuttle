import {transformMetadata} from "utils/transformMetadata";
import * as PostsService from 'services/posts';
import * as FeedService from 'services/feed';

const initialState = {
  user: [],
  feed: [],
  liked: [],
  marked: [],
  saved: [],
  archived: [],
  postByCode: []
};

const forKeys = (initialState, keyCallback) =>
  Object.keys(initialState).reduce((newState, key) => {
    return {
      ...newState,
      [key]: keyCallback(key)
    }
  }, {});

export const posts = {
  state: initialState,
  reducers: {
    add(state, {key, post}) {
      return {...state, [key]: [post, ...state[key]]};
    },
    addUser(state, posts) {
      return {...state, user: [...state.user, ...transformMetadata(posts)]};
    },
    addFeed(state, posts) {
      return {...state, feed: [...state.feed, ...transformMetadata(posts)]};
    },
    addMarked(state, posts) {
      return {...state, marked: [...state.marked, ...transformMetadata(posts)]};
    },
    addSaved(state, posts) {
      return {...state, saved: [...state.saved, ...transformMetadata(posts)]};
    },
    addLiked(state, posts) {
      return {...state, liked: [...state.liked, ...transformMetadata(posts)]};
    },
    addArchived(state, posts) {
      return {...state, archived: [...state.archived, ...transformMetadata(posts)]};
    },
    setByCode(state, postByCode) {
      return {...state, postByCode: transformMetadata(postByCode)};
    },
    update(state, updatedPost) {
      const update = post => post.id === updatedPost.id ? transformMetadata([updatedPost])[0] : post;

      return forKeys(initialState, (key) => state[key].map(update));
    },
    remove(state, id) {
      const remove = post => post.id !== id;

      return forKeys(initialState, (key) => state[key].filter(remove));
    },
    like(state, id) {
      const setLiked = post => {
        if (post.id === id) {
          post.isLiked = true;
          post.likes_count++;
          return {...post};
        }
        return post;
      };

      return forKeys(initialState, (key) => state[key].map(setLiked));
    },
    unLike(state, id) {
      const setLikedToFalse = post => {
        if (post.id === id) {
          post.isLiked = false;
          post.likes_count--;
          return {...post};
        }
        return post;
      };

      return forKeys(initialState, (key) => state[key].map(setLikedToFalse));
    },
    removeSaved(state, id) {
      const setSavedToFalse = post => {
        if (post.id === id) {
          post.isSaved = false;
          return {...post};
        }
        return post;
      };

      return forKeys(initialState, (key) => state[key].map(setSavedToFalse));
    },
    save(state, id) {
      const setSaved = post => {
        if (post.id === id) {
          post.isSaved = true;
          return {...post};
        }
        return post;
      };

      return forKeys(initialState, (key) => state[key].map(setSaved));
    },
    addToArchive(state, id) {
      const setArchived = post => post.id !== id;
      if (state.postByCode.length)
        state.postByCode = [{...state.postByCode, isArchived: true}];

      return forKeys(initialState, (key) => {
        if (key !== 'postByCode')
          return state[key].filter(setArchived);
        return state[key];
      });
    },
    removeFromArchive(state, id) {
      const setNotArchived = post => post.id !== id;
      if (state.postByCode.length)
        state.postByCode = [{...state.postByCode, isArchived: false}];
      return {...state, archived: state.archived.filter(setNotArchived)}
    },
    resetUsers(state) {
      return {...state, user: []};
    },
    resetMarked(state) {
      return {...state, marked: []};
    },
    resetSaved(state) {
      return {...state, saved: []};
    },
    resetFeed(state) {
      return {...state, feed: []};
    },
    reset() {
      return initialState;
    }
  },
  effects: (dispatch) => ({
    async create(postData, rootState) {
      const {data} = await PostsService.create(postData);
      const arr = window.location.href.split('/');
      if (arr[arr.length - 1] === "")
        dispatch.posts.add({key: 'feed', post: data.post});
      else if (arr.length >= 1 && arr[arr.length - 1] === rootState.auth.user.username)
        dispatch.posts.add({key: 'user', post: data.post});
      return data;
    },
    async removeAsync(id) {
      const {data} = await PostsService.remove(id);
      dispatch.posts.remove(id);
      return data;
    },
    async fetchFeed(page) {
      const {data} = await FeedService.getFeed(page);
      dispatch.posts.addFeed(data.data);
      return data;
    },
    async fetchArchived(page) {
      const {data} = await PostsService.getArchived(page);
      dispatch.posts.addArchived(data.data);
      return data;
    },
    async fetchLiked(page) {
      const {data} = await PostsService.getLiked(page);
      dispatch.posts.addLiked(data.data);
      return data;
    },
    async updateAsync(updateData) {
      const {data} = await PostsService.update(updateData);
      dispatch.posts.update(data.post);
      return data;
    },
    async getPostByCode(code) {
      const {data} = await PostsService.getPostByCode(code);
      dispatch.posts.setByCode([data.post]);
    },
    async saveAsync(data) {
      await PostsService.save(data);
      dispatch.posts.save(data.post_id);
      dispatch.saved.setPostToBeSaved(undefined);
      dispatch.saved.setIsSavedTimeout(false);
    },
    async removeSavedPost(postId) {
      const data = await PostsService.removeSavedPost(postId);
      dispatch.posts.removeSaved(postId);
      return data;
    },
    async addToArchiveAsync(postId) {
      const data = await PostsService.addToArchive(postId);
      dispatch.posts.addToArchive(postId);
      return data;
    },
    async removeFromArchiveAsync(postId) {
      const data = await PostsService.removeFromArchive(postId);
      dispatch.posts.removeFromArchive(postId);
      return data;
    }
  })
};
