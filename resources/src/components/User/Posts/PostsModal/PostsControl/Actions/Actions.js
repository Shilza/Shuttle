import React from "react";
import {Icon} from "antd";
import styles from './actions.module.css';
import Like from "./Like";
import {addSmoothScrolling} from "../../../../../../utils/scrolling";
import {convertTime} from "../../../../../../utils/timeConverter";

class Actions extends React.Component {

    componentDidMount() {
        addSmoothScrolling('postCommentLink');
    }

    render() {
        const {post} = this.props;

        return (
            <div className={styles.actionsContainer}>
                <div className={styles.actions}>
                    <div className={styles.likesContainer}>
                        <span>{post.likes_count || ''}</span>
                        <Like post={post}/>
                    </div>
                    <a className={styles.action} id='postCommentLink' href='#commentInputContainer'>
                        <Icon type="message" style={{color: 'rgba(0,0,0,1)'}}/>
                    </a>
                    <div className={styles.save} role='button'>
                        {
                            post.isSaved ?
                                <div className={styles.bookmarkSolid}/>
                                :
                                <div className={styles.bookmarkFlat}/>
                        }
                    </div>
                </div>
                <time dateTime={post.created_at}>{convertTime(post.created_at)}</time>
            </div>
        )
    }
}

export default Actions;