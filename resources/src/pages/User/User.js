import React from "react";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import * as UserService from "../../services/user";
import styles from './user.module.css';
import User from "../../components/User/User";
import WithLoading from "../../components/Loader/Loader";

const UserPageWithLoading = WithLoading(User);

class UserPage extends React.Component {

    state = {
        isLoading: true,
        error: ''
    };

    componentDidMount() {
        const {match, dispatch} = this.props;

        dispatch(UserService.getUser(match.params.username))
            .then(() => this.setState({isLoading: false}))
            .catch(err => this.setState({
                isLoading: false,
                error: err.response.data.message
            }));
    }

    render() {
        const {isLoading, error} = this.state;

        return (
            <div className={styles.container}>
                {
                    error ? <span>{error}</span> :
                        <UserPageWithLoading isLoading={isLoading}/>
                }
            </div>
        )
    }
}

export default connect()(UserPage);