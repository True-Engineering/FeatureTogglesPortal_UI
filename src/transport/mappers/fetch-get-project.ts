import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProject, IProjectId } from '../../types';
import { IRawProject } from './types';
import { mapperProject } from './common-mappers';

export interface IFetchGetProjectRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export type IFetchGetProjectResponse = IProject;

export type IFetchGetProjectResponseRaw = IRawProject;

export const fetchGetProject = mapperProject;
