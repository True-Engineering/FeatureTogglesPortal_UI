import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProjectId, IUserId } from '../../types';

export interface IFetchDeleteProjectMemberRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  userId: IUserId;
}
