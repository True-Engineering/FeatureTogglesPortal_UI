import type { IRequestParams } from '@true-engineering/true-react-common-api-client';
import type { IFlag, IOrganizationId, IProjectId } from '../../types';
import type { IRawFlag } from './types';
import { mapperFlag } from './common-mappers';

export interface IFetchSyncPortalsUploadRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  key: string;
  needToDelete: string;
}

export type IFetchSyncPortalsUploadResponse = IFlag[];

export type IFetchSyncPortalsUploadResponseRaw = IRawFlag[];

export const fetchSyncPortalsUpload = (
  flags: IFetchSyncPortalsUploadResponseRaw,
): IFetchSyncPortalsUploadResponse => flags.map(mapperFlag);
