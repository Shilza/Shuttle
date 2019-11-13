import React, {useCallback, useEffect} from "react";
import {connect} from 'react-redux';
import MarksLabel from "components/ExplainingLabels/MarksLabel/MarksLabel";
import Paginator from "components/Paginator/Paginator";
import PostsList from "components/Posts/PostsList/PostsList";
import {PostsService} from 'services';

const Marked = ({posts, userId, dispatch}) => {

  useEffect(() => {
    dispatch.posts.resetMarked();
  }, [userId, dispatch.posts]);

  const fetchPosts = useCallback(
    (page) => {
      return PostsService.getMarkedPosts(userId)(page)
        .then(({data}) => {
          dispatch.posts.addMarked(data.data);
          return data;
        })
    }, [userId, dispatch.posts]);

  return (
    <>
      {
        posts && !posts.length && <MarksLabel/>
      }
      <Paginator
        fetcher={fetchPosts}
      >
        <PostsList posts={posts}/>
      </Paginator>
    </>
  );
};

const mapStateToProps = state => ({
  userId: state.users.user && state.users.user.id,
  posts: state.posts.marked
});

export default connect(mapStateToProps)(Marked);
