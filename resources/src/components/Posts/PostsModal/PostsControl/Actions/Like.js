import {connect} from "react-redux";
import {Icon} from "antd";
import React from "react";
import styles from './actions.module.css';
import * as LikeService from "../../../../../services/likes";

const Like = ({post, dispatch}) => {

    const like = () => {
        const data = {
            entity_id: post.id,
            type: 'post'
        };
        dispatch(post.isLiked ? LikeService.unlike(data) : LikeService.like(data));
    };

    return (
        <button className={styles.action} onClick={like}>
            {
                post.isLiked ?
                    <Icon type="heart" style={{color: 'rgba(255,0,0,1)'}}/>
                    :
                    <Icon type="heart" style={{color: 'rgba(0,0,0,1)'}}/>
            }
        </button>
    );
};

export default connect()(Like);