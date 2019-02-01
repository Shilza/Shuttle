import React from "react";
import styles from './actions.module.css';
import {connect} from "react-redux";
import * as PostService from "../../../../../../services/post";

const Save = ({post, dispatch}) => {

    const save = () => {
        dispatch(PostService.save({
            post_id: post.id
        }));
    };

    const removeSaved = () => {
        dispatch(PostService.removeSavedPost(post.id));
    };

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

export default connect()(Save);