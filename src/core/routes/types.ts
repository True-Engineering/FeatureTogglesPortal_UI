import { FC } from 'react';

export interface RouteConfigParams {
  pathTemplate: string;
  component: FC;
  isExact?: boolean;
  isPublicPage?: boolean;
  roles?: string[];
  pageTitle?: string; // key from locales.pageTitle
}

export type IRoutesConfig<C extends string> = Record<C, RouteConfigParams>;

export interface IRoute extends RouteConfigParams {
  getUrl(params?: IRequestParams): string;
  getPathTemplate(): string;
}

export type IRoutes<C extends string> = Record<C, IRoute>;
type IValidTypes = string | number | null | undefined;
export type IRequestParams = Record<string, IValidTypes | IValidTypes[]>;

export interface IPathConfig {
  path: string;
  keys?: string[];
  unnecessaryKeys?: string[];
}
