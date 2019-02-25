import React, {useEffect, useState} from "react";
import styles from './userInfo.module.css';
import {addSmoothScrolling} from "../../../../utils/scrolling";
import {connect} from "react-redux";
import * as UsersService from "../../../../services/user";
import Followers from "./Followers";
import Paginator from "../../../Paginator/Paginator";
import Follows from "./Follows";

const UserInfo = ({postsCount, canSee, followersCount, followsCount, id, dispatch}) => {

    let [isFollowersModal, setIsFollowersModal] = useState(false);
    let [isFollowsModal, setIsFollowsModal] = useState(false);

    useEffect(() => {
        addSmoothScrolling('userInfoPostsLink');
    }, []);

    const closeFollowersModal = () => setIsFollowersModal(false);

    const closeFollowsModal = () => setIsFollowsModal(false);

    const openFollowsModal = () => setIsFollowsModal(true);

    const openFollowersModal = () => setIsFollowersModal(true);

    const loadFollows = page => dispatch(UsersService.getFollows(id, page));

    const loadFollowers = page => dispatch(UsersService.getFollowers(id, page));

    return (
        <>
            <ul className={styles.mainContainer}>
                <PostsCount postsCount={postsCount}/>
                <FollowersButton followersCount={followersCount} onClickFollowers={openFollowersModal}/>
                <FollowsButton followsCount={followsCount} onClickFollows={openFollowsModal}/>
            </ul>
            {
                (isFollowsModal && followsCount && canSee) &&
                <Paginator
                    fetcher={loadFollows}
                >
                    <Follows id={id} closeModal={closeFollowsModal}/>
                </Paginator>
            }
            {
                (isFollowersModal && followersCount && canSee) &&
                <Paginator
                    fetcher={loadFollowers}
                >
                    <Followers id={id} closeModal={closeFollowersModal}/>
                </Paginator>
            }
        </>
    );
};

const PostsCount = ({postsCount}) =>
    <li className={styles.unitContainer}>
        <span className={styles.unitNumber}>{postsCount}</span>
        <a className={styles.simpleTextStyledItem} id='userInfoPostsLink' href={"#postsList"}>Posts</a>
    </li>;

const FollowersButton = ({followersCount, onClickFollowers}) =>
    <li className={styles.unitContainer} onClick={onClickFollowers}>
        <span className={styles.unitNumber}>{followersCount}</span>
        <button className={styles.simpleTextStyledItem}>
            Followers
        </button>
    </li>;

const FollowsButton = ({followsCount, onClickFollows}) =>
    <li className={styles.unitContainer} onClick={onClickFollows}>
        <span className={styles.unitNumber}>{followsCount}</span>
        <button className={styles.simpleTextStyledItem}>
            Follows
        </button>
    </li>;

export default connect()(UserInfo);