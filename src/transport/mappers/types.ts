import {
  IEnvironmentId,
  IFlagTypeProp,
  IEnvironmentPermission,
  IProjectId,
  IProjectStatus,
  IProjectPermission,
  IOrganizationId,
  IOrganizationPermission,
  IProjectEnvironment,
  IFlagAction,
  IPaginationData,
} from '../../types';

export type IRawFlippingStrategyParams = Record<string, string>;

export type IRawPropertiesType = Record<string, string>;

export interface IRawFlagEnvironment {
  id: IEnvironmentId;
  name: string;
  enable: boolean;
  flippingStrategy?: IRawFlippingStrategy;
  permissions?: IEnvironmentPermission[];
}

export interface IRawFlippingStrategy {
  initParams?: IRawFlippingStrategyParams;
  type: string;
}

export interface IRawFlag {
  uid: string;
  description?: string;
  environments: IRawFlagEnvironment[];
  type?: IFlagTypeProp;
  tags?: string[];
  sprint?: string;
  group?: string;
}

export interface IRawProject {
  id: IProjectId;
  name: string;
  environments: IRawProjectEnvironment[];
  membersCount?: number;
  featureFlagsCount?: number;
  status: IProjectStatus;
  permissions: IProjectPermission[];
}

export interface IRawOrganization {
  id: IOrganizationId;
  name: string;
  projects: IRawProject[];
  permissions: IOrganizationPermission[];
  membersCount?: number;
}

export interface IRawProjectEnvironment
  extends Omit<
    IProjectEnvironment<string>,
    'freezingEnable' | 'freezingUser' | 'freezingEndTime'
  > {
  properties?: IRawPropertiesType;
}

export interface IRawFlagFieldChanges<K extends keyof IRawFlag> {
  old?: IRawFlag[K];

  new?: IRawFlag[K];
}

export type IRawFlagChanges = {
  [K in keyof IRawFlag]?: IRawFlagFieldChanges<K>;
};

export interface IRawHistoryOfChangesListItem {
  id: number;
  action: IFlagAction;
  userName: string;
  featureFlag: IRawFlag;
  environment?: string;
  time: string;
  changes?: IRawFlagChanges;
  creationInfo?: IRawFlag;
}

export interface IRawHistoryOfChanges extends IPaginationData {
  changesHistory: IRawHistoryOfChangesListItem[];
}
