import {combineReducers} from 'redux'
import auth from "./auth";
import posts from "./posts";
import users from "./users";
import comments from "./comments";
import search from "./search";
import saved from "./saved";


const RootReducer = combineReducers({
    auth, posts, users, comments, search, saved
});


export default RootReducer;