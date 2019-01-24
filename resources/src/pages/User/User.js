import React from "react";
import {connect} from "react-redux";
import {message} from "antd/lib/index";
import * as UserService from "../../services/user";
import styles from './user.module.css';
import User from "../../components/User/User";


function withUser(Component) {
    return class extends React.Component {

        state = {
            error: false
        };

        componentDidMount() {
            const {match, dispatch} = this.props;
            dispatch(UserService.getUser(match.params.username))
                .catch(err => {
                    message.error(err.response.data.message);
                    this.setState({error: true});
                });
        }

        render() {
            const {user, currentAuthUserId} = this.props;
            const {error} = this.state;

            return (
                <div className={styles.container}>{
                    user ?
                        <Component me={user.id === currentAuthUserId}/>
                        :
                        <LoadingOrError error={error}/>
                }
                </div>
            )
        }
    }
}

const LoadingOrError = ({error}) => {
    return error ? <div>User does not exists</div> : <div>Loading</div>;
};

const mapStateToProps = state => {
    return {
        user: state.users.user,
        currentAuthUserId: state.auth.user.id
    };
};

export default connect(mapStateToProps)(withUser(User));