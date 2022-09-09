import { IFlag } from '../../types';
import { IRawFlag } from './types';
import { mapperFlag } from './common-mappers';
import {
  IFetchCreateFlagRequestParams,
  IFetchCreateFlagRequestBody,
  IFetchCreateFlagRequestBodyRaw,
  fetchCreateFlagRequestMapper,
} from './fetch-create-flag';

export type IFetchEditFlagRequestParams = IFetchCreateFlagRequestParams;

export type IFetchEditFlagRequestBody = IFetchCreateFlagRequestBody;

export type IFetchEditFlagRequestBodyRaw = IFetchCreateFlagRequestBodyRaw;

export const fetchEditFlagRequestMapper = fetchCreateFlagRequestMapper;

export type IFetchEditFlagResponse = IFlag;

export type IFetchEditFlagResponseRaw = IRawFlag;

export const fetchEditFlag = mapperFlag;
