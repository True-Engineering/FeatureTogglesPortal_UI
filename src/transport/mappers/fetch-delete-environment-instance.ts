import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentInstanceId, IProjectId } from '../../types';

export interface IFetchDeleteEnvironmentInstanceRequestParams
  extends IRequestParams {
  projectId: IProjectId;
  instanceId: IEnvironmentInstanceId;
}
