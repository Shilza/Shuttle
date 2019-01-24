import React from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'
import {routes} from './routes'
import PublicRoute from "./Public";
import PrivateRoute from "./Private";

const Routes = () => (
    <BrowserRouter>
        <Switch>
            {
                routes.map((route, i) => {
                        if (route.auth)
                            return <PrivateRoute key={i} {...route}/>;
                        else
                            return <PublicRoute key={i} {...route}/>;
                    }
                )}
        </Switch>
    </BrowserRouter>
);

export default Routes;