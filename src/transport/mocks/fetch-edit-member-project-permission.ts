import {
  IRequestParams,
  nullToUndef,
} from '@true-engineering/true-react-common-api-client';
import { NullAsUndefined } from './types';
import {
  IFetchEditMemberProjectPermissionRequestBody,
  IFetchEditMemberProjectPermissionResponseRaw,
} from '../mappers';
import { projectMembers } from './fixtures';

export default function ({
  body,
  params,
}: {
  body?: IFetchEditMemberProjectPermissionRequestBody;
  params?: IRequestParams;
}): Promise<IFetchEditMemberProjectPermissionResponseRaw> {
  return new Promise((resolve, reject) => {
    const { userId } = params ?? {};
    const { role } = body ?? {};

    if (role === undefined || userId === undefined) {
      return reject('no params');
    }

    const member = projectMembers.users.find(item => item.user.id === userId);
    if (member === undefined) {
      return reject('no user');
    }

    const response: NullAsUndefined<IFetchEditMemberProjectPermissionResponseRaw> = {
      ...member,
      projectRole: role,
    };

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('fetch-edit-member-project-permission', {
        body,
        params,
        response,
      });

      resolve(nullToUndef(response));
    }, 300);
  });
}
