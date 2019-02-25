import Modal from "../../../Modal/Modal";
import styles from './friendships.module.css';
import UserFriendshipCard from "./UserFriendshipCard";
import {connect} from "react-redux";
import React from "react";
import {searchFollowers} from "../../../../services/user";

const Followers = ({closeModal, id, dispatch, followers}) =>  {

    const search = event => {
        let username = event.target.value;
        if(username.length <= 12)
            dispatch(searchFollowers(id, username));
    };

    return (
        <Modal closeModal={closeModal}>
            <div className={styles.friendshipsContainer}>
                <input onChange={search}/>
                <ul>
                    {
                        followers.map(user => <UserFriendshipCard key={user.id}
                                                                  avatar={user.avatar}
                                                                  username={user.username}/>)
                    }
                </ul>
            </div>
        </Modal>
    );
};

const mapStateToProps = state => ({
    followers: state.users.followers,
});

export default connect(mapStateToProps)(Followers);