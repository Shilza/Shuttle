import React from "react";
import PostsUploader from "./Posts/Uploader/PostsUploader";
import Posts from "./Posts/Posts";
import Header from "./Header/Header";
import styles from './userPage.module.css';

const User = ({me}) => {
    return (
        <div className={styles.userPageContainer}>
            <Header/>
            {
                me && <PostsUploader/>
            }
            <Posts/>
        </div>
    );
};

export default User;