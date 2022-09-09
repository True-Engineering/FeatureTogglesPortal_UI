import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import {
  IEnvironmentId,
  IFlag,
  IFlippingStrategy,
  IOrganizationId,
  IProjectId,
} from '../../types';
import { IRawFlag, IRawFlippingStrategy } from './types';
import { mapperFlag } from './common-mappers';
import { mapperFlippingStrategyToApi } from './mapper-flipping-strategy';

export interface IFetchEditFlagStrategyRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  flagName: IFlag['name'];
  environmentId: IEnvironmentId;
}

export type IFetchEditFlagStrategyRequestBody = IFlippingStrategy;

export type IFetchEditFlagStrategyRequestBodyRaw = IRawFlippingStrategy;

export const fetchEditFlagStrategyRequestMapper = mapperFlippingStrategyToApi;

export type IFetchEditFlagStrategyFlagResponse = IFlag;

export type IFetchEditFlagStrategyFlagResponseRaw = IRawFlag;

export const fetchEditFlagStrategy = mapperFlag;
