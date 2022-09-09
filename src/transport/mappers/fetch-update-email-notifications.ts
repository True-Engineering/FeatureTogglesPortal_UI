import { IRequestParams } from '@true-engineering/true-react-common-api-client';

export interface IFetchUpdateEnvironmentNotificationsQueryRequest
  extends IRequestParams {
  projectId: number;
  environmentId: number;
}
export interface IFetchUpdateEnvironmentNotificationsBodyRequestRaw {
  emails: string[];
}
export interface IFetchUpdateEnvironmentNotificationsBodyRequest {
  emails: string[];
}

export const fetchUpdateEnvironmentNotificationsBodyRequestMapper = ({
  emails,
}: IFetchUpdateEnvironmentNotificationsBodyRequestRaw): IFetchUpdateEnvironmentNotificationsBodyRequest => ({
  emails,
});

export const fetchUpdateEnvironmentNotificationsBodyRequest = fetchUpdateEnvironmentNotificationsBodyRequestMapper;
