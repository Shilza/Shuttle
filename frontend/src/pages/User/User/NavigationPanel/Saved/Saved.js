import React, {useCallback, useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import {Button} from 'ui';
import withLoader from "components/Loader/Loader";
import PostsList from "components/Posts/PostsList/PostsList";
import Paginator from "components/Paginator/Paginator";
import {PostsService} from 'services';
import SavedContainer from "./SavedContainer";

import styles from './saved.module.css';

const SavedWithLoading = withLoader(SavedContainer);

const Saved = ({posts, dispatch}) => {
  let [isLoading, setIsLoading] = useState(true);
  let [compilationsPage, setCompilationsPage] = useState(true);
  let [compilationName, setCompilationName] = useState(undefined);

  const fetchCompilations = useCallback((page) => {
    return dispatch.saved.fetchCompilations(page)
      .then(() => {
        setIsLoading(false);
      })
  }, [dispatch.saved, setIsLoading]);

  useEffect(() => {
    fetchCompilations(1);
  }, [fetchCompilations]);

  const fetchCompilationPosts = useCallback((page) => {
    return PostsService.getSavedPosts(compilationName)(page)
      .then(({data}) => {
        dispatch.posts.addSaved(data.data);
        return data;
      });
  }, [compilationName, dispatch.posts]);

  const goToCompilationsPage = () => {
    setCompilationsPage(true);
    dispatch.posts.resetSaved();
  };

  const goToSavedPosts = compilationName => {
    setCompilationsPage(false);
    setCompilationName(compilationName);
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
            >
              <PostsList posts={posts}/>
            </Paginator>
          </>
      }
    </>
  );
};

Saved.propTypes = {
  posts: PropTypes.array,
  dispatch: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  posts: state.posts.saved
});

export default connect(mapStateToProps)(Saved);
