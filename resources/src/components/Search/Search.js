import React, {useRef, useState} from "react";
import PropTypes from 'prop-types';
import SearchBar from './SearchBar';
import styles from './search.module.css';
import {connect} from "react-redux";
import * as SearchService from "../../services/search";
import {removeUsers} from "../../store/actions/search";

const Search = ({dispatch}) => {

    let [barIsVisible, setBarIsVisible] = useState(false);

    let searchBarRef = useRef();

    const search = event => {
        setBarIsVisible(true);

        if (event.target.value)
            dispatch(SearchService.search(event.target.value));
    };

    const makeBarInvisible = event => {
        if (!searchBarRef.current.contains(event.target)) {
            setBarIsVisible(false);
            dispatch(removeUsers());
        }
    };

    return (
        <div className={styles.container}>
            <Searcher search={search}/>
            {
                barIsVisible &&
                <SearchBar
                    searchBarRef={searchBarRef}
                    makeBarInvisible={makeBarInvisible}
                />
            }
        </div>
    );
};

const Searcher = ({search}) =>
    <div className={styles.search}>
        <div className={styles.searchBox}>
            <input
                type="text"
                onChange={search}
            />
            <span/>
        </div>
    </div>;


Searcher.propTypes = {
    search: PropTypes.func.isRequired
};

Search.propTypes = {
    dispatch: PropTypes.func.isRequired
};

export default connect()(Search);