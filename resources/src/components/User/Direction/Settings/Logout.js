import React, {useState} from "react";
import {connect} from "react-redux";
import {logout} from "../../../../services/auth";
import styles from './settings.module.css';
import {Icon} from "antd";

const Logout = ({dispatch}) => {

    let [isLoading, setIsLoading] = useState(false);

    const actionLogout = () => {
        setIsLoading(true);
        dispatch(logout())
            .then(() => setIsLoading(false))
            .catch(() => setIsLoading(false))
    };

    return (
        <div className={styles.logoutContainer}>
            <button
                className={styles.logout}
                onClick={actionLogout}
            >
                Logout
            </button>
            {
                isLoading && <Icon type='loading'/>
            }
        </div>
    );
};

export default connect()(Logout);