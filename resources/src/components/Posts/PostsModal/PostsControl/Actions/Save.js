import React from "react";
import styles from './actions.module.css';
import {connect} from "react-redux";
import * as PostService from "../../../../../services/post";
import {setPostIdToBeSaved, setSaveCompilationName} from "../../../../../store/actions/saved";

const Save = ({post, saveCompilationName, dispatch}) => {

    const save = () => {
        dispatch(setPostIdToBeSaved(post.id));
        setTimeout(() => {
            if(!saveCompilationName) {
                dispatch(PostService.save({post_id: post.id}));
                dispatch(setPostIdToBeSaved(undefined));
                dispatch(setSaveCompilationName(undefined));
            }
        }, 3000);
    };

    const removeSaved = () => dispatch(PostService.removeSavedPost(post.id));

    return (
        <div className={styles.save} role='button'>
            {
                post.isSaved ?
                    <div className={styles.bookmarkSolid} onClick={removeSaved}/>
                    :
                    <div className={styles.bookmarkFlat} onClick={save}/>
            }
        </div>
    );
};

const mapStateToProps = state => ({
    saveCompilationName: state.saved.saveCompilationName
});

export default connect(mapStateToProps)(Save);