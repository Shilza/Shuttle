import React, {useEffect} from "react";
import {Icon} from "antd";
import styles from './actions.module.css';
import Like from "./Like";
import {addSmoothScrolling} from "../../../../../utils/scrolling";
import {convertTime} from "../../../../../utils/timeConverter";
import Save from "./Save";

const Actions = ({post}) => {

    useEffect(() => {
        addSmoothScrolling('postCommentLink' + post.id);
    }, []);

    return (
        <div className={styles.actionsContainer}>
            <div className={styles.actions}>
                <div className={styles.likesContainer}>
                    <span>{post.likes_count || ''}</span>
                    <Like post={post}/>
                </div>
                <a className={styles.action} id={'postCommentLink' + post.id} href={'#commentInputContainer' + post.id}>
                    <Icon type="message" style={{color: 'rgba(0,0,0,1)'}}/>
                </a>
                <Save post={post}/>
            </div>
            <time dateTime={post.created_at}>{`${convertTime(post.created_at)} ago`}</time>
        </div>
    );
};

export default Actions;