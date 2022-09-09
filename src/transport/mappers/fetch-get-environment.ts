import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentId, IProjectEnvironment, IProjectId } from '../../types';
import { IRawProjectEnvironment } from './types';
import { mapperProjectEnvironment } from './common-mappers';

export interface IFetchGetEnvironmentRequestParams extends IRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
}

export type IFetchGetEnvironmentResponse = IProjectEnvironment;

export type IFetchGetEnvironmentResponseRaw = IRawProjectEnvironment;

export const fetchGetEnvironment = mapperProjectEnvironment;
