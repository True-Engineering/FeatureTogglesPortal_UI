import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IEnvironmentId, IEnvironmentToken, IProjectId } from '../../types';

export interface IFetchUpdateEnvironmentTokenRequestParams
  extends IRequestParams {
  projectId: IProjectId;
  environmentId: IEnvironmentId;
}

export type IFetchUpdateEnvironmentTokenResponse = IEnvironmentToken;

export type IFetchUpdateEnvironmentTokenResponseRaw = IFetchUpdateEnvironmentTokenResponse;
