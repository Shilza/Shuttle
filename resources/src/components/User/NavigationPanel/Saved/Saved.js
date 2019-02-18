import React, {useEffect, useState} from "react";
import {connect} from "react-redux";
import {getCompilations} from "../../../../services/saved";
import SavedContainer from "./SavedContainer";
import withLoader from "../../../Loader/Loader";
import styles from './saved.module.css';
import {Button} from "antd";
import PostsList from "../../../Posts/PostsList/PostsList";
import PostsModal from "../../../Posts/PostsModal/PostsModal";
import Paginator from "../../../Paginator";
import {getSavedPosts} from "../../../../services/post";

const SavedWithLoading = withLoader(SavedContainer);

const Saved = ({savedPosts, page = 0, dispatch}) => {

    let [isLoading, setIsLoading] = useState(true);
    let [compilationsPage, setCompilationsPage] = useState(true);
    let [compilationsName, setCompilationsName] = useState(undefined);

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

    const fetchCompilationPosts = page => dispatch(getSavedPosts(compilationsName, page));

    const goToCompilationsPage = () => setCompilationsPage(true);

    const goToSavedPosts = compilationName => {
        setCompilationsPage(false);
        setCompilationsName(compilationName);
    };

    return (
        <>
            {
                compilationsPage &&
                <SavedWithLoading isLoading={isLoading} goToSavedPosts={goToSavedPosts}/>
            }
            {
                !compilationsPage &&
                <>
                    <Button className={styles.compilationsLabel}
                            onClick={goToCompilationsPage}>Compilations</Button>
                    <Paginator
                        fetcher={fetchCompilationPosts}
                        initialPage={page}
                    >
                        <>
                            <PostsList posts={savedPosts}/>
                            <PostsModal/>
                        </>
                    </Paginator>
                </>
            }
        </>
    );
};

const mapStateToProps = state => ({
    savedPosts: state.posts.savedPosts.data,
    page: state.posts.savedPosts.page
});

export default connect(mapStateToProps)(Saved);