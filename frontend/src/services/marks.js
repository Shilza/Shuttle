import Http from "../Http";
import {api} from './api';

export const remove = (id) => Http.delete(`${api.marks}?id=${id}`);
