import React from "react";
import styles from './actions.module.css';
import {connect} from "react-redux";
import * as PostService from "../../../../../services/post";
import {setPostToBeSaved, setIsSavedTimeout} from "../../../../../store/actions/saved";
import {debounce} from "../../../../../utils/debounce";
import savedStore from '../../../../../store/index';

const Save = ({post, dispatch}) => {

    const save = () => {
        dispatch(setPostToBeSaved(post));
        dispatch(setIsSavedTimeout(true));
        debounce(savedStore => {
            const saved = savedStore.getState().saved;
            if(saved.isSavedTimeout) {
                dispatch(PostService.save({post_id: saved.postToBeSaved.id}));
            }
        }, 5000)(savedStore);
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

export default connect()(Save);