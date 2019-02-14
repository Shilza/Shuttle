import React from "react";
import styles from './searchBar.module.css';
import {Icon} from "antd";
import {connect} from "react-redux";
import User from "./User";
import {removeUsers} from "../../store/actions/search";

class SearchBar extends React.Component {

    componentDidMount() {
        document.addEventListener('mousedown', this.props.makeBarInvisible);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.props.makeBarInvisible);
    }

    render() {
        const {users} = this.props;

        return (
            <div className={styles.searchBar} ref={this.props.searchBarRef}>
                {
                    users ?
                        (
                            users.length
                                ? users.map(user => <User key={user.id} user={user}/>)
                                : <span>Nothing to show</span>
                        )
                        :
                        <Icon type="loading"/>
                }
            </div>
        );
    }
}

const mapStateToProps = state => ({
    users: state.search.users
});

export default connect(mapStateToProps)(SearchBar);