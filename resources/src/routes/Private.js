import React from 'react'
import {Redirect, Route} from 'react-router'
import {connect} from 'react-redux'
import Main from "../Main";
import Welcome from "../pages/Welcome/Welcome";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Main>
                <Component {...props}/>
            </Main>
        ) : (
            <Welcome/>
        )
    )}/>
);

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
};

export default connect(mapStateToProps)(PrivateRoute);