import React from "react";
import PropTypes from 'prop-types';
import Modal from "../../../Modal/Modal";
import styles from './friendships.module.css';
import UserFriendshipCard from "./UserFriendshipCard";
import {connect} from "react-redux";
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
                <ul className={styles.list}>
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

Followers.propTypes = {
    closeModal: PropTypes.func.isRequired,
    id: PropTypes.number.isRequired,
    dispatch: PropTypes.func.isRequired,
    followers: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        avatar: PropTypes.string,
        username: PropTypes.string.isRequired
    }))
};

const mapStateToProps = state => ({
    followers: state.users.followers,
});

export default connect(mapStateToProps)(Followers);