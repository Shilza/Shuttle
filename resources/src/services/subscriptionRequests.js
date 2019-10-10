import Http from "../Http";
import {api} from './api';

export const getSubsRequestsPreview = () => Http.get(`${api.subRequests}/preview`);

export const getSubsRequests = () => Http.get(api.subRequests);

export const acceptSubsRequest = (user_id) => Http.post(api.subRequests, {user_id});

export const cancelSubsRequest = (userId) => Http.delete(`${api.subRequests}?user_id=${userId}`);
