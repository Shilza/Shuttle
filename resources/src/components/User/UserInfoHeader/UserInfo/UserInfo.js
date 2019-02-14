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

    closeFriendshipsModal = () => {
        this.setState({isModalOpen: false});
    };

    loadFollowers = () => this.load(UsersService.getFollowers, this.props.followersCount);

    loadFollows = () => this.load(UsersService.getFollows, this.props.followsCount);

    load = (loadFunction, count) => {
        const {dispatch, id, canSee} = this.props;
        if (count && canSee)
            dispatch(loadFunction(id))
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
                    <Friendships friendships={friendships} closeModal={this.closeFriendshipsModal}/>
                }
            </>
        );
    }
}


export default connect()(UserInfo);