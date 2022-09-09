import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import {
  IEnvironmentId,
  IFlag,
  IOrganizationId,
  IProjectId,
} from '../../types';

export interface IFetchEnableFlagRequestParams extends IRequestParams {
  organizationId: IOrganizationId;
  projectId: IProjectId;
  flagName: IFlag['name'];
  environmentId: IEnvironmentId;
}
