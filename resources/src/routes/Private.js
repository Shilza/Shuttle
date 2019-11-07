import React from 'react'
import {Route} from 'react-router'
import {connect} from 'react-redux'

import Main from "components/Main";
import Toolbar from "components/Toolbar";
import Header from "components/Header";
import Welcome from "pages/Welcome";
import {isMobile} from "utils";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
  <Route {...rest} render={props => (
    <Main>
      {
        isAuthenticated
          ? <>
            <Header/>
            <Component {...props}/>
            {isMobile() && <Toolbar/>}
          </>
          : <Welcome/>
      }
    </Main>
  )}/>
);

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(PrivateRoute);
