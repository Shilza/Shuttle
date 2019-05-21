import React from "react";
import PropTypes from 'prop-types';
import styles from './header.module.css';
import {connect} from "react-redux";
import Search from "../Search/Search";
import {Link} from "react-router-dom";
import shuttle from '../../images/logo.png';
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";

const Header = ({username, avatar}) => (
    <div className={styles.header}>
        <Link to='/' className={styles.logo}>
            <img src={shuttle} alt={'Shuttle logo'}/>
        </Link>
        <Search/>
        <Link to={'/' + username} className={styles.username}>
            {
                avatar
                    ? <img src={avatar} alt='avatar' className={styles.avatar}/>
                    : <div className={styles.avatar}><DefaultAvatar fontSize={'16px'}/></div>
            }
        </Link>
    </div>
);

Header.propTypes = {
    username: PropTypes.string.isRequired,
    avatar: PropTypes.any // can be null
};

const mapStateToProps = state => ({
    username: state.auth.user.username,
    avatar: state.auth.user.avatar
});

export default connect(mapStateToProps)(Header);