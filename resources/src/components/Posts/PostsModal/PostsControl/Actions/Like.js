import React from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import {Icon} from "antd";
import styles from './actions.module.css';
import * as LikeService from "../../../../../services/likes";

const Like = ({id, likesCount, isLiked, type, dispatch}) => {

    const like = event => {
        event.stopPropagation();

        const data = {
            entity_id: id,
            type
        };
        dispatch(isLiked ? LikeService.unlike(data) : LikeService.like(data));
    };

    return (
        <div>
            {!!likesCount && <span>{likesCount}</span>}
            <button className={styles.action} onClick={like}>
                {
                    isLiked ?
                        <Icon type="heart" style={{color: 'rgba(255,0,0,1)'}}/>
                        :
                        <Icon type="heart" style={{color: 'rgba(0,0,0,1)'}}/>
                }
            </button>
        </div>
    );
};

Like.propTypes = {
    id: PropTypes.number.isRequired,
    likesCount: PropTypes.number,
    isLiked: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    dispatch: PropTypes.func.isRequired
};

export default connect()(Like);