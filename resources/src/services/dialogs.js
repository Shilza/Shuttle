import Http from "../Http";
import {api} from "./api";

export const get = (page) => Http.get(`${api.dialogs}?page=${page}`);

export const getByUsername = (username, page) => Http.get(`${api.dialogs}/${username}?page=${page}`);
