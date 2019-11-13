import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {connect} from "react-redux";
import WithLoading from "components/Loader/Loader";
import UserDoesNotExists from "components/ExplainingLabels/UserDoesNotExists/UserDoesNotExists";
import User from './User/index';

import styles from './user.module.css';

const UserPageWithLoading = WithLoading(User);

const UserPage = ({currentUser, match, dispatch}) => {

  let [isLoading, setIsLoading] = useState(currentUser !== match.params.username);
  let [error, setError] = useState('');

  useEffect(() => {
    if (currentUser !== match.params.username)
      dispatch.users.getUser(match.params.username)
        .catch(err => {
          if(err.response)
            setError(err.response.data.message);
        })
        .finally(() => {
          setIsLoading(false);
        });
  });

  return (
    <div className={styles.container}>
      {
        error
          ? <UserDoesNotExists text={error}/>
          : <UserPageWithLoading isLoading={isLoading}/>
      }
    </div>
  )
};

UserPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.string,
  match: PropTypes.object
};

export default connect(state => ({
  currentUser: state.users.user && state.users.user.username
}))(UserPage);
