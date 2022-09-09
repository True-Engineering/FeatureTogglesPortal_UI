import { IRequestParams } from '@true-engineering/true-react-common-api-client';

export interface IFetchUpdateFlagsStateQueryRequest extends IRequestParams {
  projectId: number;
  environmentId: number;
}

export interface IFetchUpdateFlagsStateBodyRequest {
  featureFlagsStates: Record<string, boolean>;
}
