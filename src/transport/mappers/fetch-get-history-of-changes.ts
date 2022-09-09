import { format } from 'date-fns';
import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IFilterValues } from '../../components';
import { DATE_FORMAT } from '../../constants';
import {
  IHistoryOfChanges,
  IOrganizationId,
  IPaginationData,
  IProjectId,
} from '../../types';
import { IRawHistoryOfChanges } from './types';
import { historyOfChangesListItemMapper } from './common-mappers';

export interface IRawFetchGetHistoryRequestParams extends IFilterValues {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  page: IPaginationData['page'];
  pageSize?: IPaginationData['pageSize'];
}

export interface IFetchGetHistoryRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  page: IPaginationData['page'];
  pageSize?: IPaginationData['pageSize'];
  featureFlagId?: string;
  start?: string;
  end?: string;
  userId?: number;
  tag?: string;
}

export const fetchGetHistoryOfChanges = ({
  changesHistory,
  ...rest
}: IRawHistoryOfChanges): IHistoryOfChanges => ({
  changesHistory: changesHistory.map(historyOfChangesListItemMapper),
  ...rest,
});

export const fetchGetHistoryOfChangesParamsMapper = ({
  feature,
  period,
  user,
  ...rest
}: IRawFetchGetHistoryRequestParams): IFetchGetHistoryRequestParams => ({
  ...rest,
  featureFlagId: feature?.id,
  start:
    period?.from !== undefined && period?.from !== null
      ? format(period?.from, DATE_FORMAT)
      : undefined,
  end:
    period?.to !== undefined && period?.to !== null
      ? format(period?.to, DATE_FORMAT)
      : undefined,
  userId: user?.id,
});
