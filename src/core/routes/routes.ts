import { createContext } from 'react';
import { matchPath } from 'react-router-dom';
import {
  compilePath,
  parsePathTemplate,
} from '@true-engineering/true-react-common-api-client';
import type { IRoutes, IRoutesConfig, IRequestParams } from './types';
import { urlPath } from '../../environment-config';
import type { Routes } from './routes-config';

export const getActiveRouteName = (
  routes: IRoutes<Routes>,
  path: string,
): string | undefined =>
  Object.keys(routes).find(route => {
    const configRoute = routes[route as Routes];
    return (
      matchPath(path, {
        path: configRoute.getPathTemplate(),
        exact: configRoute.isExact,
      }) !== null
    );
  });

export const RoutesContext = createContext<IRoutes<Routes>>(
  ({} as unknown) as IRoutes<Routes>,
);

export const getRoutes = (
  routesConfig: IRoutesConfig<Routes>,
): IRoutes<Routes> =>
  Object.fromEntries(
    Object.entries(routesConfig).map(([route, routeConfig]) => [
      route,
      {
        ...routeConfig,
        getUrl: (params?: IRequestParams) =>
          `${urlPath}${compilePath(
            parsePathTemplate(routeConfig.pathTemplate),
            params,
          )}`,
        getPathTemplate: () => `${urlPath}${routeConfig.pathTemplate}`,
      },
    ]),
  ) as IRoutes<Routes>;
