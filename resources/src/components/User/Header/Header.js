import {connect} from "react-redux";
import Avatar from "./Avatar/Avatar";
import Direction from "./Direction";
import UserInfo from "./UserInfo/UserInfo";
import React from "react";
import styles from './header.module.css';
import StoriesList from "./Stories/StoriesList/StoriesList";
import {Tabs} from 'antd';

const TabPane = Tabs.TabPane;

const Header = ({user}) => (
    <div className={styles.mainContainer}>
        <div className={styles.subMainContainer}>
            <Avatar avatar={user.avatar}/>
            <div className={styles.directionInfoContainer}>
                <Direction id={user.id} username={user.username} isFollows={user.isFollows}/>
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
        <div style={{display: 'flex', justifyContent: 'center'}}>
            <Tabs defaultActiveKey="1">
                <TabPane tab="Posts" key="1">Posts</TabPane>
                <TabPane tab="Marks" key="2">Marks</TabPane>
            </Tabs>
        </div>
    </div>
);

const mapStateToProps = state => {
    return {
        user: state.users.user
    }
};

export default connect(mapStateToProps)(Header);