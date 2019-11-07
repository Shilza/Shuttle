import Http from "../Http";
import {api} from './api';

export const getCompilations = (page = 1) => Http.get(`${api.compilations}?page=${page}`);

export const removeCompilation = (data) => Http.delete(api.compilations, data);
