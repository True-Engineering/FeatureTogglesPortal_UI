import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import {
  IOrganizationId,
  IProjectId,
  IMemberProjectRole,
  IUserId,
  IProjectMember,
} from '../../types';
import { fetchGetUser } from './fetch-get-user';

export interface IFetchEditMemberProjectPermissionRequestParams
  extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  userId: IUserId;
}

export interface IFetchEditMemberProjectPermissionRequestBody {
  role: IMemberProjectRole;
}

export type IFetchEditMemberProjectPermissionRequestBodyRaw = IFetchEditMemberProjectPermissionRequestBody;

export type IFetchEditMemberProjectPermissionResponse = IProjectMember;

export type IFetchEditMemberProjectPermissionResponseRaw = IProjectMember<string>;

export const fetchEditMemberProjectPermission = ({
  user,
  ...rest
}: IFetchEditMemberProjectPermissionResponseRaw): IFetchEditMemberProjectPermissionResponse => ({
  ...rest,
  user: fetchGetUser(user),
});
