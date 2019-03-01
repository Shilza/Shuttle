import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import styles from './searchBar.module.css';
import {Icon} from "antd";
import {connect} from "react-redux";
import User from "./User";

const SearchBar = ({makeBarInvisible, users, searchBarRef}) => {

    useEffect(() => {
        document.addEventListener('mousedown', makeBarInvisible);
        return componentWillUnmount;
    }, []);

    const componentWillUnmount = () => document.removeEventListener('mousedown', makeBarInvisible);


    return (
        <div className={styles.searchBar} ref={searchBarRef}>
            {
                users ?
                    (
                        users.length
                            ? users.map(user =>
                                <User key={user.id} username={user.username} avatar={user.avatar}/>
                            )
                            : <span>Nothing to show</span>
                    )
                    :
                    <Icon type="loading"/>
            }
        </div>
    );
};

SearchBar.propTypes = {
    makeBarInvisible: PropTypes.func.isRequired,
    users: PropTypes.array,
    searchBarRef: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    users: state.search.users
});

export default connect(mapStateToProps)(SearchBar);