import React from "react";
import PostsModal from "./PostsModal/PostsModal";
import PostsList from "./PostsList/PostsList";

const Posts = ({posts}) => (
    <>
        <PostsList posts={posts}/>
        <PostsModal/>
    </>
);

export default Posts;