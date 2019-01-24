import React from "react";
import styles from './header.module.css';
import {bindActionCreators} from "redux";
import * as AuthService from "../../services/auth";
import {connect} from "react-redux";
import Search from "../../Search/Search";
import {Link} from "react-router-dom";
import shuttle from './shuttle.png';

const Header = ({logout}) => (
    <div className={styles.header}>
        <Link to='/' style={{marginLeft: 20}}>
            <img width='30' height='30' src={shuttle}/>
        </Link>
        <Search/>
        <div>
            <button
                className={styles.logout}
                onClick={logout}
            >
                Logout
            </button>
        </div>
    </div>
);

const mapDispatchToProps = dispatch => {
    return bindActionCreators({
        logout: AuthService.logout
    }, dispatch);
};

export default connect(null, mapDispatchToProps)(Header);