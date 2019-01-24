import Modal from "../../../Modal/Modal";
import React from "react";
import {connect} from "react-redux";
import styles from './friendships.module.css';

const FollowsModal = ({closeModal, follows}) => (
    <Modal closeModal={closeModal}>
        <ul className={styles.friendshipsContainer}>
            {
                follows.map(item => <li key={item.id}>{item.username}</li>)
            }
        </ul>
    </Modal>
);


const mapStateToProps = state => {
    return {
        follows: state.users.follows
    }
};

export default connect(mapStateToProps)(FollowsModal);