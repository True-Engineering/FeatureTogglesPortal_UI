import type { IRequestParams } from '@true-engineering/true-react-common-api-client';
import type {
  IOrganizationId,
  IProjectId,
  ISyncEnvironmentsInfo,
} from '../../types';
import { IRawProjectEnvironment } from './types';
import { mapperProjectEnvironment } from './common-mappers';

export interface IFetchSyncEnvironmentsInfoRequestParams
  extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export interface IFetchSyncEnvironmentsInfoRequest {
  file: File;
}

export type IFetchSyncEnvironmentsInfoResponse = ISyncEnvironmentsInfo;

export interface IFetchSyncEnvironmentsInfoResponseRaw {
  key: string;
  envSynchronizedStatus: boolean;
  srcEnvironments: IRawProjectEnvironment[];
  destEnvironments: IRawProjectEnvironment[];
}

export const fetchSyncEnvironmentsInfo = (
  response: IFetchSyncEnvironmentsInfoResponseRaw,
): IFetchSyncEnvironmentsInfoResponse => ({
  ...response,
  srcEnvironments: response.srcEnvironments.map(mapperProjectEnvironment),
  destEnvironments: response.destEnvironments.map(mapperProjectEnvironment),
});
