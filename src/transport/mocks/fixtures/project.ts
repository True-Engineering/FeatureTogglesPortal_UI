import { IRawProject } from '../../mappers/types';

const project: IRawProject = {
  id: 0,
  name: 'Cool project',
  status: 'NOT_CONNECTED',
  featureFlagsCount: 20,
  membersCount: 15,
  permissions: ['READ_PROJECT'],
  environments: [
    {
      id: 0,
      name: 'PROD',
      permissions: ['READ_ENVIRONMENT'],
      authKeyExist: true,
      status: 'ACTIVE',
      emails: [{ email: 'test@mail.ru' }],
      properties: {
        EVENT_SENDING_TFS_ENABLE: 'true',
      },
      instances: [
        {
          id: 0,
          name: 'prod-1',
          status: 'ACTIVE',
        },
      ],
    },
    {
      id: 1,
      name: 'QA',
      permissions: ['READ_ENVIRONMENT', 'EDIT'],
      authKeyExist: false,
      status: 'ACTIVE',
      emails: [],
      instances: [
        {
          id: 0,
          name: 'qa-1',
          status: 'OUT_OF_SYNC',
        },
      ],
    },
    {
      id: 2,
      name: 'DEV',
      permissions: ['READ_ENVIRONMENT'],
      authKeyExist: false,
      status: 'ACTIVE',
      instances: [
        {
          id: 0,
          name: 'dev-1',
          status: 'UNAVAILABLE',
        },
      ],
    },
  ],
};

export { project };
