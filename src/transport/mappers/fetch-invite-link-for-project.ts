import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProjectId } from '../../types';

export interface IFetchInviteLinkForProject extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export type IFetchInviteLinkForProjectResponse = string;

export type IFetchInviteLinkForProjectResponseRaw = string;
