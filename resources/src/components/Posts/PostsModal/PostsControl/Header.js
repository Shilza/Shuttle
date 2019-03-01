import React from "react";
import PropTypes from 'prop-types';
import styles from './postControl.module.css';
import {Link} from "react-router-dom";
import DefaultAvatar from "../../../DefaultAvatar/DefaultAvatar";

const Header = ({username, avatar}) =>
    <Link to={username}>
        <header className={styles.header}>
            {
                avatar
                    ? <img src={avatar} alt='avatar' className={styles.avatar}/>
                    : <div className={styles.avatar}><DefaultAvatar fontSize={'16px'}/></div>
            }
            <span className={styles.username}>{username}</span>
        </header>
    </Link>;

Header.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.string
};

export default React.memo(Header);