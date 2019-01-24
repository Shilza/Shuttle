import React from "react";
import styles from './postControl.module.css';
import {Link} from "react-router-dom";

const Header = ({username}) => (
    <header className={styles.header}>
        <img src='https://i.ytimg.com/vi/Y5GLCBjHR8U/maxresdefault.jpg' className={styles.avatar}/>
        <Link to={username} className={styles.username}>{username}</Link>
    </header>
);

export default Header;