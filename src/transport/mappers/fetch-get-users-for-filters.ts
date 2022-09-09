import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import {
  IFliterPaneComplexValue,
  IOrganizationId,
  IPaginationData,
  IProjectId,
  IUser,
} from '../../types';

export interface IFetchGetUsersForFilterParams extends IRequestParams {
  organizationId?: IOrganizationId;
  projectId?: IProjectId;
  template?: string;
  page?: IPaginationData['page'];
  pageSize?: IPaginationData['pageSize'];
}

export type IFetchGetUsersForFilterResponse = Array<
  IFliterPaneComplexValue<number>
>;

export interface IRawFetchGetUsersWithPaginationResponse
  extends IPaginationData {
  resultList: Array<IUser<string>>;
}

export const userFilterMapper = ({
  id,
  userName,
}: IUser<string>): IFliterPaneComplexValue<number> => ({
  id,
  label: userName,
});

export const fetchGetUsersForFilters = ({
  resultList,
}: IRawFetchGetUsersWithPaginationResponse): IFetchGetUsersForFilterResponse =>
  resultList.map(userFilterMapper);
