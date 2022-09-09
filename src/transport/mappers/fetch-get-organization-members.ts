import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IOrganizationMember } from '../../types';
import { fetchGetUser } from './fetch-get-user';

export interface IFetchGetOrganizationMembersRequestParams
  extends IRequestParams {
  organizationId: IOrganizationId;
}

export type IFetchGetOrganizationMembersResponse = IOrganizationMember[];

export interface IFetchGetOrganizationMembersResponseRaw {
  users: Array<IOrganizationMember<string>>;
}

export const fetchGetOrganizationMembers = (
  response: IFetchGetOrganizationMembersResponseRaw,
): IFetchGetOrganizationMembersResponse =>
  response.users.map(({ user, ...rest }) => ({
    ...rest,
    user: fetchGetUser(user),
  }));
