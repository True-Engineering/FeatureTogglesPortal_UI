import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IFlag, IOrganizationId, IProjectId } from '../../types';

export interface IFetchDeleteFlagRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  flagName: IFlag['name'];
}
