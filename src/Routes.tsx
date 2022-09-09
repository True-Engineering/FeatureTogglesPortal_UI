import React, { FC } from 'react';
import { observer } from 'mobx-react-lite';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import {
  getRoutes,
  RoutesContext,
  routesConfig,
  Routes,
  RouteWrapper,
  IRoutes,
} from './core';

import './i18nConfig';

const routes: IRoutes<Routes> = getRoutes(routesConfig);

interface IRoutesProps {
  children: React.ReactNode;
}

const Routes: FC<IRoutesProps> = ({ children }) => (
  <RoutesContext.Provider value={routes}>
    <Router>
      <>
        <Switch>
          {Object.keys(routes).map(route => (
            <Route
              path={routes[route as Routes].getPathTemplate()}
              exact={routes[route as Routes].isExact}
              render={() => (
                <RouteWrapper
                  component={routes[route as Routes].component}
                  route={routes[route as Routes]}
                />
              )}
              key={route}
            />
          ))}
        </Switch>
        {children}
      </>
    </Router>
  </RoutesContext.Provider>
);

export default observer(Routes);
