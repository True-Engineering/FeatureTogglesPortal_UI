import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IFlag } from '../../types';
import { IRawFlag } from './types';
import { mapperFlag } from './common-mappers';

export interface IFetchGetCompareEnvironmentsStateRequest
  extends IRequestParams {
  projectId: number;
  from: number;
  to: number;
}

export interface IFetchGetCompareEnvironmentsStateResponse {
  enable: IFlag[];
  disable: IFlag[];
}

export interface IFetchGetCompareEnvironmentsStateResponseRaw {
  enable: IRawFlag[];
  disable: IRawFlag[];
}

export const fetchGetCompareEnvironmentsState = (
  response: IFetchGetCompareEnvironmentsStateResponseRaw,
): IFetchGetCompareEnvironmentsStateResponse => ({
  ...response,
  enable: response.enable.map(mapperFlag),
  disable: response.disable.map(mapperFlag),
});
