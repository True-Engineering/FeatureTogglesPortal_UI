import type { IRequestParams } from '@true-engineering/true-react-common-api-client';
import type { IFlag, IOrganizationId, IProjectId } from '../../types';
import type { IRawFlag } from './types';
import { mapperFlag } from './common-mappers';

export interface IFetchSyncEnvironmentsUploadRequestParams
  extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  key: string;
}

export interface IFetchSyncEnvironmentsUploadRequestBody {
  src: string;
  dest: string[];
}

export type IFetchSyncEnvironmentsUploadResponse = IFlag[];

export type IFetchSyncEnvironmentsUploadResponseRaw = IRawFlag[];

export const fetchSyncEnvironmentsUpload = (
  flags: IFetchSyncEnvironmentsUploadResponseRaw,
): IFetchSyncEnvironmentsUploadResponse => flags.map(mapperFlag);
