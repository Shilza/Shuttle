import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import * as UserService from "../../services/user";
import styles from './user.module.css';
import User from "../../components/User/User";
import WithLoading from "../../components/Loader/Loader";
import UserDoesNotExists from "../../components/ExplainingLabels/UserDoesNotExists/UserDoesNotExists";

const UserPageWithLoading = WithLoading(User);

const UserPage = ({match, dispatch}) => {

    let [isLoading, setIsLoading] = useState(true);
    let [error, setError] = useState('');

    useEffect(() => {
        dispatch(UserService.getUser(match.params.username))
            .then(() => setIsLoading(false))
            .catch(err => {
                setError(err.response.data.message);
                setIsLoading(false);
            });
    }, []);


    return (
        <div className={styles.container}>
            {
                error ? <UserDoesNotExists text={error}/> :
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