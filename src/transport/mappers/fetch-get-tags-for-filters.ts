import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IPaginationData, IProjectId } from '../../types';

export interface IFetchGetTagsForFilterParams extends IRequestParams {
  organizationId?: IOrganizationId;
  projectId?: IProjectId;
  page?: IPaginationData['page'];
  pageSize?: IPaginationData['pageSize'];
}

export type IFetchGetTagsForFilterResponse = string[];

export interface IRawFetchGetTagsWithPaginationResponse
  extends IPaginationData {
  resultList: IFetchGetTagsForFilterResponse;
}

export const fetchGetTagsForFilters = ({
  resultList,
}: IRawFetchGetTagsWithPaginationResponse): IFetchGetTagsForFilterResponse =>
  resultList;
