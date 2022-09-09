import type { IFlippingStrategy } from '../types';

export interface IUser<DateType = Date> {
  id: IUserId;
  userName: string;
  email: string;
  avatarUrl?: string;
  authorities: string[];
  lastLogin?: DateType;
  status?: IUserStatus;
  userSettings?: {
    defaultProjectId?: IProjectId;
  };
}
export interface IFlag {
  name: string; // Name
  description: string; // Task
  sprint?: string; // Sprint
  type?: IFlagTypeProp;
  tag?: string;
  group?: string;
  environments: IFlagEnvironment[];
}

export interface IFlagEnvironment {
  id: IEnvironmentId;
  name: string;
  isEnabled: boolean;
  flippingStrategy?: IFlippingStrategy;
  permissions: IEnvironmentPermission[];
}

export interface IFlagState {
  flag: IFlag;
  environment: IFlagEnvironment;
  isEnabled: boolean;
}

export type ISortDirection = 'asc' | 'desc' | 'none';

export type ISortBy = 'sprint' | 'task' | 'type' | 'tag';

export type ILocale = 'ru' | 'en';

export type IUserPermission = 'FEATURE_FLAGS_READER' | 'FEATURE_FLAGS_ADMIN';

export const FLAG_TYPES = ['RELEASE', 'SYSTEM'] as const;

export type IFlagTypeProp = typeof FLAG_TYPES[number];

export type IOrganizationId = number;

export type IProjectId = number;

export type IEnvironmentId = number;

export type IEnvironmentInstanceId = number;

export type IProjectStatus =
  | 'ACTIVE'
  | 'OUT_OF_SYNC'
  | 'UNAVAILABLE'
  | 'NOT_CONNECTED';

export type IProjectEnvironmentStatus =
  | 'ACTIVE'
  | 'OUT_OF_SYNC'
  | 'UNAVAILABLE'
  | 'NOT_CONNECTED';

export type IProjectEnvironmentInstanceStatus =
  | 'ACTIVE'
  | 'OUT_OF_SYNC'
  | 'UNAVAILABLE';

export type IOrganizationPermission =
  | 'READ_ORGANIZATION'
  | 'EDIT'
  | 'CREATE_PROJECT'
  | 'READ_MEMBERS'
  | 'EDIT_MEMBERS';

export type IProjectPermission =
  | 'READ_PROJECT'
  | 'PENDING_APPROVE'
  | 'EDIT'
  | 'CREATE_ENV'
  | 'READ_MEMBERS'
  | 'EDIT_MEMBERS'
  | 'CREATE_FLAG'
  | 'DELETE_FLAG'
  | 'DELETE';

export type IEnvironmentPermission = 'READ_ENVIRONMENT' | 'EDIT' | 'DELETE';

export type IUserStatus = 'PENDING' | 'ACTIVE' | 'BLOCKED' | 'DELETED';

export type IUserId = number;

export type IMemberEnvironmentRole = 'VIEWER' | 'EDITOR' | 'NO_ACCESS';

export type IMemberProjectRole = 'ADMIN' | 'MEMBER';

export interface IOrganization<DateType = Date> {
  id: IOrganizationId;
  name: string;
  projects: Array<IProject<DateType>>;
  permissions: IOrganizationPermission[];
  membersCount?: number;
}

export interface IProject<DateType = Date> {
  id: IProjectId;
  name: string;
  environments: Array<IProjectEnvironment<DateType>>;
  membersCount?: number;
  featureFlagsCount?: number;
  status: IProjectStatus;
  permissions: IProjectPermission[];
}

export interface IProjectEnvironment<DateType = Date> {
  id: IEnvironmentId;
  name: string;
  authKeyExist: boolean;
  status: IProjectEnvironmentStatus;
  instances: Array<IProjectEnvironmentInstance<DateType>>;
  permissions: IEnvironmentPermission[];
  emails?: Array<{ email: string }>;
  freezingEnable?: boolean;
  freezingUser?: string;
  freezingEndTime?: Date;
}

export interface IProjectEnvironmentInstance<DateType = Date> {
  id: IEnvironmentInstanceId;
  name: string;
  status: IProjectEnvironmentInstanceStatus;
  updated?: DateType;
}

export type IEnvironmentToken = string;

export type IInviteUuid = string;

export interface IProjectRolesInfo {
  projectId: IProjectId;
  projectName: IProject['name'];
  projectRole: IMemberProjectRole;
  environmentPermissions: Array<{
    environmentId: IEnvironmentId;
    environment: IProjectEnvironment['name'];
    environmentRole: IMemberEnvironmentRole;
  }>;
}

export type IProjectMember<DateType = Date> = {
  user: IUser<DateType>;
} & IProjectRolesInfo;

export interface IOrganizationMember<DateType = Date> {
  user: IUser<DateType>;
  projects: IProjectRolesInfo[];
}

export type IFormValuesChangeHandler<FormValues> = <K extends keyof FormValues>(
  field: K,
) => (
  value: FormValues[K] | ((prevValue: FormValues[K]) => FormValues[K]),
) => void;

export type IFormValuesBlurHandler<FormValues> = <K extends keyof FormValues>(
  field: K,
) => () => void;

export type IFlagAction =
  | 'EDIT'
  | 'CREATE'
  | 'RESTORE'
  | 'DELETE'
  | 'DISABLE'
  | 'ENABLE';

export interface IFlagFieldChanges<K extends keyof IFlag> {
  old?: IFlag[K];

  new?: IFlag[K];
}

export type IFlagChanges = {
  [K in keyof IFlag]?: IFlagFieldChanges<K>;
};
export interface IHistoryOfChangesListItem {
  id: number;
  action: IFlagAction;
  userName: string;
  featureFlag: IFlag;
  time: Date;
  environment?: string;
  changes: IFlagChanges;
  creationInfo?: IFlag;
}

export interface IPaginationData {
  pageSize: number;
  page: number;
  totalPages: number;
  totalElements: number;
}

export interface IHistoryOfChanges extends IPaginationData {
  changesHistory: IHistoryOfChangesListItem[];
}

export interface IFliterPaneComplexValue<T> {
  id: T;
  label: string;
}
