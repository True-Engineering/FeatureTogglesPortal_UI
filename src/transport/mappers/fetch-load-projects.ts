import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProject } from '../../types';
import { IRawProject } from './types';
import { mapperProject } from './common-mappers';

export interface IFetchLoadProjectsRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
}

export type IFetchLoadProjectsResponse = IProject[];

export type IFetchLoadProjectsResponseRaw = IRawProject[];

export const fetchLoadProjects = (
  response: IFetchLoadProjectsResponseRaw,
): IFetchLoadProjectsResponse => response.map(mapperProject);
