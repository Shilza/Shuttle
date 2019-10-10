import Http from "../Http";
import {api} from './api';

export const getNotifications = (page) => Http.get(`${api.notifications}?page=${page}`);
