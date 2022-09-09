import { IRawFlag } from '../../../transport/mappers/types';
import { IFetchSyncPortalsInfoResponseRaw } from '../../../transport/mappers';

const syncPortalsInfo: IFetchSyncPortalsInfoResponseRaw = {
  key: 'abcd',
  featureFlagsToAdd: new Array(42).fill(0).map(i => ({
    uid: `name ${i}`,
    description: `new ${i}`,
    group: undefined,
    type: 'RELEASE',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'PROD',
        flippingStrategy: undefined,
        permissions: ['EDIT'],
        enable: false,
      },
      {
        id: 1,
        name: 'DEV',
        permissions: ['EDIT'],
        flippingStrategy: undefined,
        enable: true,
      },
    ],
  })),
  featureFlagsToRemove: new Array(24).fill(0).map(i => ({
    uid: `name ${i}`,
    description: `remove ${i}`,
    group: undefined,
    type: 'RELEASE',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'PROD',
        flippingStrategy: undefined,
        permissions: ['EDIT'],
        enable: false,
      },
      {
        id: 1,
        name: 'DEV',
        permissions: ['EDIT'],
        flippingStrategy: undefined,
        enable: true,
      },
    ],
  })),
  featureFlagsToUpdate: new Array(5).fill(0).map(i => {
    const fl: IRawFlag = {
      uid: `name ${i}`,
      description: `update ${i}`,
      group: undefined,
      type: 'RELEASE',
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: undefined,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          permissions: ['EDIT'],
          flippingStrategy: undefined,
          enable: true,
        },
      ],
    };

    return { newFeatureFlag: { ...fl, tags: ['NEW'] }, currentFeatureFlag: fl };
  }),
};

export { syncPortalsInfo };
