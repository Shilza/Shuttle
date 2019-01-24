import React from "react";
import styles from './searchBar.module.css';
import {Icon} from "antd";
import {connect} from "react-redux";
import User from "./User";

const SearchBar = ({searchBarRef, users}) => {

    return (
        <div className={styles.searchBar} ref={searchBarRef}>
            {
                users ?
                    users.map(user => <User key={user.id} user={user}/>)
                    :
                    <Icon type="loading"/>
            }
        </div>
    );
};

const mapStateToProps = state => {
    return {
        users: state.search.users
    }
};

export default connect(mapStateToProps)(SearchBar);