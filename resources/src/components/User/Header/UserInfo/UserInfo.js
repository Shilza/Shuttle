import React from "react";
import styles from './userInfo.module.css';
import {addSmoothScrolling} from "../../../../utils/scrolling";
import {connect} from "react-redux";
import * as UsersService from "../../../../services/user";
import Friendships from "./Friendships";

class UserInfo extends React.Component {

    state = {
        isModalOpen: false,
        friendships: undefined
    };

    componentDidMount() {
        addSmoothScrolling('userInfoPostsLink');
    }

    closeFollowersModal = () => {
        this.setState({isModalOpen: false});
    };

    closeFollowsModal = () => {
        this.setState({isModalOpen: false});
    };

    loadFollowers = () => {
        const {dispatch, id, followersCount} = this.props;
        if (followersCount)
            dispatch(UsersService.getFollowers(id))
                .then(({friendships}) => this.setState({isModalOpen: true, friendships}));
    };

    loadFollows = () => {
        const {dispatch, id, followsCount} = this.props;
        if (followsCount)
            dispatch(UsersService.getFollows(id))
                .then(({friendships}) => this.setState({isModalOpen: true, friendships}));
    };

    isOpen = () => {
        const {isModalOpen, friendships} = this.state;

        return !!(isModalOpen && friendships && friendships.length);
    };

    render() {
        const {postsCount, followersCount, followsCount} = this.props;
        const {friendships} = this.state;

        return (
            <>
                <ul className={styles.mainContainer}>
                    <li className={styles.unitContainer}>
                        <span className={styles.unitNumber}>{postsCount}</span>
                        <a className={styles.simpleTextStyledItem} id='userInfoPostsLink' href={"#postsList"}>Posts</a>
                    </li>
                    <li className={styles.unitContainer}>
                        <span className={styles.unitNumber}>{followersCount}</span>
                        <button className={styles.simpleTextStyledItem} onClick={this.loadFollowers}>Followers</button>
                    </li>
                    <li className={styles.unitContainer}>
                        <span className={styles.unitNumber}>{followsCount}</span>
                        <button className={styles.simpleTextStyledItem} onClick={this.loadFollows}>Follows</button>
                    </li>
                </ul>
                {
                    this.isOpen() &&
                    <Friendships friendships={friendships} closeModal={this.closeFollowersModal}/>
                }
            </>
        );
    }
}


export default connect()(UserInfo);