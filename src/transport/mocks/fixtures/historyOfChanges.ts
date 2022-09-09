import { IRawHistoryOfChangesListItem } from '../../mappers/types';
import { NullAsUndefined } from '../types';

export const historyOfChanges: NullAsUndefined<
  IRawHistoryOfChangesListItem[]
> = [
  {
    id: 661,
    action: 'EDIT',

    userName: 'Иванов Иван',

    featureFlag: {
      uid: '344',
      description: 'Task',
      group: null,
      type: 'RELEASE',
      sprint: '',
      tags: ['Web'],
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },

    environment: 'string',

    time: '2022-05-23T05:57:13.588Z',

    changes: {
      description: {
        old: 'BA-1285 Реализовать автоматическую отправку данных в 1C',

        new:
          'BA-1186 CM-CC: ограничить список контрактов при выполнении Duplicate',
      },

      type: {
        old: 'RELEASE',

        new: 'SYSTEM',
      },

      group: {
        old: 'Billing CO',

        new: 'Billing',
      },

      tags: {
        old: ['WEB', 'MOBILE'],

        new: ['Web'],
      },
    },
  },
  {
    id: 6502,
    action: 'ENABLE',

    userName: 'Петров Василий',

    featureFlag: {
      uid: '344',
      description: 'Task',
      group: null,
      type: 'RELEASE',
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },

    environment: 'd.farkhutdinov',

    time: '2023-05-23T05:57:13.588Z',
  },
  {
    id: 65803,
    action: 'RESTORE',

    userName: 'Петров Василий',

    featureFlag: {
      uid: '344',
      description: 'Task',
      group: null,
      type: 'RELEASE',
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },
    creationInfo: {
      uid: '344',
      description: 'Task',
      group: null,
      type: 'RELEASE',
      sprint: '',
      tags: ['Web'],
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },

    environment: 'DEV',

    time: '2023-05-23T05:57:13.588Z',
  },
  {
    id: 2,
    action: 'CREATE',

    userName: 'Кент Кларк',

    featureFlag: {
      uid: '214',
      description: 'awasaawrersawdawdadzzcd',
      group: null,
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: false,
        },
      ],
    },

    creationInfo: {
      uid: '344',
      description: 'Task',
      group: null,
      type: 'RELEASE',
      sprint: '',
      tags: ['Web'],
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },

    environment: 'string',

    time: '2023-05-23T05:57:13.588Z',
  },
  {
    id: 5645,
    action: 'DELETE',

    userName: 'Петров Василий',

    featureFlag: {
      uid: '214',
      description: 'awasaawrersawdawdadzzcd',
      group: null,
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: false,
        },
      ],
    },

    environment: 'string',

    time: '2023-05-23T05:57:13.588Z',
  },
  {
    id: 564,
    action: 'CREATE',

    userName: 'Иванов Иван',

    featureFlag: {
      uid: '214',
      description: 'awasaawrersawdawdadzzcd',
      group: null,
      sprint: '',
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: false,
        },
      ],
    },

    creationInfo: {
      uid: '344',
      description: 'Task',
      group: null,
      type: 'RELEASE',
      sprint: '',
      tags: ['Web'],
      environments: [
        {
          id: 0,
          name: 'PROD',
          flippingStrategy: null,
          permissions: ['EDIT'],
          enable: false,
        },
        {
          id: 1,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: true,
        },
      ],
    },

    environment: 'string',

    time: '2023-05-23T05:57:13.588Z',
  },
  {
    id: 1,
    action: 'DISABLE',

    userName: 'Петров Василий',

    featureFlag: {
      uid: '214',
      description: 'awasaawrersawdawdadzzcd',
      group: null,
      sprint: '',
      tags: ['Android'],
      environments: [
        {
          id: 0,
          name: 'DEV',
          flippingStrategy: {
            type:
              'ru.trueengineering.featureFlag.flag.portal.strategy.RequestContextFlippingStrategy',
            initParams: {},
          },
          enable: false,
        },
      ],
    },

    environment: 'PROD',

    time: '2023-05-23T05:57:13.588Z',
  },
];
