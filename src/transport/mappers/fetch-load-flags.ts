import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IFlag, IOrganizationId, IProjectId } from '../../types';
import { IRawFlag } from './types';
import { mapperFlag } from './common-mappers';

export interface IFetchLoadFlagsRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export type IFetchLoadFlagsResponse = IFlag[];

export type IFetchLoadFlagsResponseRaw = IRawFlag[];

export const fetchLoadFlags = (flags: IRawFlag[]): IFlag[] =>
  flags.map(mapperFlag);
