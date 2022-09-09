import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentId, IProjectEnvironment, IProjectId } from '../../types';
import { IRawProjectEnvironment } from './types';
import {
  mapperProjectEnvironment,
  trimStringsInObject,
} from './common-mappers';

export interface IFetchEditEnvironmentRequestParams extends IRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
}

export interface IFetchEditEnvironment {
  name: string;
}

export type IFetchEditEnvironmentResponse = IProjectEnvironment;

export type IFetchEditEnvironmentResponseRaw = IRawProjectEnvironment;

export const fetchEditEnvironmentRequestMapper = (
  body: IFetchEditEnvironment,
) => trimStringsInObject(body);

export const fetchEditEnvironment = mapperProjectEnvironment;
