import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IProjectEnvironment, IProjectId } from '../../types';
import { IRawProjectEnvironment } from './types';
import {
  mapperProjectEnvironment,
  trimStringsInObject,
} from './common-mappers';

export interface IFetchCreateEnvironmentRequestParams extends IRequestParams {
  projectId: IProjectId;
}

export interface IFetchCreateEnvironment {
  name: string;
}

export type IFetchCreateEnvironmentResponse = IProjectEnvironment;

export type IFetchCreateEnvironmentResponseRaw = IRawProjectEnvironment;

export const fetchCreateEnvironment = mapperProjectEnvironment;

export const fetchCreateEnvironmentRequestMapper = (
  body: IFetchCreateEnvironment,
) => trimStringsInObject(body);
