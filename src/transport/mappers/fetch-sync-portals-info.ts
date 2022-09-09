import type { IRequestParams } from '@true-engineering/true-react-common-api-client';
import type {
  IOrganizationId,
  IProjectId,
  ISyncPortalsInfo,
} from '../../types';
import type { IRawFlag } from './types';
import { mapperFlag } from './common-mappers';

export interface IFetchSyncPortalsInfoRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
}

export interface IFetchSyncPortalsInfoRequest {
  file: File;
}

export interface IFetchSyncPortalsInfoResponseRaw {
  key: string;
  featureFlagsToAdd?: IRawFlag[];
  featureFlagsToRemove?: IRawFlag[];
  featureFlagsToUpdate?: Array<{
    newFeatureFlag: IRawFlag;
    currentFeatureFlag: IRawFlag;
  }>;
}

export type IFetchSyncPortalsInfoResponse = ISyncPortalsInfo;

export const fetchSyncPortalsInfo = (
  response: IFetchSyncPortalsInfoResponseRaw,
): IFetchSyncPortalsInfoResponse => ({
  key: response.key,
  featureFlagsToAdd: response.featureFlagsToAdd?.map(mapperFlag),
  featureFlagsToRemove: response.featureFlagsToRemove?.map(mapperFlag),
  featureFlagsToUpdate: response.featureFlagsToUpdate?.map(el => ({
    newFeatureFlag: mapperFlag(el.newFeatureFlag),
    currentFeatureFlag: mapperFlag(el.currentFeatureFlag),
  })),
});
