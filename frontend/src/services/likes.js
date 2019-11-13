import Http from "../Http";
import {api} from './api';

export const like = (data) => Http.post(api.like, data);

export const unlike = (data) => Http.post(api.unlike, data);
