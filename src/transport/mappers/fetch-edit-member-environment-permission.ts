import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import {
  IOrganizationId,
  IProjectId,
  IMemberEnvironmentRole,
  IUserId,
  IEnvironmentId,
  IProjectMember,
} from '../../types';
import { fetchGetUser } from './fetch-get-user';

export interface IFetchEditMemberEnvironmentPermissionRequestParams
  extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  userId: IUserId;
}

export interface IFetchEditMemberEnvironmentPermissionRequestBody {
  environmentId: IEnvironmentId;
  environmentRole: IMemberEnvironmentRole;
}

export type IFetchEditMemberEnvironmentPermissionRequestBodyRaw = IFetchEditMemberEnvironmentPermissionRequestBody;

export type IFetchEditMemberEnvironmentPermissionResponse = IProjectMember;

export type IFetchEditMemberEnvironmentPermissionResponseRaw = IProjectMember<string>;

export const fetchEditMemberEnvironmentPermission = ({
  user,
  ...rest
}: IFetchEditMemberEnvironmentPermissionResponseRaw): IFetchEditMemberEnvironmentPermissionResponse => ({
  ...rest,
  user: fetchGetUser(user),
});
