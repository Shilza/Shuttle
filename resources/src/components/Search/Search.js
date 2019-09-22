import React, {useEffect, useState, useRef} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";

import SearchBar from './SearchBar/SearchBar';
import * as SearchService from "services/search";
import {removeUsers, setIsSearchFocused} from "store/actions/search";

import styles from './search.module.css';

const Search = ({dispatch, isSearchFocused}) => {

  let [isBarVisible, setBarIsVisible] = useState(false);

  let searchBarRef = useRef();
  let searchRef = useRef();

  useEffect(() => {
    if (isSearchFocused)
      searchRef.current.focus();
  }, [isSearchFocused]);

  const search = event => {
    setBarIsVisible(true);
    dispatch(setIsSearchFocused(true));

    if (event.target.value)
      dispatch(SearchService.search(event.target.value));
  };

  const makeBarInvisible = event => {
    if (!searchBarRef.current.contains(event.target)) {
      setBarIsVisible(false);
      closeSearchInput();
      dispatch(removeUsers());
    }
  };

  const closeSearchInput = () => {
    dispatch(setIsSearchFocused(false));
  };

  const openSearchInput = () => {
    dispatch(setIsSearchFocused(true));
  };

  const closeBar = () => {
    setBarIsVisible(false);
  };

  return (
    <div className={styles.container}>
      <SearchInput
        search={search}
        searchRef={searchRef}
        onBlur={closeSearchInput}
        onFocus={openSearchInput}
      />
      {
        isBarVisible &&
        <SearchBar
          searchBarRef={searchBarRef}
          makeBarInvisible={makeBarInvisible}
          closeBar={closeBar}
        />
      }
    </div>
  );
};

const SearchInput = ({search, onBlur, onFocus, searchRef}) =>
  <div className={styles.search}>
    <div className={styles.searchBox}>
      <input
        type="text"
        onChange={search}
        ref={searchRef}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      <span/>
    </div>
  </div>;


SearchInput.propTypes = {
  search: PropTypes.func.isRequired
};

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  isSearchFocused: PropTypes.bool.isRequired
};

export default connect((state) => ({
  isSearchFocused: state.search.isSearchFocused
}))(Search);
