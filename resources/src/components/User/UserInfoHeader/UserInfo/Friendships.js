import Modal from "../../../Modal/Modal";
import React from "react";
import styles from './friendships.module.css';
import UserFriendshipCard from "./UserFriendshipCard";

const Friendships = ({closeModal, friendships}) => (
    <Modal closeModal={closeModal}>
        <input/>
        <ul className={styles.friendshipsContainer}>
            {
                friendships.map(item => <UserFriendshipCard key={item.id} user={item}/>)
            }
        </ul>
    </Modal>
);

export default Friendships;