import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IProject } from '../../types';
import { IRawProject } from './types';
import { mapperProject, trimStringsInObject } from './common-mappers';

export interface IFetchCreateProjectRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
}

export interface IFetchCreateProject {
  name: string;
}

export type IFetchCreateProjectResponse = IProject;

export type IFetchCreateProjectResponseRaw = IRawProject;

export const fetchCreateProject = mapperProject;

export const fetchCreateProjectRequestMapper = ({
  name,
}: IFetchCreateProject) =>
  trimStringsInObject({
    name,
  });
