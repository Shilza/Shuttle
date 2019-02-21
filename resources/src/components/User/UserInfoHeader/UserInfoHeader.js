import {connect} from "react-redux";
import Avatar from "./Avatar/Avatar";
import Direction from "../Direction/Direction";
import UserInfo from "./UserInfo/UserInfo";
import React from "react";
import styles from './userInfoHeader.module.css';

const UserInfoHeader = ({user}) => (
    <div className={styles.mainContainer}>
        <Avatar avatar={user.avatar}/>
        <div className={styles.directionInfoContainer}>
            <Direction username={user.username}/>
            <UserInfo
                id={user.id}
                postsCount={user.posts_count}
                followsCount={user.follows_count}
                followersCount={user.followers_count}
                canSee={user.canSee}
            />
            <span>{user.bio}</span>
            <a href={user.site} target={'_blank'} rel={'noreferrer noopener'}>{user.site}</a>
        </div>
    </div>
);


const mapStateToProps = state => ({
    user: state.users.user,
});

export default connect(mapStateToProps)(UserInfoHeader);