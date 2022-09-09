import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IProjectId, IUserId } from '../../types';

export interface IFetchActivateUserRequestParams extends IRequestParams {
  userId: IUserId;
  projectId: IProjectId;
}
