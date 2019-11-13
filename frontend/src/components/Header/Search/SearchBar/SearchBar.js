import React, {useRef} from "react";
import PropTypes from 'prop-types';
import useOnClickOutside from "use-onclickoutside";

import {UsersList} from "./UsersList/UsersList";

import styles from './searchBar.module.css';


const SearchBar = ({makeBarInvisible, users, fetcher, closeBar}) => {

  let containerRef = useRef(null);
  useOnClickOutside(containerRef, makeBarInvisible);

  return (
    <div className={styles.searchBar} ref={containerRef}>
      <UsersList users={users} closeBar={closeBar} fetcher={fetcher}/>
    </div>
  );
};

SearchBar.propTypes = {
  closeBar: PropTypes.func.isRequired,
  makeBarInvisible: PropTypes.func.isRequired,
  users: PropTypes.array,
  fetcher: PropTypes.func
};

export default SearchBar;
