import Http from "../Http";
import {api} from './api';

export const create = (postData) =>
  Http.post(api.posts, postData, {headers: {'Content-Type': 'multipart/form-data'}});

export const remove = (id) => Http.delete(`${api.posts}?id=${id}`);

export const getPosts = (id) => (page) => Http.get(`${api.posts}?owner_id=${id}&page=${page}`);

export const update = (data) => Http.patch(api.posts, data);

export const getPostByCode = (code) => Http.get(`${api.posts}/${code}`);

export const getSavedPosts = (compilationName) => (page) =>
  Http.get(`${api.compilations}/posts?compilation=${compilationName}&page=${page}`);

export const getMarkedPosts = (userId) => (page) =>
  Http.get(`${api.posts}/marked?user_id=${userId}&page=${page}`);

export const save = (data) => Http.post(`${api.posts}/save`, data);

export const removeSavedPost = (postId) => Http.delete(`${api.posts}/save?post_id=${postId}`);

export const getArchived = (page) => Http.get(`${api.posts}/archive?page=${page}`);

export const getLiked = (page) => Http.get(`${api.posts}/liked?page=${page}`);

export const addToArchive = (id) => Http.post(`${api.posts}/archive`, {post_id: id});

export const removeFromArchive = (id) => Http.delete(`${api.posts}/archive?post_id=${id}`);

export const getLikesUsers = (id, page) => Http.get(`${api.posts}/likes?post_id=${id}&page=${page}`);
