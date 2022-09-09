import { makeAutoObservable, set } from 'mobx';
import { apiClient, SIGN_IN_PATHNAME, SIGN_OUT_PATHNAME } from '../transport';
import {
  IOrganization,
  IOrganizationId,
  IProject,
  IProjectId,
  IUser,
} from '../types';
import { ITechStore, TechStore } from './techStore';

export interface IStore {
  techStore: ITechStore;
  frontendVersion?: string;
  backendVersion?: string;

  user?: IUser;
  organizations?: IOrganization[];
  currentOrganization?: IOrganization;
  isInitializing: boolean;

  init: () => Promise<void>;
  refreshOrganization: () => Promise<void>;
  refreshProject: (id: IOrganizationId) => Promise<void>;
  setDefaultProject: (id: IProjectId) => void;
  setBackendVersion: (version: string) => void;
  findOrganizationById: (id?: IOrganizationId) => IOrganization | undefined;
  findProjectById: (id?: IProjectId) => IProject | undefined;
  findDefaultProject: () => IProject | undefined;

  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
}

export class Store implements IStore {
  public techStore: ITechStore;
  public frontendVersion?: string;
  public backendVersion?: string;

  public user?: IUser;
  public organizations?: IOrganization[];
  public currentOrganization?: IOrganization;
  public isInitializing;

  constructor() {
    this.techStore = new TechStore();
    this.frontendVersion = process.env.APP_VERSION;
    this.backendVersion = undefined;

    this.user = undefined;
    this.organizations = undefined;
    this.currentOrganization = undefined;
    this.isInitializing = false;

    makeAutoObservable(this);
  }

  public init = async () => {
    this.isInitializing = true;

    try {
      const user = await apiClient.getUser();
      this.user = user;

      const organizations = await apiClient.loadOrganizations();
      this.organizations = organizations;
      this.currentOrganization = organizations[0];
      this.isInitializing = false;
    } catch {
      this.user = undefined;
      this.currentOrganization = undefined;
    }
  };

  public refreshOrganization = async () => {
    const organizations = await apiClient.loadOrganizations();
    this.currentOrganization = organizations[0];
  };

  public refreshProject = async (projectId: IProjectId) => {
    if (this.currentOrganization === undefined) {
      throw new Error('no organization');
    }

    const newProjectInfo = await apiClient.getProject({
      organizationId: this.currentOrganization.id,
      projectId,
    });

    this.currentOrganization = {
      ...this.currentOrganization,
      projects: this.currentOrganization.projects.map(project =>
        project.id === projectId ? newProjectInfo : project,
      ),
    };
  };

  public findOrganizationById = (
    organizationId?: IOrganizationId,
  ): IOrganization | undefined => {
    if (this.organizations === undefined) {
      console.error('findOrganizationById: no organization');
      return undefined;
    }

    if (organizationId === undefined) {
      return undefined;
    }

    return this.organizations.find(
      organization => organization.id === organizationId,
    );
  };

  public findProjectById = (projectId?: IProjectId): IProject | undefined => {
    if (this.currentOrganization === undefined) {
      console.error('findProjectById: no organization');
      return undefined;
    }

    if (projectId === undefined) {
      return undefined;
    }

    const { projects } = this.currentOrganization;
    return projects.find(project => project.id === projectId);
  };

  public findDefaultProject = (): IProject | undefined => {
    if (this.currentOrganization === undefined) {
      console.error('findDefaultProject: no organization');
      return undefined;
    }

    if (this.user === undefined) {
      console.error('findDefaultProject: no user');
      return undefined;
    }

    const { defaultProjectId } = this.user.userSettings ?? {};
    return this.findProjectById(defaultProjectId);
  };

  public setDefaultProject = (projectId: IProjectId) => {
    if (this.user === undefined) {
      console.error('setDefaultProject: no user');
      return;
    }

    this.user.userSettings = {
      ...this.user.userSettings,
      defaultProjectId: projectId,
    };
  };

  public setBackendVersion = (version: string) => {
    this.backendVersion = version;
  };

  public signIn = async () => {
    const currentHref = window.location.href;
    window.location.href = `${window.location.origin}${SIGN_IN_PATHNAME}?redirect_uri=${currentHref}`;
  };

  public signOut = async () => {
    set(this, {
      isInitializing: true,
      user: undefined,
      currentOrganization: undefined,
      organizations: undefined,
    });
    window.location.href = `${window.location.origin}${SIGN_OUT_PATHNAME}`;
  };
}

export default Store;
