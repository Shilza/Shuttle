import React from 'react'
import {Route} from 'react-router'
import {connect} from 'react-redux'
import Main from "../components/Main/Main";
import Welcome from "../pages/Welcome/Welcome";
import Toolbar from "../components/Toolbar/Toolbar";
import Header from "../components/Header/Header";
import {isMobile} from "../utils/isMobile";

const PrivateRoute = ({component: Component, isAuthenticated, ...rest}) => (
    <Route {...rest} render={props => (
        isAuthenticated ? (
            <Main>
                <Header/>
                <Component {...props}/>
                { isMobile() && <Toolbar/> }
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
