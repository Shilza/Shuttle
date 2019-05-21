import React from "react";
import PropTypes from 'prop-types';
import styles from './actions.module.css';
import {connect} from "react-redux";
import * as PostService from "../../../../../services/post";
import {setIsSavedTimeout, setPostToBeSaved} from "../../../../../store/actions/saved";
import {debounce} from "../../../../../utils/debounce";
import savedStore from '../../../../../store/index';

const Save = ({post, dispatch}) => {

    const save = () => {
        dispatch(setPostToBeSaved(post));
        dispatch(setIsSavedTimeout(true));
        debounce(savedStore => {
            const saved = savedStore.getState().saved;
            if(saved.isSavedTimeout && saved.postToBeSaved) {
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

Save.propTypes = {
    post: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(Save);