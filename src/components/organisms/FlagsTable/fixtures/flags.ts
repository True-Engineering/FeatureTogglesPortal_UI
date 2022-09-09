import { IFlag } from '../../../../types';

const flags: IFlag[] = [
  {
    name: '1',
    description: 'A Flag 1',
    group: undefined,
    type: 'RELEASE',
    sprint: 'Sprint 1',
    environments: [
      {
        id: 0,
        name: 'PROD',
        flippingStrategy: undefined,
        permissions: ['EDIT'],
        isEnabled: false,
      },
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [],
        },
        permissions: [],
        isEnabled: true,
      },
    ],
  },
  {
    name: '2',
    description: 'A Flag 2',
    group: undefined,
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [],
        },
        permissions: [],
        isEnabled: false,
      },
    ],
  },
  {
    name: '3',
    description: 'A Flag 10',
    group: undefined,
    type: 'RELEASE',
    sprint: 'Sprint 2',
    tag: 'WEB',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: undefined,
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '4',
    description: 'B Flag',
    group: undefined,
    sprint: 'Sprint 1',
    tag: 'eeee',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: undefined,
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '5',
    description: 'B Flag 1',
    group: 'todo-1',
    sprint: 'Sprint 1',
    tag: 'JFE',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: undefined,
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '6',
    description: 'B Flag 2',
    group: undefined,
    sprint: '',
    tag: 'Web',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [],
        },
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '7',
    description: 'B Flag 22',
    group: undefined,
    type: 'SYSTEM',
    sprint: 'Sprint 10',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [],
        },
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '8',
    description: 'C Flag 0',
    group: undefined,
    sprint: 'Sprint 1',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [],
        },
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '9',
    description: 'C Flag 1',
    group: undefined,
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [
            {
              name: 'jjjj',
              values: ['jjkjkj', 'saddsf', 'safadf', 'daf', 'fdsdf'],
            },
          ],
        },
        isEnabled: false,
        permissions: [],
      },
    ],
  },
  {
    name: '10',
    description: 'C Flag 01',
    group: undefined,
    sprint: 'Sprint 21',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type: 'RequestContext',
          initParams: [
            {
              name: 'userName',
              values: ['helloworld'],
            },
          ],
        },
        permissions: [],
        isEnabled: false,
      },
    ],
  },
  {
    name: '11',
    description: 'C Flag 11',
    group: 'Sprint 67',
    type: 'RELEASE',
    sprint: 'Sprint 1',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: undefined,
        isEnabled: false,
        permissions: [],
      },
    ],
  },
];

export { flags };
