import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IOrganizationId, IUserId } from '../../types';

export interface IFetchDeleteOrganizationMemberRequestParams
  extends IRequestParams {
  organizationId: IOrganizationId;
  userId: IUserId;
}
