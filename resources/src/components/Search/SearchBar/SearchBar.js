import React, {useEffect} from "react";
import PropTypes from 'prop-types';
import {Icon} from "antd";
import {connect} from "react-redux";

import {UsersList} from "../UsersList/UsersList";

import styles from './searchBar.module.css';

const SearchBar = ({makeBarInvisible, users, searchBarRef, closeBar}) => {

  useEffect(() => {
    document.addEventListener('mousedown', makeBarInvisible);
    return () => document.removeEventListener('mousedown', makeBarInvisible);
  }, []);

  return (
    <div className={styles.searchBar} ref={searchBarRef}>
      {
        users ?
          (
            users.length
              ? <UsersList users={users} closeBar={closeBar}/>
              : <div className={styles.nothingToShow}>Nothing to show</div>
          )
          : <Icon type="loading"/>
      }
    </div>
  );
};

SearchBar.propTypes = {
  closeBar: PropTypes.func.isRequired,
  makeBarInvisible: PropTypes.func.isRequired,
  users: PropTypes.array,
  searchBarRef: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  users: state.search.users
});

export default connect(mapStateToProps)(SearchBar);