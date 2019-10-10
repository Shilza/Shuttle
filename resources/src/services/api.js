const base = '/api/v1/';

const entities = {
  auth: 'auth',
  posts: 'posts',
  compilations: 'compilations',
  comments: 'comments',
  like: 'like',
  unlike: 'unlike',
  feed: 'feed',
  users: 'users',
  notifications: 'notifications',
  friendships: 'friendships',
  search: 'search',
  privateSearch: 'privateSearch',
  dialogs: 'dialogs',
  subRequests: 'subRequests',
};

const addBase = (entities) =>
  Object.entries(entities).reduce((acc, [key, value]) => {
    acc[key] = `${base}${value}`;
    return acc;
  }, {});

export const api = addBase(entities);
