import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentId, IProjectId } from '../../types';
import { IRawProjectEnvironment } from './types';

export interface IRawFetchFreezeFeatureFlagsRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
  endTime?: Date;
}

export interface IFetchFreezeFeatureFlagsRequestParams extends IRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
  endTime?: string;
}

export type IFetchFreezeFeatureFlagsResponseRaw = IRawProjectEnvironment;

export const fetchFreezeFeatureFlagsRequestParamsMapper = ({
  endTime,
  ...rest
}: IRawFetchFreezeFeatureFlagsRequestParams): IFetchFreezeFeatureFlagsRequestParams => ({
  ...rest,
  endTime: endTime !== undefined ? endTime.toISOString() : undefined,
});
