import { nullToUndef } from '@true-engineering/true-react-common-api-client';
import {
  IFetchGetProjectResponseRaw,
  IFetchGetUsersForFilterParams,
} from '../mappers';
import { flags } from './fixtures';

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

    const filteredFlags =
      template !== '' && template !== undefined
        ? flags.filter(
            ({ uid, description }) =>
              uid.toLowerCase().includes(template.toLowerCase()) ||
              description?.toLowerCase().includes(template.toLowerCase()),
          )
        : flags;

    const newPage = page + 1;
    const startIndex = page * pageSize;
    const totalElements = filteredFlags.length;
    const endIndex =
      newPage * pageSize < totalElements ? newPage * pageSize : totalElements;
    const totalPages = Math.ceil(totalElements / pageSize);

    const isPageExist = totalPages >= page;
    if (!isPageExist) {
      return reject('no such page totalPages');
    }

    const response = {
      resultList: filteredFlags.slice(startIndex, endIndex),
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
    }, 300);
  });
}
