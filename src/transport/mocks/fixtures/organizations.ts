import { IRawOrganization } from '../../mappers/types';

const organizations: IRawOrganization[] = [
  {
    id: 0,
    name: 'Cool company',
    permissions: [
      'READ_ORGANIZATION',
      'READ_MEMBERS',
      'EDIT_MEMBERS',
      'CREATE_PROJECT',
    ],
    projects: [
      {
        id: 0,
        name: 'Cool project',
        status: 'NOT_CONNECTED',
        permissions: [
          'READ_PROJECT',
          'PENDING_APPROVE',
          'EDIT',
          'CREATE_ENV',
          'READ_MEMBERS',
          'EDIT_MEMBERS',
          'CREATE_FLAG',
          'DELETE_FLAG',
          'DELETE',
        ],
        environments: [
          {
            id: 0,
            name: 'PROD',
            permissions: ['READ_ENVIRONMENT', 'EDIT'],
            authKeyExist: true,
            status: 'NOT_CONNECTED',
            instances: [
              {
                id: 0,
                name: 'te-dev-hrdt-01',
                status: 'UNAVAILABLE',
                updated: '2022-04-22T12:00:00+03:00',
              },
              {
                id: 1,
                name: 'te-dev-hrdt-02',
                status: 'ACTIVE',
                updated: '2022-04-22T12:00:00+03:00',
              },
            ],
            properties: {
              FREEZING_ENABLE: 'true',
              FREEZING_USER: 'userName',
              FREEZING_END_TIME: '2007-12-03T10:15:30Z',
            },
          },
          {
            id: 1,
            name: 'QA',
            permissions: ['READ_ENVIRONMENT', 'EDIT'],
            authKeyExist: false,
            status: 'ACTIVE',
            instances: [
              {
                id: 0,
                name: 'qa-1',
                status: 'OUT_OF_SYNC',
                updated: '2022-01-12T18:00:00+03:00',
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
        featureFlagsCount: 20,
        membersCount: 15,
      },
      {
        id: 1,
        name: 'My project',
        status: 'ACTIVE',
        permissions: ['READ_PROJECT', 'EDIT_MEMBERS'],
        environments: [
          {
            id: 0,
            name: 'PROD',
            permissions: ['READ_ENVIRONMENT'],
            authKeyExist: true,
            status: 'NOT_CONNECTED',
            instances: [
              {
                id: 0,
                name: 'te-dev-hrdt-01',
                status: 'UNAVAILABLE',
                updated: '2022-04-22T12:00:00+03:00',
              },
              {
                id: 1,
                name: 'te-dev-hrdt-02',
                status: 'ACTIVE',
                updated: '2022-04-22T12:00:00+03:00',
              },
            ],
          },
          {
            id: 1,
            name: 'QA',
            permissions: ['READ_ENVIRONMENT'],
            authKeyExist: false,
            status: 'ACTIVE',
            instances: [
              {
                id: 0,
                name: 'qa-1',
                status: 'OUT_OF_SYNC',
                updated: '2022-01-12T18:00:00+03:00',
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
      },
    ],
  },
];

export { organizations };
