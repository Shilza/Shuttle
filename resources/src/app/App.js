import React, {useEffect, useState} from "react";
import PropTypes from 'prop-types'
import {connect} from 'react-redux';

import Routes from "routes";

import StartLoader from "components/StartLoader";

const App = ({isAuthenticated, dispatch}) => {
  const [error, setError] = useState(null);

  if (error) {
    return <div>{error.toString()}</div>
  }

  useEffect(() => {
    // fetch('https://api.ipify.org?format=json').then(data => {
    //   data.json().then(data => {
    //     const key = process.env.API_IPSTACK_KEY;
    //     fetch(`http://api.ipstack.com/${data.ip}?access_key=${key}`).then(data => {
    //       data.json().then(console.log)
    //     });
    //   })
    // });
  }, []);


  if (!isAuthenticated && localStorage.hasOwnProperty('accessToken')) {
    dispatch.auth.authentication()
      .catch((err) => setError(err));
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
