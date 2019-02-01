import {connect} from "react-redux";
import {logout} from "../../../../services/auth";
import React from "react";
import styles from './settings.module.css';
import {Icon} from "antd";

class Logout extends React.Component {

    state = {
        isLoading: false
    };

    actionLogout = () => {
        this.setState({isLoading: true});
        this.props.dispatch(logout())
            .then(() => this.setState({isLoading: false}))
            .catch(() => this.setState({isLoading: false}))
    };

    render() {
        return (
            <div className={styles.logoutContainer}>
                <button
                    className={styles.logout}
                    onClick={this.actionLogout}
                >
                    Logout
                </button>
                {
                    this.state.isLoading && <Icon type='loading'/>
                }
            </div>
        );
    }
}

export default connect()(Logout);