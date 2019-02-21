import React, {useEffect, useState} from "react";
import styles from './userInfo.module.css';
import {addSmoothScrolling} from "../../../../utils/scrolling";
import {connect} from "react-redux";
import * as UsersService from "../../../../services/user";
import Friendships from "./Friendships";
import Paginator from "../../../Paginator";

const UserInfo = ({postsCount, canSee, followersCount, followsCount, ...props}) => {

    let [isModalOpen, setIsModalOpen] = useState(false);
    let [friendships, setFriendships] = useState([]);
    let [isFollowers, setIsFollowers] = useState(true);

    useEffect(() => {
        addSmoothScrolling('userInfoPostsLink');
    }, []);

    const closeFriendshipsModal = () => setIsModalOpen(false);

    const loadFollowers = page => {
        return new Promise(resolve => {
            load(UsersService.getFollowers, page, followersCount).then(data => resolve(data));
        });
    };

    const loadFollows = page => {
        return new Promise(resolve => {
            load(UsersService.getFollows, page, followsCount).then(data => resolve(data));
        });
    };

    const load = (loadFunction, page, count) => {
        const {dispatch, id} = props;

        if (count && canSee)
            return new Promise((resolve) => {
                dispatch(loadFunction(id, page))
                    .then(data => {
                        setFriendships([...friendships, ...data.data]);
                        resolve(data);
                    });
            });
    };

    const fetchFriendships = isFollowers ? loadFollowers : loadFollows;

    return (
        <>
            <ul className={styles.mainContainer}>
                <li className={styles.unitContainer}>
                    <span className={styles.unitNumber}>{postsCount}</span>
                    <a className={styles.simpleTextStyledItem} id='userInfoPostsLink' href={"#postsList"}>Posts</a>
                </li>
                <li className={styles.unitContainer}>
                    <span className={styles.unitNumber}>{followersCount}</span>
                    <button className={styles.simpleTextStyledItem} onClick={() => {
                        if (followersCount && canSee) {
                            setIsFollowers(true);
                            setIsModalOpen(true);
                        }
                    }}>
                        Followers
                    </button>
                </li>
                <li className={styles.unitContainer}>
                    <span className={styles.unitNumber}>{followsCount}</span>
                    <button className={styles.simpleTextStyledItem} onClick={() => {
                        if (followsCount && canSee) {
                            setIsFollowers(false);
                            setIsModalOpen(true);
                        }
                    }}>
                        Follows
                    </button>
                </li>
            </ul>
            {
                isModalOpen &&
                <Paginator
                    fetcher={fetchFriendships}
                >
                    {
                        !!friendships.length &&
                        <Friendships friendships={friendships} closeModal={closeFriendshipsModal}/>
                    }
                </Paginator>
            }
        </>
    );
};


export default connect()(UserInfo);