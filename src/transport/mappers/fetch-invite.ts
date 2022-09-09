import { IRequestParams } from '@true-engineering/true-react-common-api-client';
import { IInviteUuid } from '../../types';

export interface IFetchInvite extends IRequestParams {
  uuid: IInviteUuid;
}
