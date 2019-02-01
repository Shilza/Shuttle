import React from "react";
import styles from './header.module.css';
import {connect} from "react-redux";
import Search from "../Search/Search";
import {Link} from "react-router-dom";
import shuttle from './shuttle.png';
import DefaultAvatar from "../DefaultAvatar/DefaultAvatar";

const Header = ({username, avatar}) => (
    <div className={styles.header}>
        <Link to='/' style={{marginLeft: 20}}>
            <img width='30' height='30' src={shuttle}/>
        </Link>
        <Search/>
        <Link to={username} style={{marginRight: 20}}>
            {
                avatar
                    ? <img src={avatar} alt='avatar' className={styles.avatar}/>
                    : <div className={styles.avatar}><DefaultAvatar fontSize={'20px'}/></div>
            }
        </Link>
    </div>
);

const mapStateToProps = state => ({
    username: state.auth.user.username,
    avatar: state.auth.user.avatar
});

export default connect(mapStateToProps)(Header);