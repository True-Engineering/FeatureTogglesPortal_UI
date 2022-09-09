import { nullToUndef } from '@true-engineering/true-react-common-api-client';
import { IUser } from '../../types';
import { NullAsUndefined } from './types';
import {
  IFetchGetProjectResponseRaw,
  IFetchGetUsersForFilterParams,
} from '../mappers';
import { projectMembers } from './fixtures';

export default function ({
  params,
}: {
  params?: IFetchGetUsersForFilterParams;
}): Promise<IFetchGetProjectResponseRaw> {
  return new Promise((resolve, reject) => {
    const { page, pageSize, projectId, template } = params ?? {};

    if (projectId === undefined) {
      return reject('projectId param is empty');
    }

    if (page === undefined) {
      return reject('page param is empty');
    }

    if (typeof page !== 'number' || typeof pageSize !== 'number') {
      return reject('page and pageSize should be numbers');
    }

    const filteredUsers: NullAsUndefined<Array<IUser<string>>> = [];

    if (template !== '' && template !== undefined) {
      projectMembers.users.forEach(({ user, user: { userName } }) => {
        if (userName.toLowerCase().includes(template.toLowerCase())) {
          filteredUsers.push(user);
        }
      });
    } else {
      projectMembers.users.forEach(({ user }) => {
        filteredUsers.push(user);
      });
    }

    const newPage = page + 1;
    const startIndex = page * pageSize;
    const totalElements = filteredUsers.length;
    const endIndex =
      newPage * pageSize < totalElements ? newPage * pageSize : totalElements;
    const totalPages = Math.ceil(totalElements / pageSize);

    const isPageExist = totalPages >= page;
    if (!isPageExist) {
      return reject('no such page totalPages');
    }

    const response = {
      resultList: filteredUsers.slice(startIndex, endIndex),
      pageSize,
      page,
      totalPages,
      totalElements,
    };

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('fetch-get-project', { params, response });
      // Спросить что делает ф-я
      resolve(nullToUndef(response));
    }, 1000);
  });
}
