import {
  IRequestParams,
  nullToUndef,
} from '@true-engineering/true-react-common-api-client';
import { IFetchGetProjectResponseRaw } from '../mappers';
import { organizations } from './fixtures';

export default function ({
  params,
}: {
  params?: IRequestParams;
}): Promise<IFetchGetProjectResponseRaw> {
  return new Promise((resolve, reject) => {
    const { organizationId, projectId } = params ?? {};
    if (organizationId === undefined || projectId === undefined) {
      return reject('no params');
    }

    const organization = organizations.find(item => item.id === organizationId);
    if (!organization) {
      return reject('no organization');
    }

    const project = organization.projects.find(item => item.id === projectId);
    if (!project) {
      return reject('no project');
    }

    setTimeout(() => {
      // eslint-disable-next-line no-console
      console.log('fetch-get-project', { params, response: project });

      resolve(nullToUndef(project));
    }, 300);
  });
}
