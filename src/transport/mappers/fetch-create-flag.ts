import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IFlag, IOrganizationId, IProjectId } from '../../types';
import { IRawFlag } from './types';
import { mapperFlag, trimStringsInObject } from './common-mappers';

export interface IFetchCreateFlagRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  flagName: IFlag['name'];
}

export type IFetchCreateFlagRequestBody = IFlag;

export interface IFetchCreateFlagRequestBodyRaw
  extends Omit<IFetchCreateFlagRequestBody, 'environments' | 'name' | 'tag'> {
  tags?: string[];
}

export const fetchCreateFlagRequestMapper = ({
  description,
  group,
  type,
  tag,
  sprint,
  name,
}: IFetchCreateFlagRequestBody): IFetchCreateFlagRequestBodyRaw =>
  trimStringsInObject({
    description:
      description === undefined || description.length === 0
        ? name
        : description,
    type,
    tags: tag === undefined || tag.length === 0 ? undefined : [tag],
    sprint,
    group,
  });

export type IFetchCreateFlagResponse = IFlag;

export type IFetchCreateFlagResponseRaw = IRawFlag;

export const fetchCreateFlag = mapperFlag;
