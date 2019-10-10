import Http from "../Http";
import {api} from './api';

export const getUser = (username) => Http.get(`${api.users}?username=${username}`);

export const update = (editedData) => Http.patch(api.users, editedData);

export const getFollowers = (id, page) => Http.get(`${api.users}/followers?id=${id}&page=${page}`);

export const getFollows = (id, page) => Http.get(`${api.users}/follows?id=${id}&page=${page}`);


export const searchFollowers = (id, username, page = 0) =>
  Http.get(`${api.users}/followersSearch?user_id=${id}&username=${username}&page=${page}`);


export const searchFollows = (id, username, page = 0) =>
  Http.get(`${api.users}/followsSearch?user_id=${id}&username=${username}&page=${page}`);


export const checkIsUsernameUnique = (username) => Http.get(`${api.users}/unique?username=${username}`);

export const updateAvatar = (avatar) =>
        Http.put(`${api.users}/avatar`, avatar, {headers: {'Content-Type': 'multipart/form-data'}});

export const deleteAvatar = () => Http.delete(`${api.users}/avatar`);

export const setPrivate = () => Http.post(`${api.users}/privacy`);

export const setPublic = () => Http.delete(`${api.users}/privacy`);

export const getBlacklisted = (page) => Http.get(`${api.users}/blacklist?page=${page}`);

export const addToBlacklist = (data) => Http.post(`${api.users}/blacklist`, data);

export const removeFromBlacklist = (id) => Http.delete(`${api.users}/blacklist?id=${id}`);
