import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProject, IProjectId } from '../../types';
import { IRawProject } from './types';
import { mapperProject, trimStringsInObject } from './common-mappers';

export interface IFetchEditProjectRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export interface IFetchEditProject {
  name: string;
}

export type IFetchEditProjectResponse = IProject;

export type IFetchEditProjectResponseRaw = IRawProject;

export const fetchEditProjectRequestMapper = ({ name }: IFetchEditProject) =>
  trimStringsInObject({
    name,
  });

export const fetchEditProject = mapperProject;
