import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentId, IProjectId } from '../../types';
import { IRawProjectEnvironment } from './types';

export interface IFetchUnfreezeFeatureFlagsRequestParams
  extends IRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
}

export type IFetchUnfreezeFeatureFlagsResponseRaw = IRawProjectEnvironment;
