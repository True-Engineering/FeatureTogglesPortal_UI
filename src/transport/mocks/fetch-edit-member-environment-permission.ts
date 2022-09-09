import {
  IRequestParams,
  nullToUndef,
} from '@true-engineering/true-react-common-api-client';
import { NullAsUndefined } from './types';
import {
  IFetchEditMemberEnvironmentPermissionRequestBody,
  IFetchEditMemberEnvironmentPermissionResponseRaw,
} from '../mappers';
import { projectMembers } from './fixtures';

export default function ({
  body,
  params,
}: {
  body?: IFetchEditMemberEnvironmentPermissionRequestBody;
  params?: IRequestParams;
}): Promise<IFetchEditMemberEnvironmentPermissionResponseRaw> {
  return new Promise((resolve, reject) => {
    const { userId } = params ?? {};
    const { environmentRole, environmentId } = body ?? {};
    if (
      environmentRole === undefined ||
      environmentId === undefined ||
      userId === undefined
    ) {
      return reject('no body');
    }

    const member = projectMembers.users.find(item => item.user.id === userId);
    if (member === undefined) {
      return reject('no user');
    }

    const response: NullAsUndefined<IFetchEditMemberEnvironmentPermissionResponseRaw> = {
      ...member,
      environmentPermissions: member.environmentPermissions.map(env =>
        env.environmentId === environmentId ? { ...env, environmentRole } : env,
      ),
    };

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('fetch-edit-member-env-permission', {
        body,
        params,
        response,
      });

      resolve(nullToUndef(response));
    }, 300);
  });
}
