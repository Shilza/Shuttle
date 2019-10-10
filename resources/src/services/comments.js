import Http from "../Http";
import {api} from './api';

export const get = (id, page) => Http.get(`${api.comments}?post_id=${id}&page=${page}`);

export const create = (commentData) => Http.post(api.comments, commentData);

export const remove = (id) => Http.delete(`${api.comments}?id=${id}`);
