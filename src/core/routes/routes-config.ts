import {
  FlagsPage,
  ProjectsPage,
  NotFoundPage,
  InvitePage,
  ProjectUsersPage,
  OrganizationUsersPage,
} from '../../components';
import { RouteConfigParams } from './types';

export interface IRoutesParams {
  mainPage: {};

  projectsPage: {};

  notFound: {};

  projectPage: {
    projectId?: string;
  };

  projectUsersPage: {
    projectId: string;
  };

  organizationUsersPage: {
    organizationId: string;
  };

  invitePage: {
    uuid: string;
  };
}

export type Routes = keyof IRoutesParams;

export const routesConfig: Record<Routes, RouteConfigParams> = {
  mainPage: {
    component: FlagsPage,
    pathTemplate: '/',
    isPublicPage: false,
    isExact: true,
  },

  projectPage: {
    component: FlagsPage,
    pathTemplate: '/project/:projectId',
    isPublicPage: false,
    isExact: true,
  },

  projectUsersPage: {
    component: ProjectUsersPage,
    pathTemplate: '/project/:projectId/users',
    isPublicPage: false,
    isExact: true,
  },

  organizationUsersPage: {
    component: OrganizationUsersPage,
    pathTemplate: '/organization/:organizationId/users',
    isPublicPage: false,
    isExact: true,
  },

  projectsPage: {
    component: ProjectsPage,
    pathTemplate: '/projects',
    isPublicPage: false,
    isExact: true,
  },

  invitePage: {
    component: InvitePage,
    pathTemplate: '/invite/:uuid',
    isPublicPage: true,
    isExact: true,
  },

  notFound: {
    component: NotFoundPage,
    isPublicPage: true,
    pathTemplate: '*',
  },
};

export default routesConfig;
