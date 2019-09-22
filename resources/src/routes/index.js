import React, {Suspense} from 'react'
import {BrowserRouter, Switch} from 'react-router-dom'

import {routes} from './routes'

import SplittingLoader from "components/SplittingLoader";

import PublicRoute from "./Public";
import PrivateRoute from "./Private";

const Routes = () => (
  <BrowserRouter>
    <Suspense fallback={<SplittingLoader/>}>
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
    </Suspense>
  </BrowserRouter>
);

export default Routes;
