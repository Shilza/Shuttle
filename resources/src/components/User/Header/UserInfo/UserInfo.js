import React from "react";
import styles from './userInfo.module.css';
import {addSmoothScrolling} from "../../../../utils/scrolling";
import {connect} from "react-redux";
import * as UsersService from "../../../../services/user";
import FollowersModal from "./FollowersModal";
import FollowsModal from "./FollowsModal";

class UserInfo extends React.Component {

    state = {
        isModalFollowers: false,
        isModalFollows: false
    };

    componentDidMount() {
        addSmoothScrolling('userInfoPostsLink');
    }

    closeFollowersModal = () => {
        this.setState({isModalFollowers: false});
    };

    closeFollowsModal = () => {
        this.setState({isModalFollows: false});
    };

    loadFollowers = () => {
        const {dispatch, id} = this.props;
        dispatch(UsersService.getFollowers(id))
            .then(() => this.setState({isModalFollowers: true}));
    };

    loadFollows = () => {
        const {dispatch, id} = this.props;
        dispatch(UsersService.getFollows(id))
            .then(() => this.setState({isModalFollows: true}));
    };

    render() {
        const {postsCount, followersCount, followsCount} = this.props;
        return (
            <>
                <ul className={styles.mainContainer}>
                    <li className={styles.unitContainer}>
                        <span className={styles.unitNumber}>{postsCount}</span>
                        <a id='userInfoPostsLink' href={"#postsList"}>Posts</a>
                    </li>
                    <li className={styles.unitContainer}>
                        <span className={styles.unitNumber}>{followersCount}</span>
                        <button onClick={this.loadFollowers}>Followers</button>
                    </li>
                    <li className={styles.unitContainer}>
                        <span className={styles.unitNumber}>{followsCount}</span>
                        <button onClick={this.loadFollows}>Follows</button>
                    </li>
                </ul>
                {
                    this.state.isModalFollowers &&
                    <FollowersModal closeModal={this.closeFollowersModal}/>
                }
                {
                    this.state.isModalFollows &&
                    <FollowsModal closeModal={this.closeFollowsModal}/>
                }
            </>
        );
    }
}


export default connect()(UserInfo);