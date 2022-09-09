import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProjectId } from '../../types';

export interface IFetchMarkDefaultProjectRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export interface IFetchMarkDefaultProject {
  defaultProject: boolean;
}
