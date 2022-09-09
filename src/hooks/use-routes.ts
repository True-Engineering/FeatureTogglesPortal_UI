import { useContext } from 'react';
import { useRouteMatch, useHistory } from 'react-router-dom';
import { parseQueryString } from '@true-engineering/true-react-common-api-client';
import type { Routes, IRoutesParams, IRoutes } from '../core';
import { getActiveRouteName, RoutesContext } from '../core/routes/routes';

interface IUseRoutesResult<R extends Routes> {
  routes: IRoutes<Routes>;
  activeRoute?: string;
  params: IRoutesParams[R];
  changeLocation: (to: string) => void;
}

export const useRoutes = <R extends Routes>(): IUseRoutesResult<R> => {
  const routes = useContext<IRoutes<Routes>>(RoutesContext);
  const history = useHistory();
  const match = useRouteMatch();
  const params = match.params;
  const queryParams = parseQueryString(history.location.search);

  const activeRoute = getActiveRouteName(routes, match.path);

  const changeLocation = (to: string) => history.push(to);

  return {
    routes,
    activeRoute,
    params: { ...params, ...queryParams } as IRoutesParams[R],
    changeLocation,
  };
};
