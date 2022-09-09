import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import {
  IFliterPaneComplexValue,
  IOrganizationId,
  IPaginationData,
  IProjectId,
} from '../../types';
import { IRawFlag } from './types';

export interface IFetchGetFeatureFlagsForFilterParams extends IRequestParams {
  organizationId?: IOrganizationId;
  projectId?: IProjectId;
  template?: string;
  page?: IPaginationData['page'];
  pageSize?: IPaginationData['pageSize'];
}

export type IFetchGetFeatureFlagsForFilterResponse = Array<
  IFliterPaneComplexValue<string>
>;

export interface IRawFetchGetFeatureFlagsWithPaginationResponse
  extends IPaginationData {
  resultList: IRawFlag[];
}

export const featureFlagFilterMapper = ({
  uid,
  description,
}: IRawFlag): IFliterPaneComplexValue<string> => ({
  id: uid,
  label: description ?? '',
});

export const fetchGetFeatureFlagsForFilters = ({
  resultList,
}: IRawFetchGetFeatureFlagsWithPaginationResponse): IFetchGetFeatureFlagsForFilterResponse =>
  resultList.map(featureFlagFilterMapper);
