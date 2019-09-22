import React, {useState} from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import Routes from "routes";
import * as AuthService from "services/auth";

import StartLoader from "components/StartLoader/StartLoader";

const App = ({isAuthenticated, dispatch}) => {
  const [error, setError] = useState(null);

  if (error) {
    return <div>{error.toString()}</div>
  }

  if (!isAuthenticated && localStorage.hasOwnProperty('accessToken')) {
    dispatch(AuthService.me()).catch((err) => setError(err));
    return <StartLoader/>
  }

  return <Routes/>
};

App.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
};

export default connect(state => ({
  isAuthenticated: state.auth.isAuthenticated,
}))(App);
