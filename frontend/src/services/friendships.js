import Http from "../Http";
import {api} from "./api";

export const follow = (data) => Http.post(`${api.friendships}/follow`, data);

export const unfollow = (data) => Http.post(`${api.friendships}/unfollow`, data);

export const removeFollower = (id) => Http.delete(`${api.friendships}/follower?id=${id}`);
