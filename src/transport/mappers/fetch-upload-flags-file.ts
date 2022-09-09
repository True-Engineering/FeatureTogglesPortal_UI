import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProjectId } from '../../types';

export interface IFetchUploadFlagsFileRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export interface IFetchUploadFlagsFileRequest {
  file: File;
}
