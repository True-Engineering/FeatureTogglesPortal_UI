import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IProjectEnvironment, IProjectId } from '../../types';
import { IRawProjectEnvironment } from './types';
import { mapperProjectEnvironment } from './common-mappers';

export interface IFetchLoadEnvironmentsRequestParams extends IRequestParams {
  projectId: IProjectId;
}

export type IFetchLoadEnvironmentsResponse = IProjectEnvironment[];

export type IFetchLoadEnvironmentsResponseRaw = IRawProjectEnvironment[];

export const fetchLoadEnvironments = (
  response: IFetchLoadEnvironmentsResponseRaw,
): IFetchLoadEnvironmentsResponse => response.map(mapperProjectEnvironment);
