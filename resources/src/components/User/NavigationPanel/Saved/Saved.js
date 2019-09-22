import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {Button} from "antd";
import {connect} from "react-redux";

import {getCompilations} from "services/saved";
import SavedContainer from "./SavedContainer";
import withLoader from "components/Loader/Loader";

import PostsList from "components/Posts/PostsList/PostsList";
import PostsModal from "components/Posts/PostsModal/PostsModal";
import Paginator from "components/Paginator/Paginator";
import {getSavedPosts} from "services/post";
import {removeSavedPosts} from "store/actions/posts";

import styles from './saved.module.css';

const SavedWithLoading = withLoader(SavedContainer);

const Saved = ({savedPosts, page = 0, dispatch}) => {
  let [initPostsPage, setInitPostsPage] = useState(page);
  let [isLoading, setIsLoading] = useState(true);
  let [compilationsPage, setCompilationsPage] = useState(true);
  let [compilationName, setCompilationName] = useState(undefined);

  useEffect(() => {
    fetchCompilations(1);
  }, []);

  const fetchCompilations = page =>
    new Promise(resolve => {
      dispatch(getCompilations(page))
        .then(data => {
          setIsLoading(false);
          resolve(data);
        });
    });

  const fetchCompilationPosts = page => dispatch(getSavedPosts(compilationName, page));

  const goToCompilationsPage = () => {
    setCompilationsPage(true);
    dispatch(removeSavedPosts());
  };

  const goToSavedPosts = compilationName => {
    setCompilationsPage(false);
    setCompilationName(compilationName);
    setInitPostsPage(0);
  };

  return (
    <>
      {
        compilationsPage
          ? <SavedWithLoading isLoading={isLoading} goToSavedPosts={goToSavedPosts}/>
          :
          <>
            <Button
              className={styles.compilationsLabel}
              onClick={goToCompilationsPage}
            >
              Compilations
            </Button>
            <Paginator
              fetcher={fetchCompilationPosts}
              initialPage={initPostsPage}
            >
              <PostsList posts={savedPosts}/>
            </Paginator>
            <PostsModal/>
          </>
      }
    </>
  );
};

Saved.propTypes = {
  savedPosts: PropTypes.array,
  page: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  savedPosts: state.posts.savedPosts.data,
  page: state.posts.savedPosts.page
});

export default connect(mapStateToProps)(Saved);
