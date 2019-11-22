import React from 'react'
import {Redirect, Route} from 'react-router'
import {connect} from "react-redux";
import Main from "../components/Main/Main";

const PublicRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    !isAuthenticated ? (
      <Main>
        <Component {...props}/>
      </Main>
    ) : (
      <Redirect to={{
        pathname: '/',
        state: {from: props.location}
      }}/>
    )
  )}/>
);

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  }
};

export default connect(mapStateToProps)(PublicRoute);
