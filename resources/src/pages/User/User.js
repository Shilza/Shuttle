import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as UserService from "../../services/user";
import styles from './user.module.css';
import User from "../../components/User/User";
import WithLoading from "../../components/Loader/Loader";

const UserPageWithLoading = WithLoading(User);

const UserPage = ({match, dispatch}) => {

    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');

    useEffect(() => {
        dispatch(UserService.getUser(match.params.username))
            .then(() => setIsLoading(false))
            .catch(err => {
                setIsLoading(false);
                setError(err.response.data.message);
            });
    }, []);

    return (
        <div className={styles.container}>
            {
                error ? <span>{error}</span> :
                    <UserPageWithLoading isLoading={isLoading}/>
            }
        </div>
    )
};

UserPage.propTypes = {
    dispatch: PropTypes.func.isRequired,
    match: PropTypes.object
};

export default connect()(UserPage);