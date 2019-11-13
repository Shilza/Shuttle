import React, {useCallback, useEffect} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {PostsService} from "services";
import PostsExplainingLabel from "components/ExplainingLabels/PostsLabel/PostsExplainingLabel";
import Paginator from "components/Paginator/Paginator";
import PostsList from "components/Posts/PostsList";


const PostsManager = ({id, posts, dispatch}) => {

  useEffect(() => {
    return () => {
      dispatch.posts.resetUsers();
    }
  }, [id, dispatch.posts]);

  const fetchPosts = useCallback((page) => {
    return PostsService.getPosts(id)(page)
      .then(({data}) => {
        dispatch.posts.addUser(data.data);
        return data;
      })
  }, [id, dispatch.posts]);

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
