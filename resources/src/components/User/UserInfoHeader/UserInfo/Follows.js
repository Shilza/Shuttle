import Modal from "../../../Modal/Modal";
import styles from './friendships.module.css';
import UserFriendshipCard from "./UserFriendshipCard";
import {connect} from "react-redux";
import React from "react";
import {searchFollows} from "../../../../services/user";

const Follows = ({closeModal, id, dispatch, follows}) => {

    const search = event => {
        let username = event.target.value;
        if(username.length <= 12)
            dispatch(searchFollows(id, username));
    };

    return (
        <Modal closeModal={closeModal}>
            <div className={styles.friendshipsContainer}>
                <input onChange={search}/>
                <ul>
                    {
                        follows.map(user => <UserFriendshipCard key={user.id}
                                                                avatar={user.avatar}
                                                                username={user.username}/>)
                    }
                </ul>
            </div>
        </Modal>
    );
};
const mapStateToProps = state => ({
    follows: state.users.follows
});

export default connect(mapStateToProps)(Follows);