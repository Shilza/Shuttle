import React, {useState} from "react";
import {connect} from 'react-redux';
import MarksLabel from "components/ExplainingLabels/MarksLabel/MarksLabel";
import Paginator from "components/Paginator/Paginator";
import PostsList from "components/Posts/PostsList/PostsList";
import PostsModal from "components/Posts/PostsModal/PostsModal";
import Http from "../../../../Http";
import {transformPostsMetadata} from "utils/transformPostsMetadata";

const useMarkedPosts = (userId) => {

  const [posts, setPosts] = useState([]);

  const fetcher = page => {
    return new Promise((resolve, reject) => {
      Http.get(`/api/v1/posts/marked?user_id=${userId}&page=${page}`)
        .then(({data}) => {
          setPosts(transformPostsMetadata(data.data));
          resolve(data);
        })
        .catch(err => reject(err));
    })
  };

  return {
    posts,
    fetcher
  }
};

const Marked = ({userId}) => {

  const {posts, fetcher} = useMarkedPosts(userId);

  return (
    <>
      {
        posts && !posts.length && <MarksLabel/>
      }
      <Paginator
        fetcher={fetcher}
      >
        <PostsList posts={posts}/>
      </Paginator>
      <PostsModal/>
    </>
  );
};

export default connect(state => ({userId: state.users.user && state.users.user.id}))(Marked);
