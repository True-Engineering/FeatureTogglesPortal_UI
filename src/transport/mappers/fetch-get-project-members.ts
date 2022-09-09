import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProjectId, IProjectMember } from '../../types';
import { fetchGetUser } from './fetch-get-user';

export interface IFetchGetProjectMembersRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export type IFetchGetProjectMembersResponse = IProjectMember[];

export interface IFetchGetProjectMembersResponseRaw {
  users: Array<IProjectMember<string>>;
}

export const fetchGetProjectMembers = (
  response: IFetchGetProjectMembersResponseRaw,
): IFetchGetProjectMembersResponse =>
  response.users.map(({ user, ...rest }) => ({
    ...rest,
    user: fetchGetUser(user),
  }));
