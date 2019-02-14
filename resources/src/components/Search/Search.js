import React, {createRef} from "react";
import SearchBar from './SearchBar';
import styles from './search.module.css';
import {connect} from "react-redux";
import * as SearchService from "../../services/search";
import {removeUsers} from "../../store/actions/search";

class Search extends React.Component {

    state = {
        barVisible: false
    };
    searchBarRef = createRef();

    search = event => {
        const {dispatch} = this.props;

        this.setState({ barVisible: true });
        if (event.target.value)
            dispatch(SearchService.search(event.target.value));
    };

    makeBarInvisible = event => {
        if(!this.searchBarRef.current.contains(event.target)) {
            this.setState({ barVisible: false });
            this.props.dispatch(removeUsers());
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
                {
                    this.state.barVisible &&
                    <SearchBar
                        searchBarRef={this.searchBarRef}
                        makeBarInvisible={this.makeBarInvisible}
                    />
                }
            </div>
        );
    }
}

export default connect()(Search);