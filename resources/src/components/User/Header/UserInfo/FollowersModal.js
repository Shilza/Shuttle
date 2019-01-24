import Modal from "../../../Modal/Modal";
import React from "react";
import {connect} from "react-redux";
import styles from './friendships.module.css';

const FollowersModal = ({closeModal, followers}) => (
    <Modal closeModal={closeModal}>
        <ul className={styles.friendshipsContainer}>
            {
                followers.map(item => <li key={item.id}>{item.username}</li>)
            }
        </ul>
    </Modal>
);

const mapStateToProps = state => {
    return {
        followers: state.users.followers
    }
};

export default connect(mapStateToProps)(FollowersModal);