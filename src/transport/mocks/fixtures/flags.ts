import { IRawFlag } from '../../mappers/types';
import { NullAsUndefined } from '../types';

const flagsSample: NullAsUndefined<IRawFlag[]> = [
  {
    uid: '344',
    description: 'Task',
    group: '',
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
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {},
        },
        enable: true,
      },
    ],
  },
  {
    uid: '214',
    description: 'awasaawrersawdawdadzzcd',
    group: '',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {},
        },
        enable: false,
      },
    ],
  },
  {
    uid: '343',
    description: 'Еще один проверочный флаг',
    group: '',
    type: 'RELEASE',
    sprint: '',
    tags: ['WEB'],
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: 'test2',
    description: 'test',
    group: '',
    sprint: '',
    tags: ['eeee'],
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },

  {
    uid: '345',
    description: 'Пустой флаг',
    group: 'todo-1',
    sprint: '',
    tags: ['JFE'],
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '216',
    description: 'hello2',
    group: '',
    sprint: '',
    tags: ['Web'],
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {},
        },
        enable: false,
      },
    ],
  },
  {
    uid: '322',
    description: 'hello2',
    group: '',
    type: 'SYSTEM',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {},
        },
        enable: false,
      },
    ],
  },
  {
    uid: 'tesssst',
    description: 'ыыыы',
    group: '',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {},
        },
        enable: false,
      },
    ],
  },
  {
    uid: '23',
    description: 'флаг',
    group: '',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {
            jjjj: 'jjkjkj;saddsf;safadf;daf;fdsdf',
          },
        },
        enable: false,
      },
    ],
  },
  {
    uid: '213',
    description: 'Проверка',
    group: '',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {
            userName: 'myastrebov',
          },
        },
        enable: false,
      },
    ],
  },
  {
    uid: '320',
    description: 'Test flag',
    group: 'Sprint 67',
    type: 'RELEASE',
    sprint: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: 'loss_settlement',
    description: '3330. Android. FF. Отключить создание заявления',
    group: '',
    type: 'RELEASE',
    sprint: 'Iteration 11',
    tags: ['Android'],
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: {
          type:
            'ru.trueengineering.feature.flag.portal.strategy.RequestContextFlippingStrategy',
          initParams: {
            userName: 'myastrebov',
          },
        },
        enable: false,
      },
    ],
  },
  {
    uid: '321',
    description: 'hello2',
    group: '',
    type: 'SYSTEM',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '770',
    description: 'Тут будет ваша задача',
    group: '',
    type: 'RELEASE',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: true,
      },
    ],
  },
  {
    uid: '212',
    description: 'awasaawrersfserfserfawdawdkho;ADW',
    group: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '215',
    description: 'Тестовое редактирование описания',
    group: '',
    type: 'RELEASE',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '1',
    description: 'Test-feature',
    group: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '34c0fb19-3f8b-40da-b4d9-7e6ad6c89ff1',
    description: 'Test-feature',
    group: '',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '769',
    description: 'финальная проверочка',
    group: 'Sprint 68',
    type: 'SYSTEM',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: true,
      },
    ],
  },
  {
    uid: '324',
    description: 'hello321',
    group: '',
    tags: ['SYSTEM'],
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: false,
      },
    ],
  },
  {
    uid: '346',
    description: 'еще один флаг',
    group: '',
    type: 'RELEASE',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: true,
      },
    ],
  },
  {
    uid: '342',
    description: 'Проверочный флаг',
    group: '',
    type: 'RELEASE',
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: true,
      },
    ],
  },
  {
    uid: '768',
    description: 'Чтобы не было пустых полей',
    group: null,
    environments: [
      {
        id: 0,
        name: 'DEV',
        flippingStrategy: null,
        enable: true,
      },
    ],
  },
];

const flags: NullAsUndefined<IRawFlag[]> = [];

for (let i = 0; i < 300; i++) {
  const randomIndex = Math.floor(Math.random() * (flagsSample.length - 1));
  flags.push({ ...flagsSample[randomIndex], uid: String(i) });
}

export { flags };
