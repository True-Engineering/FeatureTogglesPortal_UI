import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProjectId } from '../../types';

export interface IFetchDownloadFlagsFileRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}
