import { IFetchSyncEnvironmentsInfoResponseRaw } from '../../mappers';

const syncEnvironmentsInfo: IFetchSyncEnvironmentsInfoResponseRaw = {
  key: '1234',
  envSynchronizedStatus: false,
  srcEnvironments: [
    {
      id: 0,
      name: 'PROD',
      authKeyExist: true,
      status: 'ACTIVE',
      permissions: [],
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
      name: 'UAT',
      authKeyExist: true,
      status: 'ACTIVE',
      permissions: [],
      instances: [
        {
          id: 0,
          name: 'uat-1',
          status: 'ACTIVE',
        },
      ],
    },
    {
      id: 2,
      name: 'DEV',
      authKeyExist: true,
      status: 'ACTIVE',
      permissions: [],
      instances: [
        {
          id: 0,
          name: 'dev-1',
          status: 'ACTIVE',
        },
      ],
    },
  ],
  destEnvironments: [
    {
      id: 0,
      name: 'PROD',
      authKeyExist: true,
      status: 'ACTIVE',
      permissions: [],
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
      name: 'UAT',
      authKeyExist: true,
      status: 'ACTIVE',
      permissions: [],
      instances: [
        {
          id: 0,
          name: 'uat-1',
          status: 'ACTIVE',
        },
      ],
    },
    {
      id: 2,
      name: 'DEV',
      authKeyExist: true,
      status: 'ACTIVE',
      permissions: [],
      instances: [
        {
          id: 0,
          name: 'dev-1',
          status: 'ACTIVE',
        },
      ],
    },
  ],
};

export { syncEnvironmentsInfo };
