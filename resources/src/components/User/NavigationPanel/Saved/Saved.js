import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {getCompilations} from "../../../../services/saved";
import SavedContainer from "./SavedContainer";
import withLoader from "../../../Loader/Loader";
import styles from './saved.module.css';
import {Button} from "antd";
import PostsList from "../../../Posts/PostsList/PostsList";
import PostsModal from "../../../Posts/PostsModal/PostsModal";
import Paginator from "../../../Paginator/Paginator";
import {getSavedPosts} from "../../../../services/post";
import {removeSavedPosts} from "../../../../store/actions/posts";

const SavedWithLoading = withLoader(SavedContainer);

const Saved = ({savedPosts, page = 0, dispatch}) => {

    let [initPostsPage, setInitPostsPage] = useState(page);
    let [isLoading, setIsLoading] = useState(true);
    let [compilationsPage, setCompilationsPage] = useState(true);
    let [compilationName, setCompilationName] = useState(undefined);

    useEffect(() => {
        fetchCompilations(1);
    }, []);

    const fetchCompilations = page => {
        return new Promise(resolve => {
            dispatch(getCompilations(page))
                .then(data => {
                    setIsLoading(false);
                    resolve(data);
                });
        })
    };

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
                        <Button className={styles.compilationsLabel}
                                onClick={goToCompilationsPage}>Compilations</Button>
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