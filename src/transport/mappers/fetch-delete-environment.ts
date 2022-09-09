import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentId, IProjectId } from '../../types';

export interface IFetchDeleteEnvironmentRequestParams extends IRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
}
