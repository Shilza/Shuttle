import Http from "../Http";
import {api} from './api';

export const getFeed = (page) => Http.get(`${api.feed}?page=${page}`);
