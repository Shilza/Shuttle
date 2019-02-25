import {connect} from "react-redux";
import {Icon} from "antd";
import React from "react";
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

export default connect()(Like);