import React from "react";
import PostsModal from "./PostsModal/PostsModal";
import withLoader from "../Loader/Loader";
import PostsList from "./PostsList/PostsList";

const PostsListWithLoading = withLoader(PostsList);

const Posts = ({posts}) => (
    <>
        <PostsListWithLoading isLoading={!posts} posts={posts}/>
        <PostsModal/>
    </>
);

export default Posts;