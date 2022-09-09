import { parse } from 'date-fns';
import {
  IRequestParams,
  nullToUndef,
} from '@true-engineering/true-react-common-api-client';
import { DATE_FORMAT } from '../../constants';
import { IFetchGetProjectResponseRaw } from '../mappers';
import { historyOfChanges, projectMembers } from './fixtures';

export default function ({
  params,
}: {
  params?: IRequestParams;
}): Promise<IFetchGetProjectResponseRaw> {
  return new Promise((resolve, reject) => {
    const {
      organizationId,
      projectId,
      page,
      pageSize,
      featureFlagId,
      userId,
      tag,
      end,
      start,
    } = params ?? {};
    if (organizationId === undefined) {
      return reject('organizationId param is empty');
    }

    if (projectId === undefined) {
      return reject('projectId param is empty');
    }

    if (page === undefined) {
      return reject('page param is empty');
    }

    if (typeof page !== 'number' || typeof pageSize !== 'number') {
      return reject('page and pageSize should be numbers');
    }

    let filteredHistoryOfChanges = historyOfChanges;

    if (featureFlagId !== undefined) {
      filteredHistoryOfChanges = filteredHistoryOfChanges.filter(
        ({ featureFlag: { uid } }) => uid === featureFlagId,
      );
    }

    if (userId !== undefined) {
      const { user } =
        projectMembers.users.find(({ user: { id } }) => id === userId) ?? {};
      if (user !== undefined) {
        filteredHistoryOfChanges = filteredHistoryOfChanges.filter(
          ({ userName }) => userName === user.userName,
        );
      }
    }

    if (start !== undefined && typeof start === 'string') {
      filteredHistoryOfChanges = filteredHistoryOfChanges.filter(
        ({ time }) =>
          parse(start, DATE_FORMAT, new Date()).getTime() <=
          new Date(time).getTime(),
      );
    }

    if (end !== undefined && typeof end === 'string') {
      filteredHistoryOfChanges = filteredHistoryOfChanges.filter(
        ({ time }) =>
          parse(end, DATE_FORMAT, new Date()).getTime() >=
          new Date(time).getTime(),
      );
    }

    if (tag !== undefined && typeof tag === 'string' && tag !== '') {
      filteredHistoryOfChanges = filteredHistoryOfChanges.filter(
        ({ featureFlag: { tags } }) => tags?.includes(tag),
      );
    }

    const newPage = page + 1;
    const startIndex = page * pageSize;
    const totalElements = filteredHistoryOfChanges.length;
    const endIndex =
      newPage * pageSize < totalElements ? newPage * pageSize : totalElements;
    const totalPages = Math.ceil(totalElements / pageSize);

    const isPageExist = totalPages >= page;
    if (!isPageExist) {
      return reject('no such page');
    }

    const response = {
      changesHistory: filteredHistoryOfChanges.slice(startIndex, endIndex),
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
