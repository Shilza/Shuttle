import Http from "../Http";
import {api} from './api';

export const search = (username, page) => Http.get(`${api.search}?username=${username}&page=${page}`);

export const privateSearch = (username, page) => Http.get(`${api.privateSearch}?username=${username}&page=${page}`);

