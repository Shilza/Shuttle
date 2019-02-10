import React, {createRef} from "react";
import SearchBar from './SearchBar';
import styles from './search.module.css';
import {connect} from "react-redux";
import * as SearchService from "../../services/search";
import {removeUsers} from "../../store/actions/search";

class Search extends React.Component {

    searchBarRef = createRef();

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickSearchBar);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickSearchBar);
    }

    handleClickSearchBar = event => {
        if (!this.searchBarRef.current.contains(event.target)) {
            this.searchBarRef.current.style.display = 'none';
            this.props.dispatch(removeUsers());
        }
    };

    search = event => {
        const {dispatch} = this.props;

        if (event.target.value) {
            this.searchBarRef.current.style.display = 'flex';
            dispatch(SearchService.search(event.target.value));
        }
    };

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.search}>
                    <div className={styles.searchBox}>
                        <input
                            type="text"
                            onChange={this.search}
                        />
                        <span/>
                    </div>
                </div>
                <SearchBar searchBarRef={this.searchBarRef}/>
            </div>
        );
    }
}

export default connect()(Search);