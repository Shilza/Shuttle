import {connect} from "react-redux";
import Avatar from "./Avatar/Avatar";
import Direction from "../Direction/Direction";
import UserInfo from "./UserInfo/UserInfo";
import React from "react";
import styles from './header.module.css';
import StoriesList from "./Stories/StoriesList/StoriesList";
import NavigationPanel from "../NavigationPanel/NavigationPanel";
import PostsUploader from "../Posts/Uploader/PostsUploader";


const Header = ({user, me}) => (
    <div className={styles.mainContainer}>
        <div className={styles.subMainContainer}>
            <Avatar avatar={user.avatar}/>
            <div className={styles.directionInfoContainer}>
                <Direction username={user.username}/>
                <UserInfo
                    id={user.id}
                    postsCount={user.posts_count}
                    followsCount={user.follows_count}
                    followersCount={user.followers_count}
                />
                <span>{user.bio}</span>
            </div>
        </div>
        <StoriesList stories={
            [
                {src: 'https://www.itsnicethat.com/system/files/112017/5a0c24617fa44c187f000efc/index_default/Chris-(Simpsons-Artist)-The-Story-of-Life-publication-itsnicethat-list.png?1510746521'},
                {
                    src: 'https://www.storynory.com/wp-content/uploads/2018/01/pot-of-broth-storynory-600-600x400.jpg',
                    name: 'Stoory'
                }
            ]
        }/>
        {
            me && <PostsUploader/>
        }
        <NavigationPanel/>
    </div>
);

const mapStateToProps = state => {
    return {
        user: state.users.user,
        me: state.auth.user.id === state.users.user.id
    }
};

export default connect(mapStateToProps)(Header);