import React, {useCallback, useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as PostService from "services/posts";
import PostsExplainingLabel from "components/ExplainingLabels/PostsLabel/PostsExplainingLabel";
import Paginator from "components/Paginator/Paginator";
import PostsList from "components/Posts/PostsList/PostsList";


const PostsManager = ({id, posts, dispatch}) => {

  useEffect(() => {
    return () => {
      dispatch.posts.resetUsers();
    }
  }, [id]);

  const fetchPosts = useCallback((page) => {
    return PostService.getPosts(id)(page)
      .then(({data}) => {
        dispatch.posts.addUser(data.data);
        return data;
      })
  }, [id]);

  return (
    <>
      {posts && !posts.length && <PostsExplainingLabel/>}
      <Paginator fetcher={fetchPosts}>
        <PostsList posts={posts}/>
      </Paginator>
    </>
  );
};

PostsManager.propTypes = {
  id: PropTypes.number.isRequired
};

const mapStateToProps = state => ({
  id: state.users.user.id,
  posts: state.posts.user
});

export default connect(mapStateToProps)(PostsManager);
