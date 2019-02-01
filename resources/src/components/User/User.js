import React from "react";
import Header from "./Header/Header";
import styles from './userPage.module.css';

const User = () => {
    return (
        <div className={styles.userPageContainer}>
            <Header/>
        </div>
    );
};

export default User;